const mongoose = require('mongoose');
require('dotenv').config();
const db = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{

    })
    .then(()=>{console.log("Connection with db successfull")})
    .catch((error)=>{
        console.error(error);
        console.log("Error connecting with db");
        process.exit(1);
    })
}

module.exports = db;
