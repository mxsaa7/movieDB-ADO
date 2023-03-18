const { default: mongoose } = require('mongoose');

require('dotenv').config();

DEV_DB  = {
    HOST: process.env.HOST,
    PORT: process.env.DB_PORT,
    DB: process.env.DB
}

const db_uri = `mongodb://${DEV_DB.HOST}:${DEV_DB.PORT}//${DEV_DB.DB}`;

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

