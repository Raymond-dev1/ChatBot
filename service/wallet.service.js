 const walletModel= require('./models/wallet.model')

const CreateWallet = async ({userId})=>{
    const wallet= await walletModel.findOne({userId})
    if(!wallet){
        const newWallet =await walletModel.create({balance:0, userId})
    }else{
    return wallet
    }
    return{status:200, success:true, data:wallet}
}


module.exports={
    CreateWallet
}