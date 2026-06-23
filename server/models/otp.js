const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVericationTemplate");

//OTP document is saved in the database.
//createdAt stores the creation time.
//After 5 minutes, MongoDB automatically deletes that OTP document.
// 5* 60sec 
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
     },
    otp:{
        type:String,
     },
    createdAt:{
          type:Date,
     //stores the current time at the time of creation of this docu     
        default:Date.now,
        expires:5*60
    }
})

// function to send emails
//dusre kidr toh file meh iss function ko call karenge with sendVerificationEmail(a,b)
async function sendVerificationEmail(email,otp) {
    try{
        // email, titlte, body
        const emailResponse = await mailSender(email,"Verification Email from StudyNotion",emailTemplate(otp) );
        console.log("Email sent successfully: ",emailResponse);
    }catch(error){
        console.log("error occured while sending emails: ",error);
        throw error;
    }
}



// otpSchema.pre("save",async function (){
//     await sendVerificationEmail(this.email,this.otp);

//   })


  otpSchema.pre("save", async function () {
    try {
        await sendVerificationEmail(this.email, this.otp);
    } catch (error) {
        console.log("Email failed but OTP will still save");
    }
});

module.exports = mongoose.model("OTP",otpSchema);