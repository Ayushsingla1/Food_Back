const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.Authi = async(req,res,next)=>{
    try {
        // const token =req.header('Authorization').replace('Bearer ',"") ;
        const token = req.cookies.token;
        console.log(req.header('Authorization'));
        console.log(token);
        if(!token){
            return res.status(404).json(
                {
                    success : false,
                    message : "Token is not present"
                }
            )
        }
        try{
            console.log("Verfication k liye gaya")
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode)
            req.user = decode ; 
        }catch(error){
            return res.status(401).json(
                {
                    success : false,
                    message : "token is invalid"
                }
            )
        }
        next();
    } catch (error) {
        return res.status(500).json(
            {
                success : false,
                message : "Please try again later"
            }
        )
    }
}