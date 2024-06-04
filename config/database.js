const mongoose = require('mongoose');
require('dotenv').config();
const db = ()=>{
    mongoose.connect(process.env.MONGODB_URI,{
    })
    .then(()=>{})
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })
}

module.exports = db;
