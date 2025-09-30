const transactionalModel = require('../models/transactional.model')
const wallet = require('../models/wallet.model')
const axios = require("axios")

const initiateTransaction = async({amount, status, type, userId, walletId })=>{
    const newTransaction = await transactionalModel.create({
        amount : amount,
        status: status,
        type: type,
        walletId: walletId,
        userId:userId
    })
    return {status:201, success:true, data:newTransaction}
}

const verifyTransaction= async(reference)=>{
    try{
        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`} }
    );
    // const userId = data.metadata.userId
    return {status:200, success: true, data:response.data.data };
    }catch(error){
        console.error("Error in verify payment service",error.message)
        return{status:500 , success: false, message: "internal server error"}
    }
}



module.exports={
    initiateTransaction,
    verifyTransaction
}