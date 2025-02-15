const express = require("express");
const routes = express.Router();

const {
    create,
    deleteById,
    getById,
    update,
    getByEventId
} = require("../../controllers/dashboard/speacker");

const { upload } = require("../../utils/MulterImageUploader");
const { isAdmin } = require("../../middlewares/AuthVaildator");

routes.get("/event/:id", isAdmin, getByEventId);
routes.get("/:id", isAdmin, getById);

routes.post("/", isAdmin, upload.single("image"), create);
routes.post("/:id", isAdmin, upload.single("image"), update);


routes.delete("/:id", isAdmin, deleteById);


module.exports = routes


