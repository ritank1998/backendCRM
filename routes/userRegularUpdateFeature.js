import { userDetails } from "../mongodb/models/schema.js"
import CircularJSON from "circular-json"

let myName 
export const regularUpdateFeature = async(req,res)=>{
    const {myCode} = req.body
    console.log(myCode)
    try{
       const user = await userDetails.findOne({code: myCode})
       myName = user.Name
       res.status(200).json(CircularJSON.stringify({user}))

    }
    catch(bhangbhosdi){
        res.status(200).json(CircularJSON.stringify({bhangbhosdi: bhangbhosdi.message}))
    }
}

export const getTheUpdatingDetails = async(req,res)=>{
    try{
        const { myName} = req.body
        const myDetails = await userDetails.findOne({Name: myName})
        res.status(200).json(myDetails)
    }
    catch(err){
        res.status(500).json(CircularJSON.stringify({err: err.message}))
    }
}


//Json docs in the readme of backend
export const updateTheMemberInfo = async (req, res) => {
    try {
        const { myName, newWeight, newTargetWeight, newTrainer, newBmi, newWeeklyRoutine, newDone, newTrainerCode, newDate } = req.body;

        // Ensure newWeeklyRoutine is an array of objects
        if (!Array.isArray(newWeeklyRoutine)) {
            throw new Error('Weekly routine should be an array');
        }

        const isValidWeeklyRoutine = newWeeklyRoutine.every(item => {
            return item && typeof item === 'object' && 'day' in item && 'routine' in item;
        });

        if (!isValidWeeklyRoutine) {
            throw new Error('Invalid weekly routine format');
        }

        const new_update = await userDetails.updateOne({ Name: myName },
            {
                $set: {
                    weight: newWeight,
                    target_weight: newTargetWeight,
                    trainer: newTrainer,
                    bmi: newBmi,
                    weekly_routine: newWeeklyRoutine, // Update weekly routine with the provided value
                    done: newDone,
                    trainer_code: newTrainerCode,
                    date: newDate
                }
            });

        res.status(200).json({ message: 'Member information updated successfully', new_update });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

