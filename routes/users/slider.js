const express = require("express");
const routes = express.Router();

const {sliderSelector} = require("../../controllers/users/event")


routes.get("/",sliderSelector)

module.exports = routes
