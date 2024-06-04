const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SignIn = require('../models/auth');

exports.log = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(404).json({
                success : false,
                message : "Please fill details carefully"
            })
        }
        const memail = email[0].toLowerCase() + email.slice(1);
        try {
            const existing_user = await SignIn.findOne({email:memail});
            if(!existing_user){
                return res.status(500).json(
                    {
                        success : false,
                        message : "No account exists with given Email"
                    }
                )
            }
            try{
                correct_password = await bcrypt.compare(password,existing_user.password);
            }
            catch(error){
                return res.status(500).json(
                    {
                        success : false,
                        message : "Please try again Later"
                    }
                )
            }
            if(!correct_password){
                return res.status(500).json(
                    {
                        success : false,
                        message : "Incorrect Password",
                    }
                )
            }
            else{
                const payload = {email : existing_user.email,id : existing_user._id}
                existing_user.password = undefined;
                if(correct_password){
                    let token = jwt.sign(payload,process.env.JWT_SECRET,{
                        expiresIn : '2h'
                    })
                    existing_user.token = token
                    const options = {
                        expires: new Date(Date.now() + 1*24*60*60*1000),
                        httpOnly : true
                    }
                    return res.cookie('token',token,options).status(200).json(
                        {
                            success : true,
                            token,
                            existing_user,
                            message : "Successfully loged in"
                        }
                    )
                }
            }
        } catch (error) {
            return res.status(500).json(
                {
                    success : false,
                    message : "Please try again Later"
                }
            )
        }
    } catch (error) {
        res.status(500).json(
            {
                success : false,
                message : error.message,
            }
        )
    }
}