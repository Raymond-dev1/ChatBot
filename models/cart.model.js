const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    userId:{
        type: String,
        required:true
    },
    items:[
        {
            itemId:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'Item',
                required:true
            },
            quantity:{
                 type: Number,
                required: true,
                min: 1
            }
        }
    ],
     total: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

cartSchema.methods.calculateTotal =async function( ) {
    await this.populate('items.itemId')
    
    const total= this.items.reduce((sum, cartItem)=>{
        if(cartItem.itemId && cartItem.itemId.price){
            return sum +Number((cartItem.itemId.price * cartItem.quantity).toFixed(2)); 
        }
        return sum;
    }, 0);
    this.total = total
    return total;
};



const cart = mongoose.model('Cart', cartSchema);

module.exports=cart

// Number(total.toFixed(2));