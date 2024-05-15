import CircularJson from 'circular-json'
import { userDetails , inactive } from '../mongodb/models/schema.js'
import CircularJSON from 'circular-json'



export const transferCredit = async(req,res)=>{
    const {email} = req.body
    try{
       const user = await inactive.findOne({email: email},
    {
        $set: {
            Name,
            email: newEmail ,
            trainer: newTrainer,
            bmi: newBmi,
            weekly_routine: newWeeklyRoutine, // Update weekly routine with the provided value
            done: newDone,
            trainer_code: newTrainerCode,
            date: newDate
        }
    })
       
       
    }
    catch(err){
        res.status(500).json(CircularJson.stringify({err: err.message}))
    }
}