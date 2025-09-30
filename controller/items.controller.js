const itemService=require('../service/items.service');
const cartService=require('../service/items.service')

const CreateItemController=async(req,res)=>{
    // console.log('req.body:' , req.body)
    // console.log('req.bodytype:', typeof req.body)
    //   console.log('req.headers:', req.headers);
    // console.log('req.method:', req.method);
    // console.log('req.url:', req.url);
    // console.log('========================');

    if(!req.body){
        return res.status(400).json({
            status:400,
            success:false,
            message: 'req.body is undefine_body parsing middleware not working'
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

const deleteItemController=async(req, res)=>{
    try{
        const _id = req.body

    const itemToDelete = await itemService.DeleteItem(_id)
    if(!itemToDelete.success){
        return res.status(itemToDelete.status).json(itemToDelete)
    }
    return res.status(itemToDelete.status).json(itemToDelete)
    }catch(error){
        console.error('error in delete item controller', error)
        return res.status(500).json({status:500, success:false, message:"internal server error"})
    }
}

const  GetCartController=async (req, res)=>{
    try{
        const userId= req.session.userId;
        const serviceResponse=await cartService.GetCart(userId)
        if(!serviceResponse.success){
            return res.status(serviceResponse.status).json(serviceResponse)
        }
        return res.status(serviceResponse.status).json(serviceResponse)
    }catch(error){
            console.error('error in GetCartController', error)
            return res.status(500).json({status:500, success:false, message:'Internal server Error'})
    }
}

const AddToCartController=async(req, res)=>{
    try{
        const userId = req.session.userId ;
        const {itemId, quantity}= req.body;
        const numQuantity = parseInt(quantity);

            if (!userId) {
            return res.status(401).json({
                status: 401,
                success: false, 
                message: 'User not authenticated'
            });
        }

        console.log('userId', userId)
        

        const serviceResponse=await cartService.AddToCart({userId, itemId, quantity: numQuantity})
        if(!serviceResponse.success){
            return res.status(serviceResponse.status).json(serviceResponse)
        }
        return res.status(serviceResponse.status).json(serviceResponse)
    }catch(error){
        console.error('Error in AddToCartController', error)
        return res.status(500).json({status: 500, success:false, message:'internal server error'})
    }
}


const deleteCartItemController=async(req, res)=>{
    try{
        const userId= req.session.userId ;
        const itemId= req.params.itemId

        console.log('userId in delete controller', userId)
        console.log('itemId in delete controller', itemId)

        
        const cartToDelete= await cartService.DeleteCartItem(userId, itemId)
        if(!cartToDelete.success){
            return res.status(cartToDelete.status).json(cartToDelete)
        }
        return res.status(cartToDelete.status).json(cartToDelete)
    }catch(error){
        console.error('Error in deletecart controller', error)
        return res.status(400).json({status:400, success:false, message:'internal server error'})
    }
}

module.exports={
    CreateItemController,
    GetAllItemsController,
    deleteItemController,
    GetCartController,
    AddToCartController,
    deleteCartItemController
}