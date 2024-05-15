import mongoose from "mongoose"
mongoose.connect("mongodb+srv://rihinatechorzo:Ritank%401998@cluster1.281wep1.mongodb.net/?retryWrites=true&w=majority&appName=cluster1")
    .then(() => {
        console.log('MongoDB Connnected...')
    }).catch((err) => {
        console.log('Error while Mongo Conn..', err);
    })
// mongoose.connect("mongodb+srv://rihinatechorzo:Ritank%401998@cluster1.281wep1.mongodb.net/?retryWrites=true&w=majority&appName=cluster1",{
//     useNewUrlParser : true,
//     useUnifiedTopology : true
// }).then(()=>{
//     console.log("Connection Established")
// }).catch((e)=>console.log("Connection Not Established...."))