const orderModel= require('../models/order.model')


const createOrder=async({
    userId,
    orderNumber,
    items,
    total,
    status,
    orderDate
})=>{
    try{
        const newOrder = await orderModel.create({userId, orderNumber,items, total, status: status || 'pending', orderDate: orderDate ||new Date() })
        return{status:201, success: true, message: 'Order created successfully', data:newOrder}
    }catch(error){
        console.error('Error in createOrder service',error)
        return {status:500, success: false, message: 'Error creating order', error: error.message}
    }
}

const GetOrders= async(userId)=>{
    try{
        const orders= await orderModel.find({userId}).populate('items.itemId') .sort({ orderDate: -1 })
        return{status:200, success:true, data: orders}
    }catch(error){
        console.error('Error in getOrders service', error);
        return({status:500, success: false, message:'Error in getOrders service', error})
    }
}

const DeleteOrders= async(_id)=>{
    const deletedOrder= await orderModel.findByIdAndDelete(_id)
    return deletedOrder
}

module.exports={
    createOrder,
    GetOrders,
    DeleteOrders,
}


