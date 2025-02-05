const express = require("express");

const routes = express.Router();

const { createCategory, getAllCategories } = require("../../controllers/dashboard/category");
const { isAdmin } = require("../../middlewares/AuthVaildator");


routes.get("/"
    //,isAdmin
    , getAllCategories);


routes.post("/"
    //,isAdmin
    , createCategory);



module.exports = routes