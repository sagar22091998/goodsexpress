//Packages
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const uuid = require('uuid');  


//Routes

const authRoutes = require('./routes/auth')
const customerRoutes = require('./routes/customer')
const transporterRoutes = require('./routes/transporter')

const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next()
})

app.use('/auth',authRoutes);
app.use('/customer',customerRoutes);
app.use('/transporter',transporterRoutes);

app.use((error,req,res,next)=>{
  console.log(error);
  const message = error.message;
  const statusCode = error.statusCode;
  res.status(statusCode).json({
    message
  })
})

mongoose.connect(`mongodb+srv://sagar22091998:gattukaka@firstcluster-h6ayb.mongodb.net/seproj?retryWrites=true&w=majority`)
.then(result =>{
  app.listen(8080);
})
.catch( err => console.log("Could Not Create the Server"));
