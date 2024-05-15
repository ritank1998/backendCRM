import CircularJSON from "circular-json"
import { userDetails , inactive } from "../mongodb/models/schema.js"
import dotenv from "dotenv"

dotenv.config()

export const getDataForMonth = async()=>{
    try{
      const length = await userDetails.countDocuments()
     return length
    }
    catch(err){
        return err.message
    }
}


//Endpoints for the Active Client DB
export const janReportActive = async () => {
    let janFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await userDetails.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 0) {
                // Add the cost of the user to janFinance
                janFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        //res.status(200).json({ janFinance });
        return janFinance

    } catch (err) {
        return err.message
        //res.status(500).json({ error: err.message });
    }
};

export const febReportActive = async () => {
    let febFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await userDetails.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 1) {
                // Add the cost of the user to janFinance
                febFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
      //  res.status(200).json({ febFinance });
      return febFinance
    } catch (err) {
        return err.message
        //res.status(500).json({ error: err.message });
    }
};

export const marchReportActive = async () => {
    let marchFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await userDetails.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 2) {
                // Add the cost of the user to janFinance
                marchFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
       // res.status(200).json({ marchFinance });
       return marchFinance
    } catch (err) {
        return err.message
        //res.status(500).json({ error: err.message });
    }
};

export const aprilReportActive = async () => {
    let aprilFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await userDetails.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 3) {
                // Add the cost of the user to janFinance
                aprilFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        //res.status(200).json({ aprilFinance });
        return aprilFinance
    } catch (err) {
        return err.message
       // res.status(500).json({ error: err.message });
    }
};

export const mayReportActive = async () => {
    let mayFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await userDetails.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 4) {
                // Add the cost of the user to janFinance
                mayFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
       // res.status(200).json({ mayFinance });
       return mayFinance
    } catch (err) {
        return err.message
      //  res.status(500).json({ error: err.message });
    }
};

export const juneReportActive = async () => {
    let juneFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await userDetails.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 5) {
                // Add the cost of the user to janFinance
                juneFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
       // res.status(200).json({ juneFinance });
       return juneFinance
    } catch (err) {
        return err.message
        //res.status(500).json({ error: err.message });
    }
};

export const julyReportActive = async () => {
    let julyFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await userDetails.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 6) {
                // Add the cost of the user to janFinance
                julyFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
      //  res.status(200).json({ julyFinance });
      return julyFinance
    } catch (err) {
        return err.message
       // res.status(500).json({ error: err.message });
    }
};

export const augustReportActive = async () => {
    let augustFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await userDetails.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 7) {
                // Add the cost of the user to janFinance
                augustFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
      //  res.status(200).json({ augustFinance });
      return augustFinance
    } catch (err) {
        return err.message
      //  res.status(500).json({ error: err.message });
    }
};

export const septReportActive = async () => {
    let septFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await userDetails.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 8) {
                // Add the cost of the user to janFinance
                septFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        return septFinance
       // res.status(200).json({ septFinance });
    } catch (err) {
        //res.status(500).json({ error: err.message });
        return err.message
    }
};

export const octReportActive = async () => {
    let octFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await userDetails.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 9) {
                // Add the cost of the user to janFinance
                octFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        //res.status(200).json({ octFinance });
        return octFinance
    } catch (err) {
        return err.message
       // res.status(500).json({ error: err.message });
    }
};

export const novemberReportActive = async () => {
    let novemberFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await userDetails.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 10) {
                // Add the cost of the user to janFinance
                novemberFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
      //  res.status(200).json({ novemberFinance });
      return novemberFinance
    } catch (err) {
        return err.message
      //  res.status(500).json({ error: err.message });
    }
};

export const decemberReportActive = async () => {
    let decemberFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await userDetails.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 11) {
                // Add the cost of the user to janFinance
                decemberFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
      //  res.status(200).json({ decemberFinance });
      return decemberFinance
    } catch (err) {
        return err.message
       // res.status(500).json({ error: err.message });
    }
};

//Endpoints For the Inactive client DB 
export const janReportInactive = async (req, res) => {
    let janFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await inactive.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 0) {
                // Add the cost of the user to janFinance
                janFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        res.status(200).json({ janFinance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const febReportInactive = async (req, res) => {
    let febFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await inactive.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 1) {
                // Add the cost of the user to janFinance
                febFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        res.status(200).json({ febFinance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const marchReportInactive = async (req, res) => {
    let marchFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await inactive.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 2) {
                // Add the cost of the user to janFinance
                marchFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        res.status(200).json({ marchFinance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const aprilReportInactive = async (req, res) => {
    let aprilFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await inactive.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 3) {
                // Add the cost of the user to janFinance
                aprilFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        res.status(200).json({ aprilFinance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const mayReportInactive = async (req, res) => {
    let mayFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await inactive.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 4) {
                // Add the cost of the user to janFinance
                mayFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        res.status(200).json({ mayFinance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const juneReportInactive = async (req, res) => {
    let juneFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await inactive.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 5) {
                // Add the cost of the user to janFinance
                juneFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        res.status(200).json({ juneFinance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const julyReportInactive = async (req, res) => {
    let julyFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await inactive.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 6) {
                // Add the cost of the user to janFinance
                julyFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        res.status(200).json({ julyFinance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const augustReportInactive = async (req, res) => {
    let augustFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await inactive.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 7) {
                // Add the cost of the user to janFinance
                augustFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        res.status(200).json({ augustFinance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const septReportInactive = async (req, res) => {
    let septFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await inactive.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 8) {
                // Add the cost of the user to janFinance
                septFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        res.status(200).json({ septFinance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const octReportInactive = async (req, res) => {
    let octFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await inactive.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 9) {
                // Add the cost of the user to janFinance
                octFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        res.status(200).json({ octFinance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const novemberReportInactive = async (req, res) => {
    let novemberFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await inactive.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 10) {
                // Add the cost of the user to janFinance
                novemberFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        res.status(200).json({ novemberFinance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const decemberReportInactive = async (req, res) => {
    let decemberFinance = 0; // Variable to store total cost for January
    
    try {
        const users = await inactive.find({}); // Retrieve all documents from the inactive collection
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const reqDate = user.Date_Of_Billing;
            const myDate = new Date(reqDate);
            
            // Check if the month is January (JavaScript months are zero-indexed)
            if (myDate.getMonth() === 11) {
                // Add the cost of the user to janFinance
                decemberFinance += user.cost || 0; // If user.cost is null, default to 0
            }
        }
        
        // Send the total cost for January in the response
        res.status(200).json({ decemberFinance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Male to female ratio in active database


//male count
export const countMale = async(req,res)=>{
    try{
           let count = 0
           const user = await inactive.find({})
           for(let i=0;i<user.length;i++){
            const myUser = user[i]
            if(myUser.gender === 'Male'){
                count += 1
            }
           }
           return count
    }
    catch(err){
        return err.message
      //  res.status(500).json(CircularJSON.stringify({err: err.message}))
    }
}

//female count
export const countFemale = async(req,res)=>{
    try{
        let count = 0
        const user = await inactive.find({})
        for(let i=0;i<user.length;i++){
         const myUser = user[i]
         if(myUser.gender === 'Female'){
             count += 1
         }
        }
      //  console.log(count)
      //  res.status(200).json(CircularJSON.stringify({count}))
      return count
    }
    catch(err){
        return err.message
       // res.status(500).json(CircularJSON.stringify({err: err.message}))
    }
}

