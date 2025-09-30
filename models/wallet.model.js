const mongoose = require('mongoose')

const walletSchema = new mongoose.Schema({
    // _id:{
    //     type:String,
    //     default: shortid.generate
    // },
    userId:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:0
    },
    created_at:{
        type:Date,
        default: Date.now()
    }
})

const wallet = mongoose.model('wallet', walletSchema)

module.exports= wallet