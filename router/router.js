import express from "express"
import { users , clients , signup ,businessDetails, mannualClients } from "../routes/userCreation.js"
import { sendEmail , addPoints } from "../routes/features.js"
import { regLink , generateLink } from "../routes/expirableLinkGeneration.js"
import { createInvoice } from "../routes/invoice.js"
import { createPaymentToken , getPaymentDetails, trailSessionPaymentManagement, updateTrailPaymentStatus  } from "../routes/payments.js"
import { inactiveClients , activeCleints , myVisitors , getFullEarning , getFullInactiveEarning , getFemaleCountInInactiveDatabase , getMaleCountInactiveDatabase , maleCountActiveDatabase, femaleCountActiveDatabase , customerForPlanA , customerForPlanAInactive , customerForPlanB , customerForPlanBInactive , customerForPlanC , customerForPlanCInactive  , deleteClient , visitorCount , getInactiveClientByEmail} from "../routes/searchFilters.js"
import { selectGenderActiveClient , selectGenderInactiveClient , countDatabase , selectDateofBirthForActiveClients , selectDateofBirthForInactiveClients , receptionionistFilterforActiveClients , receptionFilterforInactiveClient , countDatabaseInactive , searchUserOnName , searchUserOnEmail , visitorWithName , visitorWithEmail} from "../routes/searchFilters.js"
import { regularUpdateFeature , updateTheMemberInfo , getTheUpdatingDetails } from "../routes/userRegularUpdateFeature.js"
import { getAllVisitorDate } from "../routes/sendemailfornotification.js"
import {  trainerDetails , assignTrainerCode } from "../routes/randomcodegeneration.js"
import { ticketCreation , deleteTicket , getTicket} from "../routes/TicketCreation.js"
import {createPaymentTokenMannual , fetchMnualClientDetails , updateMannualClientPaymentStatus} from "../routes/mannualPaymentGeneration.js"
//import { makeCall } from "../routes/twilioCallingFeature.js"
import { transferCredit } from "../routes/creditTransfer.js"
import { updateDetails } from "../routes/updateDetails.js"
import { visitorDeleteOperation } from "../routes/allDeleteOperations.js"
import { scheduleAppointment } from "../routes/scheduleAppointment.js"
import { aprilReportActive, aprilReportInactive, augustReportActive, augustReportInactive, countMale, decemberReportActive, decemberReportInactive, febReportActive, febReportInactive, countFemale, getDataForMonth, janReportActive, janReportInactive, julyReportActive, julyReportInactive, juneReportActive, juneReportInactive, marchReportActive, marchReportInactive, mayReportActive, mayReportInactive, novemberReportActive, novemberReportInactive, octReportActive, octReportInactive, septReportActive, septReportInactive } from "../routes/dashboardConnectionApi.js"



const router = express.Router()



//<-----------------------------END POINTS FOR BUSINESS TO REGISTER TO US(Client Metrix)--------------------------------------------------------->

router.post("/businesssignup" , signup ) //registers a new business to us(Client Metrix)
router.post("/businesslogin" , businessDetails) //to login to client Metrix by a business


//<-------------------------//Application features Endpoints------------------------------------->
router.post("/visitor" , users) //this registers the store visitors
router.post("/newclients" , clients) //registers the users for the Business
router.post("/sendmail" , sendEmail)//to activate the node mailer.
router.post("/explink" , regLink)// expirable links for self registration
router.post("/link" , generateLink) //this tracks the token that is generated that when it is expiring
router.post("/invoice" , createInvoice)// invoice generation endpoint after the payment
router.get("/points" , addPoints) // points table for the reception for commission
// router.post("/token" , createToken)// token creation for expirable links
router.post("/manualclients" , mannualClients ) //end point to register the client manually with the awaiting payment status
router.post("/paymentremainder" , createPaymentTokenMannual)
router.get("/userdetails" , fetchMnualClientDetails)
router.put("/updatestatus" , updateMannualClientPaymentStatus)


//<----------------------------------Active clients Database Query Endpoints--------------------------------------->
router.get("/activeclientgender" , selectGenderActiveClient) //endpoint for gender filter for retrieveing the active clients from the Mongodb database
router.get("/dbcountactiveclient" , countDatabase)// total number of entries in the DB for active clients
router.get("/getagefilteractiveclient" , selectDateofBirthForActiveClients)// endpoint for the active clients search filter
router.get("/receptionfilteractive" , receptionionistFilterforActiveClients) //endpoint to search users on the basis of the receptionists
router.get("/clients" , activeCleints)//api endpoint to get all the active client entries
router.get("/earning", getFullEarning)// api endpoint to get the total earning from the active clients
router.get("/malecountactive" , maleCountActiveDatabase) // api endpoint to get the total number of male on the active database
router.get("/femalecoutactive" , femaleCountActiveDatabase) // api endpoint to get the total number of females on the activw database
router.get("/activeplana" , customerForPlanA) // api endpoint to get the total number of active customers for plan a
router.get("/activeplanb" , customerForPlanB) // api endpoint to get the total number of active plan b customer
router.get("/activeplanc" , customerForPlanC)// api to get the total number of active plan c customers
router.delete("/deleteUser" , deleteClient) //api endpoint to delete the client from the database using the UI Delete Button
router.get("/useonname" , searchUserOnName) //search filter on the basis of the name
router.get("/useronemail" , searchUserOnEmail) // search feature on the basis of email




//<----------------------------------Inactive Clients Database Qurery Endpoints---------------------------------------------------->
router.get("/inactiveclientgender" , selectGenderInactiveClient)//endpoint for gender filter for retrieving the inactive clients from Mongodb
router.get("/dbcountinactiveclient" , countDatabaseInactive)// totla number of entries in the inactive database
router.get("/getagefilterinactiveclient" , selectDateofBirthForInactiveClients)// endpoint for the inctive client search filter
router.get("/receptionfilterinactive" , receptionFilterforInactiveClient)
router.get('/inactiveclients' , inactiveClients) //api endpoint to get all the entries in the inactive database 
router.get("/inactiveearning" , getFullInactiveEarning) //api endpoint to get the total earning from the expired clients
router.get("/femaleinactive" , getFemaleCountInInactiveDatabase) //api endpoint to get the total number of females in the inactive database
router.get("/maleinactive" , getMaleCountInactiveDatabase) //api endpoint ot get the total number of male on the inactive database
router.get("/inactiveplana" , customerForPlanAInactive) // api end point to get the total number if inactive customer for plan a
router.get("/inactiveplanb" , customerForPlanBInactive) // api endpoint to get the total number of incative plan b customer
router.get("/inactiveplanc" , customerForPlanCInactive)//api tot get the total number of plan c inactive customers
router.put("/updatedetails" , updateDetails) //api end point to update the user details to called when the payment is updated in the update payment expirable link
router.get("/inactiveclientbyemail" , getInactiveClientByEmail) //to get the inactive client using the email address



//<-------------------------------------Visitors Database Query Enpoints-------------------------------------------------------------------->
router.get("/visitorwithname" , visitorWithName)// to get the visitors detials using the name from the visitors db
router.get("/visitorwithemail" ,visitorWithEmail )// to get the visitor details using the email from the visitors db
router.get("/countvisitor" , visitorCount) // to get the total number of visitors in the Database
router.get("/visit" , myVisitors)//api endpoint to get the visitors form the database

//<----------------------------------visitor delete operation--------------------------------------->
router.delete("/deletevisitor" , visitorDeleteOperation)

//<----------------------------------Main Android and IOS features (initial one for the initial stage) starts from here----------------------------------->
router.get("/getmemberdetails" , regularUpdateFeature)
router.put("/updatemember" , updateTheMemberInfo)
router.get("/userdetails" , getTheUpdatingDetails) //this api gets all the detials to show on the application from the DB





//<------------------------------Payments--------------------------------------->
router.post("/paymenttoken" , createPaymentToken)
router.get("/details" , getPaymentDetails)


//<---------------trainer docs --------------------------------------------->
router.post("/trainer" , trainerDetails)


//<----------------------tickets management--------------------------------->
router.post("/ticketcreation" , ticketCreation) //Creates the Tickets in the Ticket panel on communication
router.delete("/ticketdelete" , deleteTicket) //deletes the Ticket from the DB using the UI panel Button
router.get("/tickets" , getTicket) //loads the tickets in the UI Panel in the UI

//<--------------------calling API------------------------------------------->
//router.post("/call" , makeCall)

//<--------------------------------------credit Transfer------------------------------>
router.get("/credittransfer" , transferCredit)
//<-----------------------------------testing apis---------------------------------->
router.get("/nextcontactdate" ,getAllVisitorDate )
router.put("/assigncode" , assignTrainerCode)
//<-------------------------------------------dashboardApi--------------------------->//

// ***** Dashboard Api are return type functions , in testing these act as independent stand alone API but in Production these are the functions that returns the interger return type
router.get("/getmonthlybill" , getDataForMonth)
router.get("/jan" , janReportActive)
router.get("/feb" , febReportActive)
router.get("/march" , marchReportActive )
router.get("/april" , aprilReportActive)
router.get("/may" , mayReportActive)
router.get("/june" , juneReportActive)
router.get("/july" , julyReportActive)
router.get("/august" , augustReportActive)
router.get("/sept" , septReportActive)
router.get("/oct" , octReportActive)
router.get("/nov" , novemberReportActive)
router.get("/dec" , decemberReportActive)

router.get("/inactivejan" , janReportInactive)
router.get("/inactivefeb" , febReportInactive)
router.get("/inactivemarch" , marchReportInactive)
router.get("/inactiveapril" , aprilReportInactive)
router.get("/inactivemay" , mayReportInactive)
router.get("/inactivejune" , juneReportInactive)
router.get("/inactivejuly" , julyReportInactive)
router.get("/inactiveaugust" , augustReportInactive)
router.get("/inactivesept" , septReportInactive)
router.get("/inactiveoct" , octReportInactive)
router.get("/inactivenov" , novemberReportInactive)
router.get("/inactivedec" , decemberReportInactive)

router.get("/malecount" , countMale)
router.get("/femalecount" , countFemale)
//<-----------------------------------------------------Appointment scheduling--------------------------------->
router.post("/appointment" , scheduleAppointment)
router.post("/trailpayment" , trailSessionPaymentManagement)
router.get("/paydetails" , getPaymentDetails)
router.put("/updatetrailpaymentstatus" ,updateTrailPaymentStatus)
export default router



//features completed 
// 1) successful payment 
// 2) payment on both expirable link and mannual 
// 3) code generation for trainers 
// 3) client side mobile application regular update feature
// 4) automation for expiration 
// 5) automation for visitors
// 6) automation for email notification for plan expiration
// 7) Bill Invoice generation 
// 8) video and voice call feature
// 9) all search filters
// 10) mannual search 
// 11) Mobile application Pass code 
// 12) Communication Tickets 
// 13) 
// 11) Appointment scheduling 




//Incomplee Features
// 1) UI for ticket Management is remaining 
// 2) Points Table is remaining
// 3) Authentication and token Encryption
// 4) Successful Payments bug resolution remaining 
// 5) Membership Transfer plan feature reamining 
// 6) Delete Button enabling reamining 
// 7) Index Page UI
// 8) Payment Completed UI remaining 
// 9) Mobile UI client Ticket Generation 
// 10) Main Website 

// 12) Trail Session management
// 13) Data anlytics tool for trends in new onboarding
// 14) Auto Marketing feature
// 15) Client regular attendence marking and regularization (new release feature metrix 2.0)
// 16) Client Auto membership transfer feature using mobile app (new release feature metrix 2.0)
// 17) Visitor to client or delete 