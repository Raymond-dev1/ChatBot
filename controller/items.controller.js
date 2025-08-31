const itemService=require('../service/items.service');

const CreateItemController=async(req,res)=>{
    console.log('req.body:' , req.body)
    console.log('req.bodytype:', typeof req.body)
      console.log('req.headers:', req.headers);
    console.log('req.method:', req.method);
    console.log('req.url:', req.url);
    console.log('========================');

    if(!req.body){
        return res.status(400).json({
            status:400,
            success:false,
            message: 'req.body is undefined-body parsing middleware not working'
        })
    }
    const payload=req.body;
    try{
        const serviceResponse=await itemService.CreateItem(payload);
        if(!serviceResponse.success){
            return res.status(serviceResponse.status).json(serviceResponse);
        }
        return res.status(serviceResponse.status).json(serviceResponse);
    }catch(error){
        console.error('Error in CreateItem controller:',error);
        return res.status(500).json({status:500,success:false,message:'Internal Server Error'});
    }
}

const GetAllItemsController=async(req,res)=>{
    try{
        const filters =req.query
        const serviceResponse=await itemService.GetAllItems(filters);
        if(!serviceResponse.success){
            return res.status(serviceResponse.status).json(serviceResponse);
        }
        return res.status(serviceResponse.status).json(serviceResponse)
        }catch(error){
            console.error('error in GetAllItems controller', error)
            return res.status(500).json({status:500, success:false, message:'Internal server Error'})
        }
}

module.exports={
    CreateItemController,
    GetAllItemsController
}