const userService=require('../service/user.service');

const CreateUser=async(req,res)=>{
    try{
    const payload=req.body;
    console.log(payload);
    const serviceResponse =await userService.CreateUser(payload.firstName,payload.lastName,payload.gender);

    if(!serviceResponse.success){
        return res.status(serviceResponse.status).json(serviceResponse);
    }
    return res.status(serviceResponse.status).json(serviceResponse) 
    }catch(error){
        console.error('Error in CreateUser controller:',error);
        return res.status(500).json({status:500,success:false,message:'Internal Server Error'});
    }
}   
const LoginUser=async(req,res)=>{
    try{
        const payload=req.body;

        const serviceResponse=await userService.LoginUser(payload.firstName,payload.lastName);
        if(!serviceResponse.success){
            return res.status(serviceResponse.status).json(serviceResponse);
        }
        return res.status(serviceResponse.status).json(serviceResponse);
    }catch(error){
        console.error("Error in LoginUser controller:",error);
        return res.status(500).json({status:500,success:false,message:'Internal Server Error'});
    }
}
module.exports={
    CreateUser,
    LoginUser
}