const express = require("express");
const routes = express.Router();
const { requestPayment } = require("../../controllers/users/payment")

routes.post("/request", requestPayment);




module.exports = routes