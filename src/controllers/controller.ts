import { Request, Response, json } from 'express';
import { ArchiveModel } from '../models/archiveModel';
import moment from 'moment';
import { Update } from '../interface/allInterface';

export async function List(req:Request,res:Response){
    try {
        const data = await ArchiveModel.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error en el servidor / solicitud Get/list' });
        
    }
};


export async function  Add(req: Request, res: Response)  {
    try {
        const { service, name,   numberOrder,    brand,  model,
                numberSerie,    numberInventory,    start,  end,
                observations,   materials,  departureDestination,   inCharge,
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
            observations: observations ? [{ observation: observations, timestamp: moment().tz('America/Argentina/Buenos_Aires').format() }] : [],
            materials,
            departureDestination,
            inCharge,
            tecnicInCharge
        });
        console.log(newArchive)
        await newArchive.save();

        res.status(200).json({ msg: 'Agregado con exito' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error en el servidor / solicitud Post/add' });
        
    }
};

export async function Update(req: Request, res: Response) {
    try {
        const { observations, ...otherUpdates } = req.body;
        const data = await ArchiveModel.findById(req.params.id);

        if (!data) {
            return res.status(404).json({ msg: 'No existe' });
        }

        if (observations) {
            const newObservation = {
                observation: observations,
                timestamp: moment().tz('America/Argentina/Buenos_Aires').format()
            };
            data.observations.push(newObservation);
        }

        (Object.keys(otherUpdates) as (keyof Update)[]).forEach(key => {
            if (otherUpdates[key] !== undefined && otherUpdates[key] !== null && otherUpdates[key] !== '') {
                data[key] = otherUpdates[key];
            }
        });

        await data.save();

        res.status(200).json({ msg: 'Actualizado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor / solicitud Put/update' });
    }
}

export const Delete = async (req:Request,res:Response) => {
        try {
            const data = await ArchiveModel.findByIdAndDelete(req.params.id);

            if(!data) {
                return res.status(404).json({ msg: 'No existe' });
            }
            res.status(204).json({ msg: 'Eliminado con exito' });

        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Error en el servidor / solicitud Delete/delete' });
        }
};



