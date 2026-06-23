const  mongoose  = require("mongoose");
const {instance} = require("../config/razorpay");
 
const User = require("../models/User");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
const { useId } = require("react");

exports.capturePayment = async (req, res) => {
  const {courses} = req.body;
  const userId = req.user.id;
 console.log("idhar  kya  ba");
    if(courses.length === 0){
      return res.json({
        success: false,
        message: "Please provide Course Id"
      })
    }


    let totalAmount = 0;
    // cart meh jo courses dale hai, woh bheja ja raha hai ismeh aur unka total amount calc karrahe hai
    for(const course_id of courses){
      let course;
      try{
          course = await Course.findById(course_id);
          if(!course){
            return res.json({
              success:false,
              message: "Could not find the course"
            })
          }

            // object meh  convert krta hai bas
          const uid = new mongoose.Types.ObjectId(userId);
          if(course.studentsEnrolled.includes(uid)){
            return res.json({success:false, message:"Student is already enrolled"})
          }

          totalAmount+= course.price;
      } catch(error){
          return res.status(500).json({
            success:false,
            message:error.message
          })
      }
    }


console.log("total price = ",totalAmount);
    const options = {
      amount: totalAmount*100,
      currency:"INR",
      receipt: Math.random(Date.now()).toString()
    }

    try{
      const paymentResponse = await instance.orders.create(options);
      res.json({
        success: true,
        message:paymentResponse
      })
    } catch(error){
      console.log(error);
      return res.status(500).json({
          success:false,
          message: "Could not initiate order "
      })
    }


}

exports.verifyPayment = async (req, res) => {
  //bhaiiii RAZORPAYSECRET HAI KYA RAZORPAYSECRETKEY YEH DEKH LE PLEASE EK BAAR
  console.log("SECRET:fddf ", process.env.RAZORPAY_SECRETKEY);
    const razorpay_order_id = req.body?.razorpay_order_id;
    const {razorpay_payment_id} = req.body;
    const {razorpay_signature} = req.body;

    const {courses} = req.body;
    const userId = req.user.id;
     if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
      return res.status(404).json({
        success:false,
        message: "field missing"
      })
    }
    console.log("order_id:", razorpay_order_id);
console.log("payment_id:", razorpay_payment_id);
console.log("signature from razorpay:", razorpay_signature);
     // console.log("secret = ",process.env.REACT_APP_RAZORPAY_SECRETKEY);
 console.log("tafdfd");
    let body = razorpay_order_id + "|" + razorpay_payment_id;


 


    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRETKEY)
                                .update(body.toString())
                                .digest("hex");console.log("expected signature:", expectedSignature);
console.log("actual signature:", razorpay_signature);
                                console.log("expected signature:", expectedSignature);
    console.log("hiiidfsdf");
    if(expectedSignature === razorpay_signature){
        //enroll karo student ko 
        console.log("hii");
        await enrollStudents(courses, userId)
        return res.status(200).json({
          success: true,
          message: "Payment Verified"
        })
    }

    return res.status(500).json({
          success: false,
          message: "Payment Failed"
        })
}


const enrollStudents = async ( courses, userId, res) => {
    // heree courses is an array of course ids
      if(!courses || !userId){
        return res.status(404).json({
          success:false,
          message: "Please provide courses and userid"
        })
      }


 
      for(const courseId of courses){
          try {
             // find the course and enroll the student
        const enrolledCourse = await Course.findByIdAndUpdate({_id: courseId}, 
            // studentsEnroled ke array meh userId push krdo
          {
            $push: {studentsEnrolled: userId},

          }, 
          // yeh wala kaam aana chaiye course meh , woh wala return krdo
          {new:true}
        );


        if(!enrolledCourse){
          return res.status(500).json({
            success:false,
            message: "Course not found"
          })
        }

        const courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId: userId,
          completedVideos: []
        })

              const enrolledStudent = await User.findByIdAndUpdate({_id: userId},
        {
          $push: {
            courses:courseId,
            courseProgress:courseProgress._id
          },

          // sir ne aesa kiya hai check krle : {courseID: courseId}
        },
        {new:true}
      )


      //bacche ko mail send krdo 
      const emailResponse = await mailSender( enrolledStudent.email 
        , `Successfully Enrolled into ${enrolledCourse.courseName}`, 
        courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledCourse.firstName}`) )

        console.log("Email Sent Successfully", emailResponse.response);
      }
        

           catch (error) {
            console.log(error.message);
            return res.status(500).json({
              success:false,
              message: error.message
            })
          }


}


      // user ke model meh course ka arrray hai , uss course ko bhi usmeh dalna padega

}

exports.sendPaymentSuccessEmail = async (req, res) =>  {
      const {orderId, paymentId, amount } = req.body;
      const userId = req.user.id;

      if(!orderId  || !paymentId || !amount || !userId){
          return res.status(400).json({
            success:false,
            message:"Please provide all the fields"
          })
      }


      try {
          // student ko dhundo success mail send krne keliye
          const enrolledStudent = await User.findById(userId);
          await mailSender(
            enrolledStudent.email,
            // description
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`, amount/100, orderId, paymentId)
          )
      } catch (error) {
          console.log("error in sending mail", error.message);
                    return res.status(500).json({
            success:false,
            message:"Could not send email"
          })
      }
}  

 // exports.capturePayment = async (req,res) => {
//     const {course_id} = req.body;
//     const userId = req.user.id;
//     if(!course_id){
//         return res.status(500).json({
//             success:false,
//             message: "please provide valid course id"
//         })
//     }

//     //getting course detail
//     let course;


// // try block to check agar student already enrolled  hai woh course ke
//     try {
//             course = await Course.findById(course_id);
//             if(!course){
//                  return res.status(500).json({
//                  success:false,
//                  message: "could not find the course"
//             })
//             }

//             //user already pay for the same course
//             //userId string meh thi usko objectid meh convert kiyya
//             const uid = new mongoose.Types.ObjectId(userId);
//             if(course.studentsEnrolled.includes(uid)){
//                   return res.status(500).json({
//                  success:false,
//                  message: "Student is already enrolled"
//             })   
//             }


//     } catch (error) {
//         console.error(error);
//                  return res.status(500).json({
//                  success:false,
//                  message: error.message
//             })
//     }

//     const amount = course.price;
//     const currency  = "INR";    
//     // amount should be * with 100 
//     //syntax
//     const options = {
//         //mandatory
//         amount : amount * 100,
//         currency,
//         //optional

//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId: course_id,
//             userId
//         }
//     }
    
//     try {
//       //orders is inbuilt
//             const PaymentResponse = await instance.orders.create(options);
//             console.log(PaymentResponse);
            
//             return res.status(200)
//                     .json({
//                         success: true,
//                         courseName: course.courseName,
//                         courseDescription: course.courseDescription,
//                         thumbnail: course.thumbnail,
//                         orderId: PaymentResponse.id,
//                         currency: PaymentResponse.currency,
//                         amount: PaymentResponse.amount
//                     })
//     } catch (error) {
//             console.log(error);
//             // return kiya toh iske baad kuch bhi nai dekhega,("continue" type)
//             res.json({
//                 success: false,
//                 message:"Could not initiate order"
//             })
//     }

// }

//verify signature
// exports.verifySignature = async (req,res) => {
//     //apne wlla secret
//     const webhookSecret = "12345";
//     // A B C Steps
//     const shasum = crypto.createHmac("sha256",webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     const signature = req.headers["x-razorpay-signature"];

//     if(signature === digest){
//         console.log("Payment is Authorised");

//         //student ko enroll krna course meh , unke id ko pushback krna
//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try {
//                 //find the course and enroll the student in it
//                 const enrolledCourse = await Course.findOneAndUpdate(
//                                     //based on condition
//                                     {_id: courseId},
//                                     //what to do with  that
//                                     {$push: {studentsEnrolled: userId}},

//                                     {new: true}
//                 );

//                 if(!enrolledCourse){
//                     return res.status(200).json({
//                         success:false,
//                         message:"course not found"

//                     })
//                 }
//                 console.log("enroolled course ",enrolledCourse);

//                 // student meh course ko add krna
//                 const enrolledStudent = await User.findOneAndUpdate(
//                                         {_id: userId},
//                                         {$push: {courses: courseId}},
//                                         {new: true}
//                 )

//                 console.log(enrolledStudent);

//                 //mail send karna
//                 const emailResponse = await mailSender(
//                     //mail meh yeh 3 chize  hai 
//                                     //to
//                                         enrolledStudent.email,
//                                         //titlte
//                                         "Congratulations From Codehelp",
//                                         //body
//                                         "Congratulations, you are onboarded to a new course"
//                 )

//                 console.log(emailResponse);
//                 return res.status(200).json({
//                     success: true,
//                     message: "signature verified and course added"
//                 })
//         } catch (error) {
//                 console.log(error);
//                          return res.status(500).json({
//                     success: false,
//                     message: error.message
//                 })
//         }
//     }
//     else{
//                     return res.status(400).json({
//                     success: false,
//                     message: "invalid request"
//                 })
//     }


// }

// // Send Payment Success Email
// exports.sendPaymentSuccessEmail = async (req, res) => {
//   const { orderId, paymentId, amount } = req.body

//   const userId = req.user.id

//   if (!orderId || !paymentId || !amount || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide all the details" })
//   }

//   try {
//     const enrolledStudent = await User.findById(userId)

//     await mailSender(
//       enrolledStudent.email,
//       `Payment Received`,
//       paymentSuccessEmail(
//         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
//         amount / 100,
//         orderId,
//         paymentId
//       )
//     )
//   } catch (error) {
//     console.log("error in sending mail", error)
//     return res
//       .status(400)
//       .json({ success: false, message: "Could not send email" })
//   }
// }



// // enroll the student in the courses
// const enrollStudent = async (courses, userId, res) => {
//   if (!courses || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please Provide Course ID and User ID" })
//   }

//   for (const courseId of courses) {
//     try {
//       // Find the course and enroll the student in it
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         { $push: { studentsEnroled: userId } },
//         { new: true }
//       )

//       if (!enrolledCourse) {
//         return res
//           .status(500)
//           .json({ success: false, error: "Course not found" })
//       }
//       console.log("Updated course: ", enrolledCourse)

//       const courseProgress = await CourseProgress.create({
//         courseID: courseId,
//         userId: userId,
//         completedVideos: [],
//       })
//       // Find the student and add the course to their list of enrolled courses
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             courses: courseId,
//             courseProgress: courseProgress._id,
//           },
//         },
//         { new: true }
//       )

//       console.log("Enrolled student: ", enrolledStudent)
//       // Send an email notification to the enrolled student
//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         `Successfully Enrolled into ${enrolledCourse.courseName}`,
//         courseEnrollmentEmail(
//           enrolledCourse.courseName,
//           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//         )
//       )

//       console.log("Email sent successfully: ", emailResponse.response)
//     } catch (error) {
//       console.log(error)
//       return res.status(400).json({ success: false, error: error.message })
//     }
//   }
// }