const express = require("express");

const routes = express.Router();

const { changeVisablity, createSponsers, getAll, getById, deleteById } = require("../../controllers/dashboard/sponsers");
const { isAdmin } = require("../../middlewares/AuthVaildator");
const { upload } = require("../../utils/MulterImageUploader"); { }


routes.get("/"
    //,isAdmin
    , getAll);

routes.get("/:id"
    //,isAdmin
    , getById);

routes.delete("/:id"
    //,isAdmin
    , deleteById);

routes.post("/"
    //,isAdmin
    , upload.single("image"), createSponsers);

routes.get("/visblity/:id"
    //,isAdmin
    , changeVisablity);



module.exports = routes