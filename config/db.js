const { default: mongoose } = require("mongoose")
require('dotenv').config();

const connectDB = ()=> {
    const connection = mongoose.connect(process.env.MONGO_DB_URI)
    if(connection){
        console.log("Database connected");
    }
    
}

module.exports = connectDB;

