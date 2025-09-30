const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    orderNumber:{
        type:String,
        required:true,
        unique:true
    },
    items:[
        {
            itemId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Item',
                required:true
            },
            name: String,
            price: Number,
            quantity: Number, 
        }
    ],
    total:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    orderDate:{
        type:Date,
        default:Date.now,
    }
})

const order= mongoose.model('Order', orderSchema);

module.exports= order