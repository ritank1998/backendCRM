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
        user: 'saxena.ritank@gmail.com',
        pass: 'jxtyxdltbkihtcpc'
    }
});
export const sendEmail = async (req, res) => {
    const { expLink, client } = req.body;
    try {
        let mailOptions = {
            from: 'saxena.ritank@gmail.com',
            to: client,
            subject: 'Self Registration Form',
            text:`Hi , Thank You for Visiting Us , Please proceed with the mentioned Link to complete your registration and Payment Process ${expLink}`
        };
        const response = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + response);
        res.status(200).json({ response });
    } catch (error) {
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






