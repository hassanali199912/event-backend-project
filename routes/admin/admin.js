const express = require("express");
const routes = express.Router();

routes.use("/users",require("./user-auth"));
routes.use("/event",require("./event"));
routes.use("/event/speacker",require("./speacker"));
routes.use("/sponsers",require("./sponsers"));
routes.use("/category",require("./category"));
routes.use("/seats",require("./seats"));


module.exports = routes;