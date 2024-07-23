import app from './app';
import './database';
import { PORT } from './config/config';

app.listen((PORT), () => {
    console.log(`Servidor en el puerto ${ PORT }`);
});