const mongoose=require('mongoose');

const itemSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    size:{
        type:String,
        enum: ['Small', 'Medium', 'Large']
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    vendor:{
        type:String,
        required:true,
    },
    postedAt:{
        type:Date,
        default:Date.now,
    }
})

const Item=mongoose.model('Item',itemSchema);

module.exports=Item;