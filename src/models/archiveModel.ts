import mongoose from "mongoose";
import moment from 'moment-timezone';

const observationSchema = new mongoose.Schema({
    observation: { type: String, trim: true },
    timestamp: { type: Date, default: () => moment().tz('America/Argentina/Buenos_Aires').format() }
}, { _id: false });

const ArchiveSchema = new mongoose.Schema({
    service              : { type: String, trim: true },
    name                 : { type: String, trim: true },
    numberOrder          : { type: String, trim: true },
    brand                : { type: String, trim: true },
    model                : { type: String, trim: true },
    numberSerie          : { type: String, trim: true, required: true, unique: true },
    numberInventory      : { type: String, trim: true },
    start                : { type: String, trim: true },
    end                  : { type: String, trim: true },
    observations         : { type: [observationSchema] },
    materials            : { type: String, trim: true },
    departureDestination : { type: String, trim: true },
    inCharge             : { type: String, trim: true },
    tecnicInCharge       : { type: String, trim: true},
    timestamp            : { type: Date, default: () => moment().tz('America/Argentina/Buenos_Aires').format() }
});

export const ArchiveModel = mongoose.model('Archive', ArchiveSchema);
