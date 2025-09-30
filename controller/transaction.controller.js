const OrderService = require('../service/order.service')
const transactionService = require('../service/transaction.service')
const cartModel = require('../models/cart.model')

const initiateTransactionController = async (req, res)=>{
    try{
        if(!req.body.amountInNaira || !req.session.userId){
            return res.status(400).json({message: 'invalid request ' ,})
        }
    }catch (error){
        console.error("error in initiate transaction cont", error)
        return{status: 500, success: false, message:'internal server errror', error}
    }
}

const verifyTransactionController = async(req, res)=>{
    try{
    const {reference } = req.query;

    if(!reference){
        return res.status(400).json({sucess:false, message:"Missing Reference" });
    }

    const result = await transactionService.verifyTransaction(reference)

     if (result.success && result.data.status !== "success") {

    return res.status(400).json({ success: false, message: "Payment not successful" });
     }

    const userId = req.session.userId || data.metadata.userId;

    const cart = await cartModel.findOne({userId}).populate('items.itemId')
    if(!cart){
        return res.status(404).json({success: false,message:"No cart found to further payment" })
    }
    const orderResponse = await OrderService.createOrder({
      userId,
      orderNumber: "ORD-"+Date.now(),
      items: cart.items,
      total: cart.total,
      status: 'completed',
    });

    cart.items = [ ];
    cart.total = 0;
    await cart.save();

    return res.json({status:true, message:"payment verified and order created", data:{
        order:orderResponse.data
    }})

  }catch(error) {
    console.error("Verify controller error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}


module.exports ={
    initiateTransactionController,
    verifyTransactionController
}