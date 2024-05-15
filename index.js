import express from "express"
import cors from "cors"
import circularJson from "circular-json"
import "./mongodb/conn.js"
import "./mongodb/models/schema.js"
import "./routes/allAutomationhere.js" // this runs all the automation on the server
import crmNotif from "./router/router.js"
const port = 2102
const app = express()
app.use(cors())
app.use(express.json());



app.use("/crm" , crmNotif)




app.listen(port, ()=>{
    console.log("The App is working on the port " , port)
})