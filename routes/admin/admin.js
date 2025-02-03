const express = require("express");
const routes = express.Router();

routes.use("/users",require("./user-auth"));
routes.use("/event",require("./event"));
routes.use("/sponsers",require("./sponsers"));

module.exports = routes;