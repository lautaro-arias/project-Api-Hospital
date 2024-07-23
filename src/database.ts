import mongoose  from 'mongoose';
import config from './config/config';


mongoose.connect(config.DB.URI)
const connection = mongoose.connection;

connection.once('open',() => {
    try {
        console.log('Mongodb connection ko')
    } catch (error) {
        console.log('Mongodb connection error')
    }
    
});

connection.on('error',err => {
    console.log(err)
    process.exit(0)
});