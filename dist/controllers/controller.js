"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArchive = exports.updateArchive = exports.addArchive = exports.listArchive = void 0;
const archiveModel_1 = require("../models/archiveModel");
const moment_1 = __importDefault(require("moment"));
function listArchive(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield archiveModel_1.ArchiveModel.find();
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).json({ msg: "Error en el servidor / solicitud Get", error });
        }
    });
}
exports.listArchive = listArchive;
function addArchive(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { service, name, numberOrder, brand, model, numberSerie, numberInventory, start, end, task, fechaTask, observations, materials, departureDestination, inCharge, tecnicInCharge } = req.body;
            const newArchive = new archiveModel_1.ArchiveModel({
                service,
                name,
                numberOrder,
                brand,
                model,
                numberSerie,
                numberInventory,
                start,
                end,
                observations: observations ? [
                    {
                        observation: observations,
                        timestamp: (0, moment_1.default)().tz("America/Argentina/Buenos_Aires").format(),
                    },
                ]
                    : [],
                task,
                fechaTask,
                materials,
                departureDestination,
                inCharge,
                tecnicInCharge
            });
            newArchive.save();
            res.status(200).json({ msg: "Agregado con exito" });
        }
        catch (error) {
            res.status(500).json({ msg: "Error en el servidor / solicitud Post", error });
        }
    });
}
exports.addArchive = addArchive;
function updateArchive(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const _a = req.body, { observations } = _a, otherUpdates = __rest(_a, ["observations"]);
            const data = yield archiveModel_1.ArchiveModel.findById(req.params.id);
            if (!data) {
                return res.status(404).json({ msg: "No existe" });
            }
            if (observations !== undefined && observations !== null && observations !== '') {
                // Verifica si observations es un objeto y conviértelo a JSON string
                const observationText = typeof observations === "string"
                    ? observations
                    : JSON.stringify(observations);
                const newObservation = {
                    observation: observationText,
                    timestamp: (0, moment_1.default)().tz("America/Argentina/Buenos_Aires").format()
                };
                data.observations.push(newObservation);
            }
            Object.keys(otherUpdates).forEach((key) => {
                if (otherUpdates[key] !== undefined &&
                    otherUpdates[key] !== null &&
                    otherUpdates[key] !== "") {
                    data[key] = otherUpdates[key];
                }
            });
            data.save();
            res.status(200).json({ msg: "Actualizado con éxito" });
        }
        catch (error) {
            res.status(500).json({ msg: "Error en el servidor / solicitud Put/update", error });
        }
    });
}
exports.updateArchive = updateArchive;
const deleteArchive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield archiveModel_1.ArchiveModel.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({ msg: "No existe" });
        }
        res.status(204).json({ msg: "Eliminado con exito" });
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor / solicitud Delete", error });
    }
});
exports.deleteArchive = deleteArchive;
