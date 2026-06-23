const jwt = require("jsonwebtoken");
// require("dotenv").config();
const User = require("../models/User");

//authenticate krne keliye user requests ko
exports.auth = async (req,res,next) => {
     
    try {
        // console.log("idhar araha??");
        // extract token
        // console.log("hi");
const authHeader = req.header("Authorization");
// console.log("AUTH HEADER:", authHeader);
// console.log("HEADERS:", req.headers);
const token =
//   (req.cookies && req.cookies.token) ||
//    req.body.token  || 
 (authHeader ? authHeader.split(" ")[1] : null);
        // console.log("idhar token araha postman se: ",token);
 
        if(!token){
            return res.status(401)
                    .json({
                        success:false,
                        message:"token is missing"
                    })
        }


        // verify token
        try {
// console.log("TOKEN:", token);
// console.log("SECRET:", process.env.JWT_SECRET);

const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            // Storing the decoded JWT payload in the request object for further use
            req.user = decode;
        } catch (error) {
            console.log(error);
                   return res.status(401)
                    .json({ 
                        success:false,
                        message:"token is invalid"
                    })
        }
        next();
 // yeh student, instructor , admin teeno ko jane dega,
 //agar registered hi nahi hai toh bhaga dega       
    } catch (error) {
        console.log("eroroorr now is ",error.message);
            return res.status(401)
                    .json({
                        success:false,
                        message: "something went wrong while validating the token"
                    })
    }
}



exports.isStudent = async (req,res, next) => {
    try {
        const userDetails = await User.findOne({ email: req.user.email });
        //student chodke baki kya toh hai toh(instr/admin)   
        if(userDetails.accountType !== "Student"){
                         return res.status(401)
                    .json({
                        success:false,
                        message: "this is a protected route for students only"
                    })
            }

    next();
    } catch (error) {
        console.log(error);
         return res.status(401)
                    .json({
                        success:false,
                        message: "user role cannot be verified"
                    })
    }
}



exports.isInstructor = async (req,res,next) => {
    try {
        // console.log("idhar phat");
         // dusra mtd ...
        // console.log(req.user.accountType);
            if(req.user.accountType !== "Instructor"){
                         return res.status(401)
                    .json({
                        success:false,
                        message: "this is a protect route for Instructor only"
                    })
            }
            next();
                  

    } catch (error) {
        console.log(error);
         return res.status(401)
                    .json({
                        success:false,
                        message: "user role cannot be verified"
                    })
    }
}

//is Admin
exports.isAdmin = async (req,res, next) => {
    try{
const userDetails = await User.findOne({ email: req.user.email });

        if(userDetails.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admin only"
            })
        }

        next();
    }catch(error){
             return res.status(500).json({
                success:false,
                message:"user role cannnot be verified, please try again"
            })
        
    }
}