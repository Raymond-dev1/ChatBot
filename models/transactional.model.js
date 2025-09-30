const mongoose = require ('mongoose')

const transactionSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    type:{
        type: String,
        enum:['credit', 'debit']
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type: String,
        required:true,
        enum: ['pending','success', 'failed'],
        default: 'pending'
    },
    walletId:{
        type:String,
        required:true,
        ref: 'wallet',
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const transaction= mongoose.model('transaction', transactionSchema);

module.exports=transaction