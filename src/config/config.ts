import dotenv from 'dotenv';

dotenv.config();
export default {
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/mydb',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
} ;
export const{
    PORT = 4000
} = process.env