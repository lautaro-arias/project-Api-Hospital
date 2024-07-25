import { Router } from "express";
import { listArchive, addArchive , deleteArchive, updateArchive }  from "../controllers/controller";

const router = Router()

router.get('/list',listArchive)
router.post('/add', addArchive)
router.delete('/delete/:id',deleteArchive)
router.put('/update/:id',updateArchive)

export default router;