import express from "express";
import morgan from "morgan";
import cors from "cors";
import  router  from "./routes/routes";

const PORT = process.env.PORT || 4000;

//inicial
const app = express();
const DB_URI = process.env.MONGODB_URI || "mongodb://localhost/mydb";

// Configuración de cors
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
//

//middlewares
app.use(
    express.static("public", {
        maxAge: "1d", // Duración máxima de caché para los archivos estáticos
    }),
    
);


app.use(morgan("dev")); 
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);


//routes
app.get("/", (req, res) => {
    res.send(`Estamos en el puerto ${PORT}`);
    
});

export default app;
