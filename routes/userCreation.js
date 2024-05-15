import mongoose from "mongoose";
import express from "express"
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { walkInVisitors, userDetails, newBusiness, inactive } from "../mongodb/models/schema.js";
import CircularJSON from "circular-json";
import { Novu } from "@novu/node";
import cron from "node-cron"
const NOVU_KEY = '5a81b3ea5f716a12e4224205bbf4dcd1'

const generateKeys = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}
const accessKey = generateKeys(16)
const refreshKey = generateKeys(16)

// Function to generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, accessKey, { expiresIn: '1m' }); // Token expires in 1 minute
};

//when login to the CRM by a New Business
export const signup = async (req, res) => {
    try {
        const { fullName, email, number, password, confirm_password, Business_Type } = req.body
        const businessDetails = newBusiness({
            fullName,
            email,
            number,
            password,
            confirm_password,
            Business_Type,
        })
        const newClient = await businessDetails.save()
        res.status(200).json(CircularJSON.stringify({ newClient }))
    }
    catch (error) {
        res.status(500).json(CircularJSON.stringify({ error: error.message }))
        console.log(error)
    }
}

//Business Login Details for entering the CRM
export const businessDetails = async (req, res) => {
    const { email, password } = req.body; 
    try {

        const user = await newBusiness.findOne({ email: email });

        console.log(email);
        const pass = user.password;
        console.log(pass);

        if (pass === password) {
            const token = generateToken(user._id);
            console.log(token);
            return res.status(200).json({ user, token });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
       
    } catch (error) {
        return res.status(500).json(CircularJSON.stringify({ error: error.message }));
    }
};


//when user arrives in the work station
export const users = async (req, res) => {
    const novu = new Novu(NOVU_KEY)
    try {
        const { Name, gender, number, email, reception, Date, Next_Date_Of_Contact, Enquiry_Type , Status } = req.body;

        const myVisitor = walkInVisitors({
            Name,
            number,
            email,
            reception,
            Date,
            gender,
            Next_Date_Of_Contact,
            Enquiry_Type,
            Status

        })
        const newUser = await myVisitor.save()
        const notifEmail = novu.trigger('crm-visitorcreated', {
            to: {
                subscriberId: `${email + "_" + Name}`,
                email
            },
            payload: {}
        });
        res.status(200).json(CircularJSON.stringify({ newUser, notifEmail }))

    }
    catch (error) {
        res.status(500).json(CircularJSON.stringify({ error: error.message }))
        console.log(error)
    }
}



export const clients = async (req, res) => {
    const novu = new Novu(NOVU_KEY)
    try {
        const { transaction_Id, Payment_Status, age, Emergency_Relation, Emergency_Name, gender, enroll, customer_Id, Name, number, email, Date_Of_Billing, End_Date, Address, payment_Intent, InvoiceId, Emergency_Contact, Emergency_Email, Emergency_Address, reception, Service , adhaar , code , cost } = req.body
        
        const myClients = userDetails({
            Name,
            number,
            email,
            age: age,
            customer_Id,
            Date_Of_Billing,
            End_Date,
            Address,
            payment_Intent,
            InvoiceId,
            Emergency_Contact,
            Emergency_Email,
            Emergency_Address,
            reception,
            Service,
            enroll,
            Emergency_Name,
            Emergency_Relation,
            gender,
            Payment_Status,
            transaction_Id,
            adhaar,
            code,
            cost,
            payment_status: "success"
        })
        const newClient = myClients.save()
        const sendNotif = await novu.trigger('new-clients', {
            to: {
                subscriberId: `${email + "_" + customer_Id}`,
                email
            },
            payload: {}
        });
        res.status(200).json(CircularJSON.stringify({ newClient, sendNotif }))
    }
    catch (error) {
        res.status(500).json(CircularJSON.stringify({ error: error.message }))
    }
}


export const mannualClients = async (req, res) => {
    const novu = new Novu(NOVU_KEY)
    try {
        const { transaction_Id, Payment_Status, age, Emergency_Relation, Emergency_Name, gender, enroll, customer_Id, Name, number, email, Date_Of_Billing, End_Date, Address, payment_Intent, InvoiceId, Emergency_Contact, Emergency_Email, Emergency_Address, reception, Service , adhaar , code , cost } = req.body
        
        const myClients = userDetails({
            Name,
            number,
            email,
            age: age,
            customer_Id,
            Date_Of_Billing,
            End_Date,
            Address,
            payment_Intent,
            InvoiceId,
            Emergency_Contact,
            Emergency_Email,
            Emergency_Address,
            reception,
            Service,
            enroll,
            Emergency_Name,
            Emergency_Relation,
            gender,
            Payment_Status,
            transaction_Id,
            adhaar,
            code,
            cost,
            payment_status: "waiting"
        })
        const newClient = myClients.save()
        const sendNotif = await novu.trigger('new-clients', {
            to: {
                subscriberId: `${email + "_" + customer_Id}`,
                email
            },
            payload: {}
        });
        res.status(200).json(CircularJSON.stringify({ newClient, sendNotif }))
    }
    catch (error) {
        res.status(500).json(CircularJSON.stringify({ error: error.message }))
    }
}


//case sensitive code , Took more than 2 days to get this functionality fully working using the automation dont touch.

export const pushToInactiveDatabase = async () => {
    try {
        const usersToBeDeleted = [];
        const count = await userDetails.countDocuments();
        
        for (let i = 0; i < count; i++) {
            const member = await userDetails.findOne().skip(i);
            const dateStr = member.End_Date;
            const [day, month, year] = dateStr.split('/');
            const formattedDateStr = `${year}-${month}-${day}`;
            const dateObj = new Date(formattedDateStr); //conversion of the date in string format in db to date format to make a comparision
            const reqObj = dateObj.getDate()
            
            const myDate = new Date()
            const reqDate = myDate.getDate()
            
            if ( reqObj < reqDate || ((reqObj === 31) && (reqDate === 1) || (reqObj === 30) && (reqDate ===1) || (reqObj === 29) && (reqDate === 1) )) { // Check if End_Date has passed
                usersToBeDeleted.push(member); // Collect users whose End_Date has passed
            }
        }

        for (let i = 0; i < usersToBeDeleted.length; i++) {
            const user = usersToBeDeleted[i];
            
            const myInactiveUser = new inactive({...user._doc});
            await myInactiveUser.save(); // Save user to inactive database
            await userDetails.deleteOne({ _id: user._id }); // Delete user from userDetails
        }
        
        return usersToBeDeleted; // Return the array of users whose End_Date has passed
    
    } catch (error) {
        console.log({ error: error.message });
        return []; // Return an empty array in case of an error
    }
};




