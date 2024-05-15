import CircularJSON from "circular-json"
import { walkInVisitors } from "../mongodb/models/schema.js"
export const scheduleAppointment = async(req,res)=>{
    const {Name , number , email ,gender} = req.body
    const reqDate = new Date()
    try{
        const appointment = walkInVisitors({
            Name , 
            number , 
            email , 
            Date : reqDate,
            gender , 
            Enquiry_Type: 'Appointement'
        })
        const myAppointment = await appointment.save()
        res.status(200).json(CircularJSON.stringify({myAppointment}))
    }
    catch(makda){
          res.status(500).json(CircularJSON.stringify({makda: makda.message}))
    }
}