const express = require("express");
const routes = express.Router();
routes.use("/auth", require("./user-auth"))
routes.use("/profile", require("./profile"))

routes.use("/event", require("./event"))
routes.use("/sponsers", require("./sponsers"))
routes.use("/slider", require("./slider"))
routes.use("/category", require("./category"))

module.exports = routes;