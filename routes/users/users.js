const express = require("express");
const routes = express.Router();
routes.use("/auth", require("./user-auth"))
routes.use("/event", require("./event"))

module.exports = routes;