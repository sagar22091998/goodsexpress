const express = require('express');
const isAuth = require("../middleware/is-auth");
const transporterController = require('../controllers/transporter');
const router = express.Router();


//GET Pending
router.get('/pending',isAuth,transporterController.getPending)

//PUT Pending
router.put('/pending/:orderId',isAuth,transporterController.changeStatus)

module.exports = router;