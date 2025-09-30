const transactionService= require('../service/transaction.service')
const axios= require('axios')
const User= require('../models/user.model')


const transactionMiddleware=async(req, res, )=>{
 try{
    //VALIDATE USER 
    const user= await User.findOne({_id: req.session.userId})
            if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found with this id'
            });
        }

    const userId= req.session.userId;
    const walletId=req.session.userId;

    //PREAPRE TRANSACTION DATA 
      const transactionData = {
            amount: req.body.amountInNaira,
            email:req.body.email,
            status: 'pending',
            type: 'credit',
            userId:userId,
            walletId:walletId
        };

    //INITIATE TRANSACTION DATA
const serviceResponse = await transactionService.initiateTransaction(transactionData); 

        if (!serviceResponse.success) {
            return res.status(serviceResponse.status).json(serviceResponse);
        }

//PAYSTACK DATA
const paystackData={
    amount: req.body.amountInNaira *100,
    // reference : serviceResponse.data._id,
    email: req.body.email,
    metadata: { userId : req.session.userId},
    callback_url: 'http://localhost:5000/api/v1/chat'
};

//PAYSTACK API CALL
const headers= {
  Authorization :`Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  'content-type':'application/json'
}
const paystackResponse  = await axios.post('https://api.paystack.co/transaction/initialize' ,paystackData,{
    headers
});

//FRONTEND RESPONSE 
return res.json({status:200,
     success:true, 
     data:{
    authorization_url:  paystackResponse.data.data.authorization_url,
    access_code: paystackResponse.data.data.access_code,
    reference: paystackResponse.data.data.reference

}})
// req.data=response.data;
// next();


}catch (error) {
        console.error('Transaction middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Transaction initialization failed',
            error: error.message
        });
    }
}
module.exports= {
    transactionMiddleware
}