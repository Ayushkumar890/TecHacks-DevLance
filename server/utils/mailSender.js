const nodemailer = require('nodemailer');
require("dotenv").config();

const mailSender = async (email, subject, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,  
            port: 465, 
            secure: true, 
            auth: {
                user: process.env.MAIL_USER,  
                pass: process.env.MAIL_PASS,  
            },
        });

        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: subject,
            html: body,
        });

        console.log("Email sent successfully: ");
        return info;
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
};


module.exports = mailSender;
