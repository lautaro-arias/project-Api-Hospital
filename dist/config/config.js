"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    DB: {
        URI: process.env.MONGODB_URI_TEST || 'mongodb://localhost/mydb',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    },
    API_KEY: process.env.API_KEY
};
_a = process.env.PORT, exports.PORT = _a === void 0 ? 4000 : _a;
