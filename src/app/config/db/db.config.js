const { default: mongoose } = require('mongoose');

require('dotenv').config();

const DEV_DB  = {
    HOST: process.env.HOST,
    DB: process.env.DB,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS
}

const db_uri = `mongodb+srv://${DEV_DB.USER}:${DEV_DB.PASS}@${DEV_DB.HOST}/${DEV_DB.DB}`


const connectDB = async () => {
    try {
        await mongoose.connect(db_uri, {
            useNewUrlParser:true
        });
            console.log("Successfully connected to mongodb");
        } catch (e){
            console.log(e);
            throw e;
        }
};



module.exports = connectDB;

