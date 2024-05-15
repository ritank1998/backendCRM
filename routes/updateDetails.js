import CircularJSON from "circular-json"
import { inactive } from "../mongodb/models/schema.js"




//updating the user details in the inactive database and creating the payment link for new payment and upgradation
//this api to called when the payment is updated from the client after update payment



//Make an update to this only after the update payment is received and the payment status is received and the satus is updated to success in the database
// Before this make an api to send the expiration link of the update details form and then when the form is sent redirect to the payments page and then when paid update to redirection page and save the updated details and move the client from the inactive to active db
export const updateDetails = async(req,res)=>{
    const {email , newAmount , service} = req.body
    try{
        const new_update = await inactive.updateOne({ email: email },
            {
                $set: {
                    cost: newAmount,
                    Service: service
                   
                }
            });
        res.status(200).json({ message: 'Member information updated successfully', new_update });
    }
    catch(err){
        res.status(500).json(CircularJSON.stringify({err: err.message}))
    }
}