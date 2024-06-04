const Item = require('../models/items')

exports.ItemC = async(req,res)=>{
    try {
        const response = await Item.find({});
        res.status(200).json({
            success : true,
            data : response,
            message : "Entry Created"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                success : false,
                message : error.message
            }
        )
    }
}