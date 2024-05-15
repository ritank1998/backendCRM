import CircularJson from "circular-json"


export const enrollStaff = async(req,res)=>{
    const {name , base_salary , commission , arrears} = req.body
    try{
            
    }
    catch(err){
        res.status(500).json(CircularJson.stringify({err: err.message}))
    }
}