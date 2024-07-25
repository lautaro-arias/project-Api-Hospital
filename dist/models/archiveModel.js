"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchiveModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const observationSchema = new mongoose_1.default.Schema({
    observation: { type: String, trim: true },
    timestamp: { type: Date, default: () => (0, moment_timezone_1.default)().tz('America/Argentina/Buenos_Aires').format() }
}, { _id: false });
const ArchiveSchema = new mongoose_1.default.Schema({
    service: { type: String, trim: true },
    name: { type: String, trim: true },
    numberOrder: { type: String, trim: true },
    brand: { type: String, trim: true },
    model: { type: String, trim: true },
    numberSerie: { type: String, trim: true, required: true, unique: true },
    numberInventory: { type: String, trim: true },
    start: { type: String, trim: true },
    end: { type: String, trim: true },
    observations: { type: [observationSchema] },
    materials: { type: String, trim: true },
    departureDestination: { type: String, trim: true },
    inCharge: { type: String, trim: true },
    tecnicInCharge: { type: String, trim: true },
    timestamp: { type: Date, default: () => (0, moment_timezone_1.default)().tz('America/Argentina/Buenos_Aires').format() }
});
exports.ArchiveModel = mongoose_1.default.model('Archive', ArchiveSchema);
