import CircularJSON from "circular-json"
import { walkInVisitors } from "../mongodb/models/schema.js"

export const visitorDeleteOperation = async(req,res)=>{
    const {email} = req.body
    try{
       const user = await walkInVisitors.deleteOne({email: email})
       res.status(200).json(CircularJSON.stringify({user}))
    }
    catch(err){
        res.status(500).json(CircularJSON.stringify({err: err.message}))
    }
}