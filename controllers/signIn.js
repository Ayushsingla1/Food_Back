const SingIn = require('../models/auth');
const bcrypt = require('bcrypt');

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

exports.Sign = async(req,res)=>{
    try{
        const {name,email,password,cpassword} = req.body;
        try{
            const duplicate = await SingIn.findOne({email});
            console.log(duplicate);
            if(duplicate){
               return res.status(500).json({
                    success : false,
                    message : 'Account already exists, Please Login',
                })
            }
            else if(!isValidEmail(email)){
                return res.status(404).json(
                    {
                        success : false,
                        message : "Invalid Email",
                    }
                )
            }
            else{
                if(cpassword==password){
                    try{
                        hashedPassword = await bcrypt.hash(password,10);
                        hashedPassword2 = await bcrypt.hash(cpassword,10);
                    }catch(error){
                        return res.status(500).json({
                            success : false,
                            message : "Error in hashing password"
                        })
                    }
                    try{
                        const response = await SingIn.create({name,email,password : hashedPassword,cpassword : hashedPassword2});
                        return res.status(200).json(
                            {
                                success : true,
                                message : "Account successfully created",
                                body : response,
                            }
                        )
                    }catch(error){
                        res.status(400).json(
                            {
                                success : false,
                                message : "Please try again later",
                            }
                        )
                    }
                }
                else{
                   return res.status(500).json(
                        {
                            success : false,
                            message : "Password doesn't matches",
                        }
                    )
                }
            }
        }
        catch(error){
            console.error(error)
            res.status(500).json(
                {
                    success : false,
                    message : error.message,
                }
            )
        }
    }catch(error){
        console.error(error)
        res.status(500).json(
            {
                success : false,
                message : error.message,
            }
        )
    }
}
