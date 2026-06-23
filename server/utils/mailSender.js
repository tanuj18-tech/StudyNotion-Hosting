const nodemailer = require("nodemailer");

const mailSender = async (email,title, body) => {
    try{
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        //jisse email jayega woh mail user
        user: process.env.MAIL_USER,
        //password for sending mail
        pass: process.env.MAIL_PASS,
      },
    });

        let info = await transporter.sendMail({
            from:'StudyNotion App- Tanuj',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })

        console.log(info);
        return info;
    }

    catch(error){
        console.log(error);
    }
}

module.exports = mailSender;