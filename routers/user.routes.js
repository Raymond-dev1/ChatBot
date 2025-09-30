const express=require('express');
const router=express.Router();

const userController=require('../controller/user.controller');
const userMiddleware=require('../middleware/user.middleware'); 

router.post('/signup',userMiddleware.validateUserCreation,userController.CreateUser);
router.post('/login',userController.LoginUser);

module.exports=router;