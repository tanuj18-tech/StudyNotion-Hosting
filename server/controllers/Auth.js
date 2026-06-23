const User = require("../models/User");
const OTP = require("../models/otp");
const otpGenerator = require("otp-generator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const  Profile = require("../models/Profile")
require("dotenv").config()

const mailSender = require("../utils/mailSender")
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
 
//sendOTP
exports.sendotp = async (req,res) => {
        try{
          const {email} = req.body;
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
              
            return res.status(401)
                    .json({
                        success:false,
                        message:"User already exist with this email, please login"
                    })

                   
         }

         //alphabets otp meh nai chaiye, 6 length ka chiye
       let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
});

console.log("OTP generated: ", otp);

     // otp ka document banaya according to model   
         const otpPayload = {email, otp};
    // mongo db meh save kiya     
         const otpBody = await OTP.create(otpPayload);
         console.log(otpBody);

        return  res.status(200)
            .json({
                success:true,
                message:"OTP Sent Successfully",
                otp
            })
        }

        catch(error){
            console.log("error in sending message wala error: ",error.message);
            return res.status(500)
                    .json({
                        success:false,
                        message:"error in sending otp"
                    })
        }

}
//signup

exports.signup = async (req,res)=> {

        try{
const { accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    
     otp
} = req.body;

        if(!lastName || !firstName || !email || !password || !confirmPassword){
            return res.status(403)
                    .json({
                        success:false,
                        message:"All fields are required"
                    })
        }

        if(password!==confirmPassword){
                            return res.status(400)
                    .json({
                        success:false,
                        message:"Password and ConfirmPassword didn't matched, Please try again"
                    })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400)
                    .json({
                        success:false,
                        message:"User already exist, Please login"
                    })
        }
            console.log(email);
 //Find the most recent OTP generated for this email. and check with otp given during signup
            const recentOTP = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
//recentOTP document return kiya {email,otp}
        console.log(recentOTP);

 if (!recentOTP) {
   return res.status(400).json({
      success:false,
      message:"OTP not found/ OTP expired- OTP is available for only 5 minutes"
   })

} else if(otp !== recentOTP.otp){
                  return res.status(400)
                    .json({
                        success:false,
                        message:'Invalid OTP'
                    })
        }


// otp bhi barabar hai
//ab toh  user ko register krna padega
        const hashedPassword = await bcrypt.hash(password,10);
        
        // entry create in DB
          // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            // contactNumber,
            password:hashedPassword,
            accountType:accountType,
            //about ki id (profile ki id) (additiional  details)
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        })


                return res.status(200).json({
                success:true,
                message:"user registered",
                data:user
            })
             } catch(error){
            console.log("error in signup: ",error);
            return res.status(400).json({
                success:false,
                message: error.message,
            })
        }
        


}

//login

exports.login = async (req,res) => {
    try{
        console.log(" secrete ",process.env.JWT_SECRET);         

        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400)
                    .json({
                        success:false,
                        message:"All fields are required to login"
                    })
        }

        const user = await User.findOne({email}).populate("additionalDetails");
      //null document aya toh
        if(!user){
                 return res.status(401)
                    .json({
                        success:false,
                        message:"User is not registered, Please sign in to continue"
                    })
        }

//password compare krna jo database meh hai aur jo ab diya hai, bcrypt krke krna padega as database meh hash krke store kiya hai password        
        if( await bcrypt.compare(password,user.password)){
     //token banao based on yeh fields      
  //   Payload = data you want to store inside the token.

//Here you are storing:

//email → user's email

//id → user's MongoDB _id

             const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }

// It takes 3 parameters:
// payload → data you want inside token
// secret key → used to encrypt/verify token
// options → additional settings   
console.log("jwt secrete ",process.env.JWT_SECRET);         
             const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"3d"
            })
            // console.log("token is ",token);
    // Save token to user document in database
            user.token = token,
            user.password = undefined

            // cookie generate -cookie token save krne ka dabba
            const options = {
     //This means the cookie containing the JWT token will stay in the browser for 3 days.           
                expires: new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true
            }
            //creation of  cookie name,value,additional details
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,//user document
                message:"Logged in Successfully"
            })
        } else{
            return res.status(401).json({
                success:false,
                message:"password is incorrect"
            })
        }

    } catch(error){
            console.log(error);
                        return res.status(401).json({
                success:false,
                message:"login failure , please try again"
            })
    }
}
 
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
  
   const userDetails = await  User.findOne({ _id: req.user.id })
   //same as    const userDetails = await User.findById(req.user.id)
   // pura userdocument yeh return karega

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body;

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" })
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    // Send notification email
    try {
      const emailResponse = await mailSender(
        
        updatedUserDetails.email,
        //title
        "Password for your account has been updated",
        //body of email
        passwordUpdated(
            //email
          updatedUserDetails.email,
          //name
          `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      )
      console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}