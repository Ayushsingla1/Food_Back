const Reviews = require('../models/Review');

exports.reviewShow = async(req,res)=>{
    try {
        const response = await Reviews.find({});
        res.status(200).json(
            {
                success : true,
                data : response,
            }
        )
        
    } catch (error) {
        console.error(error);
        res.status(500).json(
            {
                success : false,
                message : "Unable to fetch data"
            }
        )
    }
}

exports.reviewPost = async(req,res)=>{
    try {
        const {name,review} = req.body;
        const response = await Reviews.create({name:name,review:review})
        res.status(200).json(
            {
                success : true,
                message : "Successfull"
            }
        )
        
    } catch (error) {
        res.status(500).json(
            {
                success : false,
                meesage : "Please try later"
            }
        )
    }
}