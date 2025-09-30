const joi=require('joi')

const validateItemCreation=(req,res,next)=>{
    const itemSchema=joi.object({
        name:joi.string().min(3).max(30).required(),
        size:joi.string().valid('Small','Medium','Large').required(),
        vendor:joi.string().min(3).max(20).required(),
        description:joi.string().min(3).max(90).required(),
        price:joi.number().positive().required()
    });
    const {error}=itemSchema.validate(req.body);
    try{
    if(!error){
        return next();
    }else{
        return res.status(400).json({status:400,success:false,message:error.details[0].message});
    }
}catch(error){
        console.error('Error in validateItemCreation middleware:',error);
        return res.status(500).json({status:500,success:false,message:'Internal Server Error'});
    }
}


// const DeleteCartValidator=async(req, res, next)=>{
//     try{
        
//     }
// }


module.exports={
    validateItemCreation
}