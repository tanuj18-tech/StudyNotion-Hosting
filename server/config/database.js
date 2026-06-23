const mongoose = require("mongoose");
// require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONDB_URL)
            .then(
                ()=>{
                    console.log("DB Connnection Successfull");
                }
            )
            .catch(
                (error)=>{
                    console.log("db connection failed");
                    console.log(error);
                    process.exit(1);
                }
            )
}