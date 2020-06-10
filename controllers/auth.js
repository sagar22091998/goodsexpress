const User = require('../models/user');
const expValidation = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.signup = (req,res,next)=>{
  
  const errors = expValidation.validationResult(req)
  if(!errors.isEmpty()){
    const error = new Error("Validation Failed")
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  
  const {email,password,name,profileType} = req.body;
  
  bcrypt.hash(password,12)
  .then(hashedPass =>{
    const user = new User({
      email:email,
      password:hashedPass,
      name: name ,
      profileType : profileType
    })  
    return user.save();
  })
  .then(x=>{
    res.status = 201;
    return res.json({message:"User Created",data:x});
  })
  .catch( err => {
    if(!err.statusCode) {// this implies async error aaya hai 
      err.statusCode=500;
    }  
    next(err);
  });

};

exports.login = (req,res,next)=>{

  const errors = expValidation.validationResult(req)
  if(!errors.isEmpty()){
    const error = new Error("Validation Failed")
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  
  const {email,password} = req.body;

  let loggedInUser;
  
  User.findOne({email:email})
    .then(user =>{
      loggedInUser = user;
      return bcrypt.compare(password,user.password)
    })
    .then(isEqual =>{
      if(!isEqual){
        const error = new Error("Incorrect Password")
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email:loggedInUser.email,
          userId:loggedInUser._id.toString()
        },
        "superjanvertonghen",
        {
        expiresIn:"1h"
      })

      res.status(200);
      res.json({
        token:token,
        userId:loggedInUser._id.toString(),
        userType:loggedInUser.profileType})     
    })
    .catch(err => {
      if(!err.statusCode) {// this implies async error aaya hai 
        err.statusCode=500;
      }  
      next(err);
    })
}