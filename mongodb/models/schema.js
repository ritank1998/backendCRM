import mongoose from "mongoose"


const db1 = mongoose.createConnection("mongodb+srv://rihinatechorzo:Ritank%401998@cluster1.281wep1.mongodb.net/?retryWrites=true&w=majority&appName=cluster1")
const db2 = mongoose.createConnection("mongodb+srv://rihinatechorzo:Ritank%401998@cluster1.281wep1.mongodb.net/?retryWrites=true&w=majority&appName=cluster1")
const db3 = mongoose.createConnection("mongodb+srv://rihinatechorzo:Ritank%401998@cluster1.281wep1.mongodb.net/?retryWrites=true&w=majority&appName=cluster1")
const db4 = mongoose.createConnection("mongodb+srv://rihinatechorzo:Ritank%401998@cluster1.281wep1.mongodb.net/?retryWrites=true&w=majority&appName=cluster1")
const db5 = mongoose.createConnection("mongodb+srv://rihinatechorzo:Ritank%401998@cluster1.281wep1.mongodb.net/?retryWrites=true&w=majority&appName=cluster1")
const db6 = mongoose.createConnection("mongodb+srv://rihinatechorzo:Ritank%401998@cluster1.281wep1.mongodb.net/?retryWrites=true&w=majority&appName=cluster1")

export const walkInVisitors = db1.model("walkInVisitors", mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        requires: true
    },
    email: {
        type: String,
        required: true
    },
    reception: {
        type: String,
      
    },
    Date: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    Next_Date_Of_Contact: {
     
    },
    Enquiry_Type: {
        type: String,
        
    },
    Status : {
        type: String
    }
}))

export const userDetails = db2.model("newClients", mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        require: true
    },
    customer_Id: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    Address: {
        type: String,
        require: true
    },
    Date_Of_Billing: {
        type: String,
        require: true
    },
    End_Date: {
        type: String,
        require: true
    },
    payment_Intent: {
        type: String,
    },
    InvoiceId: {
        type: String,
    },
    Service: {
        type: String,
        require: true
    },
    Emergency_Name: {
        type: String,
        require: true
    },
    Emergency_Contact: {
        type: Number
    },
    Emergency_Email: {
        type: String
    },
    Emergency_Address: {
        type: String
    },
    Emergency_Relation: {
        type: String,
        require: true
    },
    reception: {
        type: String,
        require: true
    },
    enrolled: {
        type: String,
        require: true
    },
    Payment_Status: {
        type: String
    },
    transaction_Id: {
        type: String
    },
    adhaar: {
        type: Number,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    cost: {
        type: Number
    },
    payment_status: {
        type: String
    },
    weight: {
        type: Number
    },
    target_weigth: {
        type: Number
    },
    trainer: {
        type: String
    },
    bmi: {
        type: Number
    },
    weekly_routine: {
        type: [
            {
                day: String,    // Day of the week (Monday, Tuesday, etc.)
                routine: String // Routine for the day
            }
        ],
        required: true,
        maxlength: 7 // Maximum length of the array
    },
    done: {
        type: String
    },
    trainer_code: {
        type: Number
    },
    date: {
        type: String
    }
}))


export const newBusiness = db3.model("newBusiness", mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
    Business_Type: {
        type: String,
    }
}))


export const inactive = db4.model("InactiveClients", mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        require: true
    },
    customer_Id: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    Address: {
        type: String,
        require: true
    },
    Date_Of_Billing: {
        type: String,
        require: true
    },
    End_Date: {
        type: String,
        require: true
    },
    payment_Intent: {
        type: String,
    },
    InvoiceId: {
        type: String,
    },
    Service: {
        type: String,
        require: true
    },
    Emergency_Name: {
        type: String,
        require: true
    },
    Emergency_Contact: {
        type: Number
    },
    Emergency_Email: {
        type: String
    },
    Emergency_Address: {
        type: String
    },
    Emergency_Relation: {
        type: String,
        require: true
    },
    reception: {
        type: String,
        require: true
    },
    enrolled: {
        type: String,
        require: true
    },
    Payment_Status: {
        type: String
    },
    transaction_Id: {
        type: String
    },
    adhaar: {
        type: Number,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    cost: {
        type: Number,
    }}))

export const trainerCode = db5.model('Trainer' , mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    code: {
        type: String,
    }
}))

export const tickets = db6.model('ticket' , mongoose.Schema({
    Title:{
        type: String
    },
    Description: {
        type: String
    },
    Date: {
        type: Date
    }
}))