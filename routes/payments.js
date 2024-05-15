import  createApi  from 'api';
import CircularJSON from 'circular-json';
import nodemailer from "nodemailer"
import { walkInVisitors } from '../mongodb/models/schema.js';
import dotenv from "dotenv"
dotenv.config()

// For production the client will be asked to create a complete account of InstaMojo then we will change the APi from test environment to Production

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'saxena.ritank@gmail.com',
    pass: 'jxtyxdltbkihtcpc'
  }
});


export const createPaymentToken = async (req, res) => {
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
        client_id: 'test_2MRQRMYMoXXlWlO3WUfmBo7FrVUqHW4syRI',
        client_secret: 'test_RJ5w60rIFhpxc6LAmujaFC6S3FHF1atJ9EAqz5Tj7ue034QGXFoSfCTUB9T57xFcI6ZTw2bfUS3wcoBeoUj3FgXeSrK0c8n5yFpCNmgXsv6gTuPV0aOTsLnpeq7'
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
        redirect_url: 'http://localhost:3000/clientconformation'
      })
    }
    
    const requireResponse = await fetch('https://test.instamojo.com/v2/payment_requests/', optionsForPaymentsLink)
    const reqData = await requireResponse.json();
    const url = reqData.longurl
    const paymentId = reqData.id
    
    res.status(200).json({ response: reqData }); // Sending response as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message }); // Sending error response
  }
};


//Api to fetch the payment details
export const getPaymentDetails = async (req, res) => {
  const {paymentId} = req.body
  try {
    const options = {
      method: 'POST',
      headers: {
          accept: 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: 'test_2MRQRMYMoXXlWlO3WUfmBo7FrVUqHW4syRI',
          client_secret: 'test_RJ5w60rIFhpxc6LAmujaFC6S3FHF1atJ9EAqz5Tj7ue034QGXFoSfCTUB9T57xFcI6ZTw2bfUS3wcoBeoUj3FgXeSrK0c8n5yFpCNmgXsv6gTuPV0aOTsLnpeq7'
      })
  };

  const response = await fetch('https://test.instamojo.com/oauth2/token/', options);
  if (!response.ok) {
      throw new Error('Failed to fetch data');
  }

  const responseData = await response.json();
  const token = responseData.access_token;
    const optionsForVerification = {
      method: 'GET',
      headers: {accept: 'application/json', Authorization: `Bearer ${token}`}
    };
    const reponse = await fetch(`https://test.instamojo.com/v2/payments/${paymentId}/`, optionsForVerification)
    const data = await reponse.json()
    console.log(data)
    res.status(200).json(CircularJSON.stringify({data}));
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};


//create payments for trail management
const sendEmail = async (client, sub, body) => {
  try {
      let mailOptions = {
          from: 'saxena.ritank@gmail.com',
          to: client,
          subject: sub,
          text: body
      };
      const response = await transporter.sendMail(mailOptions);
      console.log('Email sent:', response);
      return mailOptions;
  } catch (error) {
      return error.message;
  }
};

export const trailSessionPaymentManagement = async (req, res) => {
  const { amt, email, number, Name, Service } = req.body;
  try {
      const options = {
          method: 'POST',
          headers: {
              accept: 'application/json',
              'content-type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
              grant_type: 'client_credentials',
              client_id: 'test_2MRQRMYMoXXlWlO3WUfmBo7FrVUqHW4syRI',
              client_secret: 'test_RJ5w60rIFhpxc6LAmujaFC6S3FHF1atJ9EAqz5Tj7ue034QGXFoSfCTUB9T57xFcI6ZTw2bfUS3wcoBeoUj3FgXeSrK0c8n5yFpCNmgXsv6gTuPV0aOTsLnpeq7'
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
              Authorization: `Bearer ${token}`,
              'content-type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
              allow_repeated_payments: false,
              send_email: true,
              amount: amt,
              purpose: Service,
              buyer_name: Name,
              email: email,
              phone: number,
              redirect_url: `http://localhost:3000/trailpayment/email=${email}`
          })
      }

      const requireResponse = await fetch('https://test.instamojo.com/v2/payment_requests/', optionsForPaymentsLink)
      const reqData = await requireResponse.json();
      const url = reqData.longurl
      const paymentId = reqData.id
      const sub = "Remained for Trail Session"
      // Sending email after successful payment request
      await sendEmail(email, sub, url);

      res.status(200).json({ response: reqData }); // Sending response as JSON
  } catch (err) {
      res.status(500).json({ err: err.message });
  }
}


//update trail payment management using the email id 
export const updateTrailPaymentStatus = async(req,res)=>{
  const {email} = req.body
try{
  const new_update = await userDetails.updateOne({ email: email },
    {
        $set: {
          Status: paid
        }
    });
    res.status(200).json(CircularJSON.stringify({new_update}))
}
catch(err){
  res.status(500).json(CircularJSON.stringify({err: err.message}))
}
}