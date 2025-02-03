const express = require("express");

const routes = express.Router();

const { sliderSelector } = require("../../controllers/dashboard/event");
const { isAdmin } = require("../../middlewares/AuthVaildator");

routes.get("/slider/:id"
    //,isAdmin
    , sliderSelector);


module.exports = routes