const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  receiverName : {
    type : String,
    required : true
  }, 
  receiverAddress : {
    type : String,
    required : true
  },
  contact : {
    type : String,
    required : true
  },
  weight : {
    type : Number,
    required : true
  },
  userId:{
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : "User"
  },
  delivered:{
    type:Boolean,
    default:false
  }
},{timestamps:true})

module.exports = mongoose.model('Order',orderSchema);