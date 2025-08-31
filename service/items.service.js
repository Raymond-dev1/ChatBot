const itemModel=require('../models/items.model');

const CreateItem=async({name,size,description,price,vendor})=>{
    try{
    const newItem=await itemModel.create({name,size,description,price,vendor});

    return {status:201,success:true,message:'Item created successfully',data:newItem};
    }catch(error){
        return{status:500, success:true,message:'error in createItem service', error}
    }
}

const GetAllItems=async()=>{
    try{
    const items=await itemModel.find();
    return {status:200,success:true,message:'Items retrieved successfully',data:items};
    }catch(error){
        return{
            status:500,
            success:false ,
            message:( 'error in GetAllItems service', error)
        }
    }
}


module.exports={
    CreateItem,
    GetAllItems
}