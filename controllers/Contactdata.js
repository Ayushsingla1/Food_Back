const Contacto = require('../models/contact');

exports.Contact = async(req,res)=>{
    try{
        const {name,email,message} = req.body;
        const response = await Contacto.create({name,email,message});
        res.status(200).json(
            {
                success : true,
                body : response,
                message : "Message Sent Successfully"
            }
        )
    }catch(error){
        console.error(error)
        res.status(500).json(
            {
                success : false,
                message : "Please try again later"
            }
        )
    }
}