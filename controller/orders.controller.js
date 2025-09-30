// const userModel = require('../models/user.model')
const OrderService = require('../service/order.service')

const CreateOrderController= async(req, res)=>{
    try{
    const userId=req. session.userId
    const {orderNumber, items , total , status, orderDate} =req.body

    if(!orderNumber || !items || !total ){
        return res.status(400).json({status:400, success: false, message:"missing required fields , please place an order" })
    }

    const serviceResponse= await OrderService.createOrder(userId,orderNumber, items, total, status, orderDate)
    if(!serviceResponse.success){
        return res.status(serviceResponse.status).json (serviceResponse)
    }
    return res. status(serviceResponse.status).json(serviceResponse)
    }catch(error){
        console.error("Error in create order controller", error )
        return res.status (500).json({status:500, success:false, message:'internal server Error'})
    }
}

const GetOrderController =async(req, res)=>{
    try{
        const userId = req.session.userId
        const serviceResponse= await OrderService.GetOrders(userId)
    if(!serviceResponse.success){
        return res.status(serviceResponse.status).json (serviceResponse)
    }
    return res. status(serviceResponse.status).json(serviceResponse)
    }catch(error){
        console.error("Error in get order controller", error )
        return res.status (500).json({status:500, success:false, message:'internal server Error'})
    }
}

const DeleteOrderController = async (req, res)=>{
    try{
        const {_id}=req.params
        const userId= req.session.userId
        const serviceResponse=await OrderService.DeleteOrders(userId,_id)
        if(!serviceResponse.success){
            return res.status(serviceResponse.status).json (serviceResponse)
        }
        return res. status(serviceResponse.status).json(serviceResponse)
    }catch(error){
        console.error("Error in delete order controller", error )
        return res.status (500).json({status:500, success:false, message:'internal server Error'})
    }
}

module.exports= {
    CreateOrderController,
    GetOrderController,
    DeleteOrderController
}