const express = require("express");

const routes = express.Router();

const {
    createCategory,
    getAllCategories,
    deleteCategory,
    getById,
    updateCategory,
    changeVisablity
} = require("../../controllers/dashboard/category");
const { isAdmin } = require("../../middlewares/AuthVaildator");


routes.get("/"
    , isAdmin
    , getAllCategories);

routes.get("/visablity/:id"
    , isAdmin
    , changeVisablity);


routes.get("/:id"
    , isAdmin
    , getById);


routes.post("/"
    , isAdmin
    , createCategory);

routes.post("/:id"
    , isAdmin
    , updateCategory);
routes.delete("/:id"
    , isAdmin
    , deleteCategory);



module.exports = routes