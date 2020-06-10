const express = require('express');
const User = require('../models/user');
const expValidator = require('express-validator/check');

const authController = require('../controllers/auth');
const router = express.Router();

//Login POST
router.post('/login',
expValidator  //Email checks
.check('email')
.isEmail()
.withMessage("Incorrect Email")
.custom((value,{req})=>{
  return User.findOne({email:value})
    .then(userDoc=>{
      if(!userDoc)
        return Promise.reject("No Such User Exists")
    })
  })
.normalizeEmail(),
expValidator  
.check('password',"Invalid Pass")
.trim()
.isLength({min:8}),
authController.login);

//SIGNUP PUT 
router.put('/signup',
expValidator  //Email checks
.check('email')
.isEmail()
.withMessage("Incorrect Email")
.custom((value,{req})=>{
  return User.findOne({email:value})
    .then(userDoc=>{
      if(userDoc)
        return Promise.reject("Already Email Exists")
    })
  })
.normalizeEmail(),
expValidator  
.check('password',"Invalid Pass")
.trim()
.isLength({min:8}),
expValidator  
.check('name')
.trim()
.not()
.isEmpty(),
expValidator  
.check('profileType')
.trim()
.not()
.isEmpty(),
authController.signup)

module.exports = router;