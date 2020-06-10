const Order = require('../models/orders');

exports.getPending = (req,res,next)=>{
  
  Order.find({"delivered":false})
  .then(pendingOrders =>{
    res.status(200)
    res.json({
      message : "All Pending Orders Fetched",
      pendingOrders      
    })
  })
  .catch( err =>{
    if(!err.statusCode) {// this implies async error aaya hai 
      err.statusCode=500;
    }  
    next(err);
  })
}

exports.changeStatus = (req,res,next)=>{
  
  const orderId = req.params.orderId;

  Order.findById(orderId)
  .then(order =>{
    order.delivered = true;
    return order.save()
  })
  .then(result => { 
    res.status(200)
    res.json({
      message : "Order Status Updated",      
    })
  })
  .catch( err =>{
    if(!err.statusCode) {// this implies async error aaya hai 
      err.statusCode=500;
    }  
    next(err);
  })
}