const express =require('express');
const router=express.Router();

const itemController=require('../controller/items.controller');
const itemMiddleware=require('../middleware/items.middleware');

router.post('/',itemMiddleware.validateItemCreation,itemController.CreateItemController);
router.get('/',itemController.GetAllItemsController);
router.get('/cart' , itemController.GetCartController);
router.post('/add-to-cart' ,itemController.AddToCartController)
router.delete('/cart/:itemId' ,itemController.deleteCartItemController)
router.delete('/delete' ,itemController.deleteItemController)
module.exports=router;