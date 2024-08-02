import { Request, Response } from "express";
import { ArchiveModel } from "../models/archiveModel";
import moment from "moment";

export async function listArchive(req: Request, res: Response) {
    try {
        const data = await ArchiveModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor / solicitud Get",error });
    }
}

export async function addArchive(req: Request, res: Response) {
    try {
    const {
        service,
        name,
        numberOrder,
        brand,
        model,
        numberSerie,
        numberInventory,
        start,
        end,
        task,
        fechaTask,
        observations,
        materials,
        departureDestination,
        inCharge,
        tecnicInCharge
    } = req.body;

    const newArchive = new ArchiveModel({
        service,
        name,
        numberOrder,
        brand,
        model,
        numberSerie,
        numberInventory,
        start,
        end,
        observations: observations? [
            {
                observation: observations,
                timestamp: moment().tz("America/Argentina/Buenos_Aires").format(),
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
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor / solicitud Post",error });
    }
}

export async function updateArchive(req: Request, res: Response) {
    try {
    const { observations, ...otherUpdates } = req.body;
    const data: any = await ArchiveModel.findById(req.params.id);

    if (!data) {
        return res.status(404).json({ msg: "No existe" });
    }

    if (observations !== undefined && observations !== null && observations !== '') {
      // Verifica si observations es un objeto y conviértelo a JSON string
        const observationText =
        typeof observations === "string"
            ? observations
            : JSON.stringify(observations);

        const newObservation = {
            observation: observationText,
            timestamp: moment().tz("America/Argentina/Buenos_Aires").format()
        };
        data.observations.push(newObservation);
    }

    (Object.keys(otherUpdates) as (keyof typeof otherUpdates)[]).forEach(
        (key) => {
            if (
                otherUpdates[key] !== undefined &&
                otherUpdates[key] !== null &&
                otherUpdates[key] !== ""
            ) {
                data[key] = otherUpdates[key];
            }
        }
    );

        data.save();

        res.status(200).json({ msg: "Actualizado con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor / solicitud Put/update",error });
    }
}

export const deleteArchive = async (req: Request, res: Response) => {
    try {
    const data = await ArchiveModel.findByIdAndDelete(req.params.id);

    if (!data) {
        return res.status(404).json({ msg: "No existe" });
    }
        res.status(204).json({ msg: "Eliminado con exito" });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor / solicitud Delete",error });
    }
};



