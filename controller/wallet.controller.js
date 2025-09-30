const walletService=require('../service/wallet.service')

const createWalletController= async (req, res) =>{
    try{
        cosnt newWallet = await walletService.CreateWallet({balance:0, userId})
        if(!newWallet.success){
            return res.status(newWallet.status).json(newWallet)
        }
    }catch(error){
        console.error('Error in wallet controller', error)
        return res.status(500).json({status: 500, success:false, message: 'internal sever error'})
    }
}

module.exports ={
    createWalletController
}