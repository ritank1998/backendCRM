import CircularJSON from "circular-json";
import nodemailer from "nodemailer"
import { tickets } from "../mongodb/models/schema.js";
import { userDetails } from "../mongodb/models/schema.js";
import dotenv from "dotenv"

dotenv.config()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});



export const createPaymentTokenMannual = async (req, res) => {
    const {cost , number , Name , email , Service} = req.body
    
    try {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET
        })
      };
      
  
      const response = await fetch('https://test.instamojo.com/oauth2/token/', options);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const responseData = await response.json();
      const token = responseData.access_token;
      
  
  
      const optionsForPaymentsLink = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token} `,
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          allow_repeated_payments: false,
          send_email: true,
          amount: cost,
          purpose: Service,
          buyer_name: Name,
          email: email,
          phone: number,
          redirect_url: `http://${process.env.FRONTEND_DOMAIN}/mannualclientpayment?email=${encodeURIComponent(email)}`
        })
      }
      
      const requireResponse = await fetch('https://test.instamojo.com/v2/payment_requests/', optionsForPaymentsLink)
      const reqData = await requireResponse.json();
      const url = reqData.longurl
      const paymentId = reqData.id
    let mailOptions = {
        from: 'saxena.ritank@gmail.com',
        to: email,
        subject: "Payment Remainder",
        text:`Please Complete your payment here ${url}`
    };
    const emailResponse = await transporter.sendMail(mailOptions);
      res.status(200).json({ reqData , emailResponse }); // Sending response as JSON
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message }); // Sending error response
    }
  };


  export const fetchMnualClientDetails = async (req, res) => {
    const { mail } = req.body;
    try {
        const getDetails = await userDetails.findOne({ email: mail });
        res.status(200).json(CircularJSON.stringify(getDetails));
    } catch (err) {
        res.status(500).json(CircularJSON.stringify({ err: err.message }));
    }
};

export const updateMannualClientPaymentStatus = async (req, res) => {
    const { mail } = req.body;
    try {
        console.log(mail)
        // Update payment status using updateOne method
        const clientUpdate = await userDetails.updateOne(
            { email: mail },
            {
                $set: {
                    payment_status: "Paid"
                }
            }
        );
      
        // Check if the update was successful
        console.log(clientUpdate)
        if (clientUpdate.nModified > 0) {
            res.status(200).json(CircularJSON.stringify({ clientUpdate }));
        } else {
            res.status(404).json(CircularJSON.stringify({ error: error.message}));
        }
    } catch (err) {
        // Handle errors
        res.status(500).json(CircularJSON.stringify({ error: err.message }));
    }
};

  export const getPaymentDetails = async (req, res) => {
    try {
      const options = {
        method: 'GET',
        headers: {accept: 'application/json', Authorization: 'Bearer y0iXlNBj9bNhrpbP2UEq2JWvZ4qAzC8CFHOBv8-Eiqc.Hvx49cScxBKGL_3Q0sSWYiIb3I-Qc4vu_rPQ4rJ0HjU'}
      };
      const reponse = await fetch('https://test.instamojo.com/v2/payments/MOJO4327N05A58753474/', options)
      const data = await reponse.json()
      res.status(200).json(CircularJSON.stringify({data}));
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  };

export const sendPaymentLink = async(req,res)=>{
    const {email , amount} = req.body
    try{
        const myTickets = new tickets({
            Title: "Payment Ticket",
            Description: `Payment of INR ${amount} from ${email} Recieved`,
            Date: new Date
        })
        const newTicket = myTickets.save()
        let mailOptions = {
            from: 'saxena.ritank@gmail.com',
            to: email,
            subject: "Payment Remainder",
            text:`Please Check the ticket with title ${Title}`
        };
        const response = await transporter.sendMail(mailOptions);
    }
    catch(err){
        res.status(500).json(CircularJSON.stringify({err: err.message}))
    }
}