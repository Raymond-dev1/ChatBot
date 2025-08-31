const express =require('express');
const router=express.Router();

const itemController=require('../controller/items.controller');
const itemMiddleware=require('../middleware/items.middleware');

router.post('/',itemMiddleware.validateItemCreation,itemController.CreateItemController);
router.get('/',itemController.GetAllItemsController);

module.exports=router;