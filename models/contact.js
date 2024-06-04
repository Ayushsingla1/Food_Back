const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true,
        },

        email : {
            type : String,
            required : true,
        },

        message : {
            type : String,
            required : true,
        }

    }
)

module.exports = mongoose.model('Contacto',ContactSchema);