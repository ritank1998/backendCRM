import CircularJSON from "circular-json";
import { tickets } from "../mongodb/models/schema.js";
import nodemailer from "nodemailer"


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saxena.ritank@gmail.com',
        pass: 'jxtyxdltbkihtcpc'
    }
});


//APi to create the tickets for the client approval and further processing
export const ticketCreation =async(req,res)=>{
    const {Title , Description } = req.body
    try{
        const myTickets = new tickets({
            Title,
            Description,
            Date: new Date
        })
        console.log(Description , Title)
        const newTicket = myTickets.save()
        let mailOptions = {
            from: 'saxena.ritank@gmail.com',
            to: 'ritank1998@gmail.com',
            subject: 'New Ticket Created',
            text:`${Title}`
        };
        const response = await transporter.sendMail(mailOptions);
        res.status(200).json(CircularJSON.stringify({myTickets , response}))
    }
    catch(err){
        res.status(500).json(CircularJSON.stringify({err: err.message}))
    }
}


//loads the ticket in the UI panel of the Ticket
export const getTicket = async(req,res)=>{
    try{
          const allTickets = await tickets.find()
          res.status(200).json(allTickets)
    }
    catch(err){
        res.status(500).json(CircularJSON.stringify({err: err.message}))
    }
}



//Api to delete the tickets using the button click in the UI of the tickets .
export const deleteTicket = async(req,res)=>{
    const {_id} = req.body
    try{
        const deleteTicket = await tickets.deleteOne({_id: _id})
        res.status(200).json(CircularJSON.stringify({deleteTicket}))
    }
    catch(russian){
        res.status(500).json(CircularJSON.stringify({russian: russian.message}))
    }
}


