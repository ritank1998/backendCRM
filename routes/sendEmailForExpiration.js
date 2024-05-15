import CircularJSON from "circular-json";
import { userDetails } from "../mongodb/models/schema.js";
import nodemailer from "nodemailer"
import cron from "node-cron"

//transporter body 
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saxena.ritank@gmail.com',
        pass: 'jxtyxdltbkihtcpc'
    }
});

const dayZeroBody = "Hi , Your Plan Has Expired !! Your Access To Our System and Services Have been Revoked";
const dayOneBody = "Hi Please Review Your Plan , Its About to expire in Next 1 day";
const dayTwoBody = "Hi Please Review Your Plan, Its About to expire in Next 2 days";
const dayThreeBody = "Hi Please Review Your Plan, Its About to expire in Next 3 days";
const emailBodyForReceptionist = 'Hey Please Review the client validity status , Will be removed out of the System by the end of the day today'

export const sendEmail = async (client, body) => {
    try {
        let mailOptions = {
            from: 'saxena.ritank@gmail.com',
            to: client,
            subject: 'Your Plan About to Expire',
            text: body
        };
        const response = await transporter.sendMail(mailOptions);
        
        return response; // Return the response from sending the email
    } catch (error) {
        throw error; // Throw the error to handle it in the calling function
    }
};

export const sendEmailToTrainer = async (trainer, body , client) => {
    try {
        let mailOptions = {
            from: 'saxena.ritank@gmail.com',
            to: trainer,
            subject: `Hi Your Client name ${client} is ablut to get deleted from the database`,
            text: body
        };
        const response = await transporter.sendMail(mailOptions);
        
        return response; // Return the response from sending the email
    } catch (error) {
        throw error; // Throw the error to handle it in the calling function
    }
};

export const sendEmailToReceptionist = async (reception, body , client) => {
    try {
        let mailOptions = {
            from: 'saxena.ritank@gmail.com',
            to: reception,
            subject: `Hi Your Client name ${client} is ablut to get deleted from the database`,
            text: body
        };
        const response = await transporter.sendMail(mailOptions);
        
        return response; // Return the response from sending the email
    } catch (error) {
        throw error; // Throw the error to handle it in the calling function
    }
};


let end_dates = []
export const getAllMembersDate = async (req, res) => {
    try {
        const endDateArray = await userDetails.find({});
        
        endDateArray.forEach(member => {
            const endDate = member.End_Date;
            if (!end_dates.includes(endDate)) {
                end_dates.push(endDate);
            }
        });

        
        
    } catch (err) {
        return err.message
        
    }
};


export const dateImplementationForThreeDays = async () => {
    try {
        let members = [];
        
        for (let i = 0; i < end_dates.length; i++) {
            const dateStr = end_dates[i];
            const [day, month, year] = dateStr.split('/');
            const formattedDateStr = `${year}-${month}-${day}`;
            const dateObj = new Date(formattedDateStr);

            const reqDate = dateObj.getDate();
            const newDate = new Date();
            const myDate = newDate.getDate();

            if (reqDate === myDate + 3) {
                const mem = await userDetails.findOne({ End_Date: dateStr });
                members.push(mem.email)
    
                console.log(members)
            }
        }
        for(let i=0;i<members.length;i++){
            sendEmail('saxena.ritank@gmail.com' , dayThreeBody)
            members.shift()
        }
        
        
    } catch (err) {
        return err.message
    }
};


export const dateImplementationForTwoDays = async () => {
    try {
        let members = [];

        for (let i = 0; i < end_dates.length; i++) {
            const dateStr = end_dates[i];
            const [day, month, year] = dateStr.split('/');
            const formattedDateStr = `${year}-${month}-${day}`;
            const dateObj = new Date(formattedDateStr);

            const reqDate = dateObj.getDate();
            const newDate = new Date();
            const myDate = newDate.getDate();

            if (reqDate === myDate + 2) {
                const mem = await userDetails.findOne({ End_Date: dateStr });
                members.push(mem.email)
            }
        }
        for(let i=0;i<members.length;i++){
            sendEmail(members[i] , dayTwoBody)
            members.shift()
        }
        
    }
    catch (err) {
        return err.message;
    }
}

export const dateImplementationForOneDays = async () => {
    try {
        let members = [];

        for (let i = 0; i < end_dates.length; i++) {
            const dateStr = end_dates[i];
            const [day, month, year] = dateStr.split('/');
            const formattedDateStr = `${year}-${month}-${day}`;
            const dateObj = new Date(formattedDateStr);

            const reqDate = dateObj.getDate();
            const newDate = new Date();
            const myDate = newDate.getDate();

            if (reqDate === myDate + 1) {
                const mem = await userDetails.findOne({ End_Date: dateStr });
                members.push(mem.email)
            }
        }
        for(let i=0;i<members.length;i++){
            sendEmail(members[i] , dayOneBody)
            members.shift()
        }
        
    }
    catch (err) {
        return err.message
    }
}

export const dateImplementationForZeroDay = async () => {
    try {
        let members = [];
        let receptionist = []
        for (let i = 0; i < end_dates.length; i++) {
            const dateStr = end_dates[i];
            const [day, month, year] = dateStr.split('/');
            const formattedDateStr = `${year}-${month}-${day}`;
            const dateObj = new Date(formattedDateStr);

            const reqDate = dateObj.getDate();
            const newDate = new Date();
            const myDate = newDate.getDate();

            if (reqDate === myDate) {
                const mem = await userDetails.findOne({ End_Date: dateStr });
                members.push(mem.email)
                receptionist.push(mem.reception)
            }
        }
        for(let i=0;i<members.length;i++){
            sendEmail(members[i] , dayZeroBody)
            sendEmailToReceptionist(receptionist[i] , emailBodyForReceptionist, members[i] )
            members.shift()
        }
        
    } catch (err) {
        return err.message
    }
};


