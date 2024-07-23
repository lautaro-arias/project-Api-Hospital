import {Router} from "express";
import  {List, Add , Delete, Update }  from "../controllers/controller";

const router = Router()

router.get('/list',List)
router.post('/add', Add)
router.delete('/delete/:id',Delete)
router.put('/update/:id',Update)


export default router;