import CircularJSON from "circular-json";
import nodemailer from "nodemailer"
import { trainerCode } from "../mongodb/models/schema.js";


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saxena.ritank@gmail.com',
        pass: 'jxtyxdltbkihtcpc'
    }
});

const sendEmail = async (trainer , code) => {
   
    try {
        let mailOptions = {
            from: 'saxena.ritank@gmail.com',
            to: trainer,
            subject: 'Tainer Authentication Code',
            text:`Hi , ${trainer} please find Your Authentication code for today attached in this Email. Happy Training ${code}`
        };
        const response = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + response);
       return mailOptions
    } catch (error) {
       return error.message
    }
};

export const trainerDetails = async (req, res) => {
    const { name } = req.body;
    try {
        const trainer = new trainerCode({
            Name: name
        });
        
        const savedTrainer = await trainer.save();
        res.status(200).json(savedTrainer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const codeGeneration = async()=>{
    try{
        const length = 8;
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
    
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
    
        return code
    }
    catch(err){
       return err.message
    }
}


export const assignTrainerCode = async()=>{
    try{
        const trainerCount = await trainerCode.countDocuments();
        const trainers = await trainerCode.find();
        
        for(let i=0; i<trainers.length; i++){
            const trainer = trainers[i];
            const generatedCode = await codeGeneration(); // Await code generation
            
            const new_update = await trainerCode.updateOne(
                { _id: trainer._id },
                { $set: { code: generatedCode } }
            );
            sendEmail('ritank1998@gmail.com' , generatedCode)
        }
       return trainerCount
    }
    catch(err){
        return err.message
    }
}