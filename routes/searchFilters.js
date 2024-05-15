import { userDetails, inactive, walkInVisitors } from "../mongodb/models/schema.js";
import CircularJSON from "circular-json";


//Database Counts
let activeCount;
export const countDatabase = async (req, res) => {
    try {
        const count = await userDetails.countDocuments();
        activeCount = count
        res.status(200).json({ "count": count, "activecount": activeCount });
    } catch (err) {
        // Handle errors
        res.status(500).json({ error: err.message });
    }
};

let inactiveCount;
export const countDatabaseInactive = async (req, res) => {
    try {
        const count = await inactive.countDocuments();
        inactiveCount = count
        res.status(200).json({ "count": count, "activecount": inactiveCount });
    }
    catch (err) {
        res.status(500).json(CircularJSON.stringify({ err: err.message }))
    }
}


//Databse Search features Active database

//search on the basis of gender active Clients 
export const selectGenderActiveClient = async (req, res) => {
    const { gender } = req.body
    try {
        if (gender === 'Male') {
            const users = await userDetails.find({ gender: 'Male' })
            res.status(200).json(users)
        } else {
            const users = await userDetails.find({ gender: 'Female' })
            res.status(200).json(users)
        }

    }
    catch (bhnagbhosdi) {
        res.status(500).json(CircularJSON.stringify({ bhnagbhosdi: bhnagbhosdi.message }))
    }
}

//search filter on the basis of date of birth active database

export const selectDateofBirthForActiveClients = async (req, res) => {
    const { age } = req.body
    try {
        const users = await userDetails.find({ age: age })
        res.status(200).json(users)
    }
    catch (sreevatsan) {
        res.status(500).json(CircularJSON.stringify({ sreevatsan: sreevatsan.message }))
    }
}


//search on the basis of the reception incharge
export const receptionionistFilterforActiveClients = async (req, res) => {
    const { name } = req.body
    try {
        const users = await userDetails.find({ reception: name })
        res.status(200).json(users)

    }
    catch (badak) {
        res.status(500).json(CircularJSON.stringify({ badak: bakad.message }))
    }
}

//api to call the active clients in the database 
export const activeCleints = async (req, res) => {
    try {
        const clients = await userDetails.find({})
        res.status(200).json(clients)
    }
    catch (err) {
        res.status(400).json(CircularJSON.stringify({ err: err.message }))
    }
}

//api to get the total earning from the active cleint database 
export const getFullEarning = async (req, res) => {
    try {
        const totalCost = await userDetails.aggregate([
            {
                $group: {
                    _id: null,
                    totalCost: { $sum: "$cost" }
                }
            }
        ]);
        res.status(200).json({ totalCost: totalCost[0]?.totalCost || 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//api to get the total number of Female in the Active Database
export const femaleCountActiveDatabase = async (req, res) => {
    try {
        const totalFemale = await userDetails.aggregate([
            {
                $match: { gender: "Female" }
            },
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: 1 } // Count the number of matching documents
                }
            }
        ]);

        res.status(200).json({ totalFemale: totalFemale[0]?.totalCount || 0 });
    }
    catch (err) {
        res.status(500).json(CircularJSON.stringify({ err: err.message }))
    }
}

//api to get the total number of male count on the Active database

export const maleCountActiveDatabase = async (req, res) => {
    try {
        const totalMale = await userDetails.aggregate([
            {
                $match: { gender: "male" }
            },
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: 1 } // Count the number of matching documents
                }
            }
        ]);

        res.status(200).json({ totalMale: totalMale[0]?.totalCount || 0 });
    }
    catch (err) {
        res.status(500).json(CircularJSON.stringify({ err: err.message }))
    }
}

//api function to get the customer for plan A active Database (Plan names to be replaced with the actual plan names)

export const customerForPlanA = async (req, res) => {
    try {
        const totalPlanA = await userDetails.aggregate([
            {
                $match: { Service: "A" }
            },
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: 1 } // Count the number of matching documents
                }
            }
        ]);

        res.status(200).json({ totalPlanA: totalPlanA[0]?.totalCount || 0 });
    }
    catch (err) {
        res.status(500).json(CircularJSON.stringify({ err: err.message }))
    }
}

// plan b people in active db

export const customerForPlanB = async (req, res) => {
    try {
        const totalPlanB = await userDetails.aggregate([
            {
                $match: { Service: "B" }
            },
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: 1 } // Count the number of matching documents
                }
            }
        ]);

        res.status(200).json({ totalPlanB: totalPlanB[0]?.totalCount || 0 });
    }
    catch (err) {
        res.status(500).json(CircularJSON.stringify({ err: err.message }))
    }
}

//total plan c people in active db

export const customerForPlanC = async (req, res) => {
    try {
        const totalPlanC = await userDetails.aggregate([
            {
                $match: { Service: "C" }
            },
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: 1 } // Count the number of matching documents
                }
            }
        ]);

        res.status(200).json({ totalPlanC: totalPlanC[0]?.totalCount || 0 });
    }
    catch (err) {
        res.status(500).json(CircularJSON.stringify({ err: err.message }))
    }
}

//search users on the basis of the name 
export const searchUserOnName = async(req,res)=>{
    const {name} = req.body
    try{
        const user = await userDetails.findOne({Name: name})
        res.status(200).json(user)

    }
    catch(bhangbhosdi){
        res.status(500).json(CircularJSON.stringify({bhangbhosdi: bhangbhosdi.message}))
    }
}

//search user on the basis of email
export const searchUserOnEmail = async(req,res)=>{
    const {email} = req.body
    try{
        const user = await userDetails.findOne({email: email})
        res.status(200).json(user)

    }
    catch(bhangbhosdi){
        res.status(500).json(CircularJSON.stringify({bhangbhosdi: bhangbhosdi.message}))
    }
}

//api function to delete a User from the database the Database

export const deleteClient = async(req,res)=>{
    const {name}  = req.body
    try{
      const deletedUser = await userDetails.deleteOne({Name: name})
      res.status(200).json(CircularJSON.stringify({deletedUser}))
    }
    catch(err){
        res.status(500).json(CircularJSON.stringify({err: err.message}))
    }
}


//Inactive databsse queries

//search feature on the basis of gender inactive clients

export const selectGenderInactiveClient = async (req, res) => {
    const { gender } = req.body
    try {
        if (gender === 'Male') {
            const users = await inactive.find({ gender: 'Male' })
            res.status(200).json(users)
        } else {
            const users = await inactive.find({ gender: 'Female' })
            res.status(200).json(users)
        }

    }
    catch (bhnagbhosdi) {
        res.status(500).json(CircularJSON.stringify({ bhnagbhosdi: bhnagbhosdi.message }))
    }
}


//search filter on the basis of age for inactive clients
export const selectDateofBirthForInactiveClients = async (req, res) => {
    const { age } = req.body;
    try {
        // Assuming 'inactive' is the collection name in MongoDB
        const users = await inactive.find({ age: age });
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found with the provided age." });
        }
        console.log(users);
        res.status(200).json({ users: users });
    } catch (error) {
        console.error("Error selecting users:", error);
        res.status(500).json({ error: error.message });
    }
};


//search on the basis of the reception incharge for inactive clients
export const receptionFilterforInactiveClient = async (req, res) => {
    const { name } = req.body
    try {
        const users = await inactive.find({ reception: name })
        res.status(200).json(users)
    }
    catch (didi) {
        res.status(500).json(CircularJSON.stringify({ didi: didi.message }))
    }
}

//api to all the inactive clients 
export const inactiveClients = async (req, res) => {
    try {
        const clients = await inactive.find({})
        console.log(clients)
        res.status(200).json(clients)
    }
    catch (err) {
        res.status(500).json(CircularJSON.stringify("No Inactive Clients in the portal"))
    }
}


//api to get the total number of visitors 
export const myVisitors = async (req, res) => {
    try {
        const visitors = await walkInVisitors.find({})
        res.status(200).json(visitors)

    }
    catch (err) {
        res.status(500).json(CircularJSON.stringify({ err: err.message }))
    }
}


//api to get the total earning from the inactive client database

export const getFullInactiveEarning = async (req, res) => {
    try {
        const totalCost = await inactive.aggregate([
            {
                $group: {
                    _id: null,
                    totalCost: { $sum: "$cost" }
                }
            }
        ]);
        res.status(200).json({ totalCost: totalCost[0]?.totalCost || 0 });
    }
    catch (err) {
        res.status(500).json(CircularJSON.stringify({ err: err.message }))
    }
}

//api to get the total number of Female in the inactive database 

export const getFemaleCountInInactiveDatabase = async (req, res) => {
    try {
        const totalFemale = await inactive.aggregate([
            {
                $match: { gender: "Female" }
            },
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: 1 } // Count the number of matching documents
                }
            }
        ]);

        res.status(200).json({ totalFemale: totalFemale[0]?.totalCount || 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//api to get the total number of Male in the Database in inactive database

export const getMaleCountInactiveDatabase = async (Req, res) => {
    try {
        const totalMale = await inactive.aggregate([
            {
                $match: { gender: "Male" }
            },
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: 1 } // Count the number of matching documents
                }
            }
        ]);

        res.status(200).json({ totalMale: totalMale[0]?.totalCount || 0 });
    }
    catch (err) {
        res.status(500).json(CircularJSON.stringify({ err: err.message }))
    }
}


//plan people in inactive db
export const customerForPlanAInactive = async (req, res) => {
    try {
        const totalPlanA = await inactive.aggregate([
            {
                $match: { Service: "A" }
            },
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: 1 } // Count the number of matching documents
                }
            }
        ]);

        res.status(200).json({ totalPlanA: totalPlanA[0]?.totalCount || 0 });
    }
    catch (err) {
        res.status(500).json(CircularJSON.stringify({ err: err.message }))
    }
}


//total plan b people in inactive db
export const customerForPlanBInactive = async (req, res) => {
    try {
        const totalPlanB = await inactive.aggregate([
            {
                $match: { Service: "A" }
            },
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: 1 } // Count the number of matching documents
                }
            }
        ]);

        res.status(200).json({ totalPlanB: totalPlanB[0]?.totalCount || 0 });
    }
    catch (err) {
        res.status(500).json(CircularJSON.stringify({ err: err.message }))
    }
}


//total plan c people in inactive db
export const customerForPlanCInactive = async (req, res) => {
    try {
        const totalPlanC = await inactive.aggregate([
            {
                $match: { Service: "C" }
            },
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: 1 } // Count the number of matching documents
                }
            }
        ]);

        res.status(200).json({ totalPlanc: totalPlanC[0]?.totalCount || 0 });
    }
    catch (err) {
        res.status(500).json(CircularJSON.stringify({ err: err.message }))
    }
}


//Visitors Quries
export const deleteVisitorWhenExpire = async (req, res) => {
    try {
        const endDateArray = await walkInVisitors.find({});
        let deletedUsers = [];

        const currentDate = new Date(); // Get today's date with time

        for (let i = 0; i < endDateArray.length; i++) {
            const endDateStr = endDateArray[i].Next_Date_Of_Contact;
            const [day, month, year] = endDateStr.split(/\/|-/); // Split the date string by '/' or '-'
            const formattedDateStr = `${year}-${month}-${day}`;
            const endDateObj = new Date(formattedDateStr);

            if (endDateObj < currentDate) {
                const deletedUser = await walkInVisitors.deleteOne({ Next_Date_Of_Contact: endDateStr });
                deletedUsers.push(deletedUser); // Push deleted user to the array
            }
        }

        return deletedUsers
    } catch (err) {
        return err.message
    }
};
//find visitor on the basis of Name
export const visitorWithName = async(req,res)=>{
    const {name} = req.body
    try{
       const visitor = await walkInVisitors.findOne({Name: name})
       res.status(200).json(visitor)
    }
    catch(err){
        res.status(500).json(CircularJSON.stringify({err: err.message}))
    }
}

//find visitor on the basis of Email

export const visitorWithEmail = async(req,res)=>{
    const {Email}= req.body
    try{
         const visitor = await walkInVisitors.findOne({email: Email})
         res.status(200).json(visitor)
    }
    catch(err){
        res.status(500).json(CircularJSON.stringify({err: err.message}))
    }
}

//count the total number of visitor

export const visitorCount = async(req,res)=>{
    try{
           const visitorCount = await userDetails.countDocuments()
           res.status(200).json(visitorCount)
    }
    catch(err){
        res.status(500).json(CircularJSON.stringify({err: err.message}))
    }
}

//inactive client search using email

export const getInactiveClientByEmail = async(req,res)=>{
    const {email} = req.body
    try{
        const user = await inactive.findOne({email : email})
        res.status(200).json(user)

    }
    catch(laudekabaal){
        res.status(500).json(CircularJSON.stringify({laudekabaal : laudekabaal.message}))
    }
}