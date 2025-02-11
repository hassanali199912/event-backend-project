const express = require("express");
const routes = express.Router();
const { isAdmin } = require("../../middlewares/AuthVaildator")
const { create, getAll, updateSteat, deleteSteat } = require("../../controllers/dashboard/seats");

routes.get("/:id",
    //isAdmin,
    getAll
);
routes.post("/",
    //isAdmin,
    create
);
routes.post("/:id",
    //isAdmin,
    updateSteat
);
routes.delete("/:id",
    //isAdmin,
    deleteSteat
);

module.exports = routes;