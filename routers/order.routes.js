const express =require('express')
const router=express.Router();


const orderController = require ('../controller/orders.controller')

router.post('/create-order' ,orderController.CreateOrderController)
router.get('/get-order', orderController.GetOrderController)
router.delete('/delete-order',orderController.DeleteOrderController)

module.exports=router