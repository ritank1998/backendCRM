import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});

export const sendEmail = async (client , sub , body) => {
   
    try {
        let mailOptions = {
            from: 'saxena.ritank@gmail.com',
            to: client,
            subject: sub,
            text:body
        };
        const response = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + response);
       return mailOptions
    } catch (error) {
       return error.message
    }
};