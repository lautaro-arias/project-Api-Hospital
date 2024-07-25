"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
const PORT = process.env.PORT || 4000;
//inicial
const app = (0, express_1.default)();
const DB_URI = process.env.MONGODB_URI || "mongodb://localhost/mydb";
// Configuración de cors
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
//
//middlewares
app.use(express_1.default.static("public", {
    maxAge: "1d", // Duración máxima de caché para los archivos estáticos
}));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(routes_1.default);
//routes
app.get("/", (req, res) => {
    res.send(`Estamos en el puerto ${PORT}`);
});
exports.default = app;
