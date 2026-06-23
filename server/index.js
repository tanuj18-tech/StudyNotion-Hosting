// require("dotenv").config();
require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const cookieParse = require("cookie-parser");

//backend ki request ko frontend entertain kare isliye yeh install krna pdta hai
const cors = require("cors");

const {cloudinaryConnect} = require("./config/Cloudinary");
const fileUpload = require("express-fileupload")
// console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_SECRETKEY);
 
 const PORT = process.env.PORT || 4000;

database.connect();

//middlewares add krna
app.use(express.json());
app.use(cookieParse());

//frontend se jo call lagega usko entertain krna
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials: true
    })
)

//cloudinary ko upload krne ka syntax
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "ur server is up and running..."
    })
})

app.listen(PORT, ()=>{
    console.log(`App is running at PORT ${PORT}`);
})