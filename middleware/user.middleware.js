const joi =require('joi');

const setUserCookie=(req, res, next) => {
    const userId = req.body
    if(userId){
        res.cookie("userSession", userId, {
         httpOnly: true,
         maxAge: 60*60*1000,  //1 hour
    });
}
   next();
}

const validateUserCreation=(req,res,next)=>{
    const userSchema=joi.object({
        firstName:joi.string().min(3).max(20).required(),
        lastName:joi.string().min(3).max(20).required(),
        gender:joi.string().valid('male', 'female').required(),
    });
    const {error}=userSchema.validate(req.body);
    try{
    if(!error){
        return next();
    }else{
        return res.status(400).json({status:400,success:false,message:error.details[0].message});
    }
    }catch(error){
        console.error('Error in validateUserCreation middleware:',error);
        return res.status(500).json({status:500,success:false,message:'Internal Server Error'});
    }
} 

module.exports={
    validateUserCreation,
    setUserCookie
}