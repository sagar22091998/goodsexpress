const Order = require('../models/orders');
const expValidation = require("express-validator/check");
const jwt = require('jsonwebtoken');

exports.placeOrder = (req,res,next)=>{
  
  const errors = expValidation.validationResult(req)
  if(!errors.isEmpty()){
    const error = new Error("Validation Failed")
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  
  const {receiverName,receiverAddress,contact,weight,userId} = req.body;
  
  const order = new Order({
    receiverName,
    receiverAddress,
    contact ,
    weight ,
    userId
  })  

  order.save()
  .then(result=>{
    res.status = 200;
    return res.json({message:"Order Placed"});
  })
  .catch( err => {
    if(!err.statusCode) {
      err.statusCode=500;
    }  
    next(err);
  });

};

exports.getOrders = (req,res,next)=>{
  
  Order.find({"userId":req.body._id})
  .then(orders =>{
    res.status(200)
    res.json({
      message : "All orders Fetched",
      orders      
    })
  })
  .catch( err =>{
    if(!err.statusCode) {// this implies async error aaya hai 
      err.statusCode=500;
    }  
    next(err);
  })
}