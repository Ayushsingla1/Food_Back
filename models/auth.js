const mongoose = require('mongoose');


const signInSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            trim : true,
            required : true,
        },
        email : {
            type : String,
            required : true,
        },
        password : {
            type : String,
            required : true,
        },
        cpassword : {
            type : String,
            required : true,
        }
    }
)

module.exports = mongoose.model('SignIn',signInSchema);

