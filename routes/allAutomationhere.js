import cron from 'node-cron'
import {getAllMembersDate , dateImplementationForZeroDay , dateImplementationForTwoDays , dateImplementationForOneDays , dateImplementationForThreeDays } from "./sendEmailForExpiration.js"
import {pushToInactiveDatabase} from "./userCreation.js"
import { getAllVisitorDate } from './sendemailfornotification.js';
import { deleteVisitorWhenExpire } from './searchFilters.js';
import { assignTrainerCode } from './randomcodegeneration.js';



//autpmation for everyday 06.06 pm

cron.schedule('06 06 * * *', () => {
    getAllMembersDate();
    dateImplementationForZeroDay();
    dateImplementationForTwoDays();
    dateImplementationForOneDays();
    dateImplementationForThreeDays();
}, {
    timezone: "Asia/Kolkata"
});


//automation for every 10 seconds
cron.schedule('*/10 * * * * *', () => {
    pushToInactiveDatabase()
});


//automation for every 12 hour
cron.schedule('0 */12 * * *' ,()=>{
    getAllVisitorDate()
    deleteVisitorWhenExpire()
})


//this code runs everyday at 6 am in the morning to send the trainers authentication code
cron.schedule('0 6 * * *' , ()=>{
   assignTrainerCode()
   console.log("Cron running")
})