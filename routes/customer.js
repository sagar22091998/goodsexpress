const express = require('express');
const User = require('../models/user');
const expValidator = require('express-validator/check');
const isAuth = require("../middleware/is-auth");
const customerController = require('../controllers/customer');
const router = express.Router();

//NewOrder PUT
router.put('/neworder',
isAuth,
expValidator  
.check('receiverName',"Fill All Fields")
.trim()
.not()
.isEmpty(),
expValidator  
.check('receiverAddress',"Fill All Fields")
.trim()
.not()
.isEmpty(),
expValidator  
.check('contact',"Fill All Fields")
.trim()
.not()
.isEmpty(),
expValidator  
.check('weight',"Fill All Fields")
.trim()
.not()
.isEmpty(),
customerController.placeOrder);

//GET POST
router.post('/orders',isAuth,customerController.getOrders)

module.exports = router;