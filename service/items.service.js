const itemModel=require('../models/items.model');
const cartModel=require('../models/cart.model')

const CreateItem=async({name,size,description,price,vendor})=>{
    try{
    const newItem=await itemModel.create({name,size,description,price,vendor});

    return {status:201,success:true,message:'Item created successfully',data:newItem};
   
    }catch(error){
        return{status:500, success:false,message:'error in createItem service', error}
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
            message:( 'Failed to retreive items', error)
        }
    }
}

const DeleteItem = async(_id)=>{
    try{
        const items = await itemModel.findByIdAndDelete(_id);
        if(!items){
            return{status:404, success:false, message:'Item not Deleted Successfully', data:items}
        }
        return{status:200, success:true , message:"Item deleted successfully", data:items}
    }catch(error){
        console.error('error in delete items', error)
        return{status:500,success:false, message:"internal server error"}
    }
}

const AddToCart=async({userId,itemId,quantity})=>{
    try{
            const numQuantity = Number(quantity);

        let cart =await cartModel.findOne({userId});


        if(!cart){
            cart = new cartModel({userId , items: [ ]});
        }

        const existingItem=cart.items.find(item=>item.itemId.toString()===itemId);

          if(existingItem){
          existingItem.quantity += numQuantity;
        }else{
            cart.items.push({itemId ,quantity: numQuantity });
        }

        await cart.calculateTotal();
        await cart.save();
        return{status:200, success:true,  message:'Item added to cart', data:cart };

    }catch(error){
        return {status:500, success: false, message: false, message:'Error in AddToCart service', error};
    }
}

const GetCart= async (userId)=>{
    try{
        const cart=await cartModel.find({userId}).populate('items.itemId');

        if(cart.length===0){
            return{status:404, success:false, message:'Please add items , no cart found'}
        }
        return{status:200, success:true, data: cart}
    }catch(error){
        return{status:500, success:false,message: 'Error in GetCart service' , error}
    }
}

const DeleteCartItem= async (userId, itemId)=>{
    try{
    const cart = await cartModel.findOne({userId}).populate('items.itemId');

    cart.items = cart.items.filter(item => item.itemId !== null);

     if (cart.isModified('items')) {
    await cart.calculateTotal();
    await cart.save();
    }
    
    if(!cart){
        return{status:404, success:false, message:'Cart not found'}
    }
    const itemIndex= cart.items.findIndex(item=>item.itemId && item.itemId._id.equals(itemId) 
);

    if(itemIndex===-1){
        return{status:404, success:false, message:'Item not found in cart'}
    }

    cart.items.splice(itemIndex, 1);

    await cart.calculateTotal();
    await cart.save();

    return{status:200, success:true, message:'Item removed from cart', data:cart}
    

}catch(error){
    console.error('Error in DeleteCartItem service', error)
    return{status:500, success:false, message:'Error in DeleteCartItem service', error}
}
}

module.exports={
    CreateItem,
    GetAllItems,
    DeleteItem,
    AddToCart,
    GetCart,
    DeleteCartItem
}

    // const cartToDelete= await cartModel.findByIdAndDelete({_id});
    // if(!cartToDelete){
    //     return {status:404, success:false, message:'Cart not found'}
    // }
    // return{status:200, success:true, message:'Cart deleted successfully',data: cartToDelete}