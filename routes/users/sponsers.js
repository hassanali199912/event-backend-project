const express = require("express");

const routes = express.Router();
const { getAll } = require("../../controllers/users/sponsers");

routes.get("/", getAll);

module.exports = routes