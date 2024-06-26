import express, { json } from "express";
import mongoose from "mongoose";
import CircularJSON from "circular-json";
import dotenv from "dotenv";
import fetch from "node-fetch";  // Ensure fetch is available (install node-fetch if necessary)

dotenv.config()

// MongoDB connection URL
const url = 'mongodb+srv://rihinatechorzo:Ritank%401998@cluster1.281wep1.mongodb.net/?retryWrites=true&w=majority&appName=cluster1';
const dbName = 'mydb';

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Define the token schema
const tokenSchema = new mongoose.Schema({
  token: String,
  expiresAt: Date
});

// Create the token model
const Token = mongoose.model('Token', tokenSchema);

// Middleware to parse request body
// Route to handle the self-registration link
export const generateLink = async (req, res) => {
  const { client } = req.body;
  try {
    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + 600); // Expires in 600 seconds (10 minutes)

    // Save the token and expiration timestamp in the database
    const newToken = new Token({ token, expiresAt });
    await newToken.save();

    const expirableLink = `http://localhost:3000/selfregistration?token=${token}`;

    // Send the expirable link as the response
    res.status(200).json({ expirableLink });

    // Send email with expirable link
    const payload = JSON.stringify({ expLink: expirableLink, client });
    const emailResponse = await fetch('https://backend-crm-eight.vercel.app/crm/sendmail', {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let responseBody;
    try {
      responseBody = await emailResponse.json();
    } catch (e) {
      responseBody = { error: 'Failed to parse email service response' };
    }

    console.log('Email service response:', responseBody);

    // Delete token from the database after expiration
    setTimeout(async () => {
      await Token.deleteOne({ token });
    }, 600000); // 10 minutes in milliseconds

  } catch (error) {
    console.error('Error generating link:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

// Route to check the validity of the token
export const regLink = async (req, res) => {
  const { token } = req.body;
  try {
    // Find the token in the database
    const result = await Token.findOne({ token });

    if (result && result.expiresAt > new Date()) {
      // Token is valid and not expired
      res.status(200).send('Self-registration page');
    } else {
      // Token is expired or not found
      res.status(404).json({ error: 'Your link has expired or is invalid' });
    }
  } catch (error) {
    console.error('Error checking token validity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Generate a unique token
function generateToken() {
  return Math.random().toString(36).substring(2);
}
