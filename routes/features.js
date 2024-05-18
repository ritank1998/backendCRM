import CircularJSON from "circular-json";
import mongoose from "mongoose";
import nodemailer from "nodemailer"
import crypto from "crypto"
import dotenv from "dotenv"
import { userDetails } from "../mongodb/models/schema.js";


dotenv.config()

//click the avatar on the google and go to manage accounts 
//click security on the left handside then enable 2 factor authentication
//then go to 2 factor authentication , then scroll down the window and click app passwords then set up ur app and click create
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "saxena.ritank@gmail.com",
      pass: "jxtyxdltbkihtcpc"
    },
    // Optional: Enable TLS for secure connections (recommended)
    secure: true,
    // Optional for less secure apps (for testing only, use secure alternative if possible)
    // tls: { rejectUnauthorized: false }
  });
  
  export const sendEmail = async (req, res) => {
    const { expLink, client } = req.body;
  
    try {
      let mailOptions = {
        from: "saxena.ritank@gmail.com", // Use verified sender email
        to: client,
        subject: 'Self Registration Form',
        text: `Hi, Thank you for visiting us. Please proceed with the mentioned link to complete your registration and payment process: ${expLink}`
      };
  
      const response = await transporter.sendMail(mailOptions);
      console.log('Email sent:', response);
      res.status(200).json({ response: response.response });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: error.message });
    }
  };
export const addPoints = async(req,res)=>{
    try{
         const length = await userDetails.countDocuments()
         for(let i=0;i<length;i++){
            if(userDetails[i].reception === `${reception}`){
                let points = 0;
                points = points + 1
            }
         }
         res.status(200).json(CircularJSON.stringify({points})) 
    }
    catch(err){
        res.status(500).json(CircularJSON.stringify({err: err.message}))
    }
}






