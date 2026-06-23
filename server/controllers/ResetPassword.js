 const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")
const crypto = require("crypto");

exports.resetPasswordToken = async (req,res) => {
    try{
        //password token generate krna 
             const {email} = req.body;
             //useKa document lata hai pura 
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(404)
                .json({
                    success:false,
                    message:"Your Email is not registered with us"
                })
    }
    //This generates a random unique ID (token) using Node.js crypto module.
    const token = crypto.randomUUID();
    const updatedDetails = await User.findOneAndUpdate(
                            //finding criteria
                            {email:email},
                            //kaam
                            {   
                                //User ke document meh token yeh wala banaya hua token dalo
                                token:token,
                                //aur uske resetPasswordExpires field meh ye dalo
                                // 5 minute
                                resetPasswordExpires: Date.now() + 5*60*1000
                            },
                            {new:true}
    )

    const url = `http://localhost:3000/update-password/${token}`;
    //email- jisko email bhejna hai 
    //title
    //body
    await mailSender(email,"Password Reset Link", `Please use the following link to change password: ${url}`);

    return res.status(200)
            .json({
                success:true,
                message:"Reset password link sent successfully"
            })
    }catch(error){
        console.log(error.message);
            return res.status(400)
            .json({
                success:false,
                message:"something went wrong while resetting password"
            })
    }
    
}

//db meh password update krna
exports.resetPassword = async (req,res) => {
    try {
   const {password, confirmPassword, token} = req.body;
    if(password!==confirmPassword){
                   return res.status(401)
            .json({
                success:false,
                message:"Password and confirm password are not matching"
            })
    }
 
    const userDetails = await User.findOne({token:token});
     if(!userDetails){
             return res.status(401)
            .json({
                success:false,
                message:"token invalid"
            })
    }
 
    if(userDetails.resetPasswordExpires < Date.now()){
                     return res.status(401)
            .json({
                success:false,
                message:"token expired, please regenerate your token"
            })
    }
console.log("helloe");
    const hashedPassword = await bcrypt.hash(password,10);

    await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true}
    )

                         return res.status(200)
            .json({
                success:true,
                message:"password reset succesfull"
            })

    } catch (error) {
        console.log(error.message);
          return res.status(200)
            .json({
                success:false,
                message:"error in resetting password"
            })
    }
   


}

 