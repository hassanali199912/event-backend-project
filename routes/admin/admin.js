const express = require("express");
const routes = express.Router();

routes.use("/users",require("./user-auth"));

module.exports = routes;