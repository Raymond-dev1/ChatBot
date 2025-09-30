const express= require ('express')
const router=express.Router();

const transactionController= require('../controller/transaction.controller')
const transactionMiddleware= require('../middleware/transaction.middleware')

router.post('/initiate', transactionMiddleware.transactionMiddleware, transactionController.initiateTransactionController)
router.get('/verify', transactionController.verifyTransactionController)


module.exports= router