import CircularJSON from "circular-json";
import nodemailer from "nodemailer"
import { walkInVisitors } from "../mongodb/models/schema.js";


//transporter body 
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saxena.ritank@gmail.com',
        pass: 'jxtyxdltbkihtcpc'
    }
});

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



let end_dates = [];

export const getAllVisitorDate = async (req, res) => {
    try {
        const endDateArray = await walkInVisitors.find({});
        
        endDateArray.forEach(member => {
            const endDate = member.Next_Date_Of_Contact;
            if (!end_dates.includes(endDate)) {
                end_dates.push(endDate);
            }
        });

        const currentDate = new Date().toLocaleDateString(); // Get today's date without time

        for (let i = 0; i < end_dates.length; i++) {
            const dateStr = end_dates[i];
            const [day, month, year] = dateStr.split(/\/|-/); // Split the date string by '/' or '-'
            const formattedDateStr = `${year}-${month}-${day}`;
            const dateObj = new Date(formattedDateStr);

            if (dateObj.toLocaleDateString() === currentDate) {
                await activateMailing(end_dates[i]);
            }
        }

        //res.status(200).json({ message: "Emails sent successfully" });
        console.log(end_dates);
    } catch (err) {
        return err.message
    }
};

// here we need to build the functionality that for which name the code need to take which of the email 


const activateMailing = async (date) => {
    try {
        const user = await walkInVisitors.findOne({ Next_Date_Of_Contact: date });
        const reception = user.reception;
        await sendEmail('ritank1998@gmail.com', "Plan about to expire");
        console.log(reception, date);
    } catch (err) {
        return err.message;
    }
};
