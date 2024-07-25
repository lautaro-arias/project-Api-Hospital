import dotenv from 'dotenv';

dotenv.config();
export default {
    DB: {
        URI: process.env.MONGODB_URI_TEST || 'mongodb://localhost/mydb',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    },
    API_KEY: process.env.API_KEY
};
export const{
    PORT = 4000
} = process.env