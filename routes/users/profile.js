const express = require("express");
const routes = express.Router();

const { userProfileBasicData, changePassword ,myProfile } = require("../../controllers/users/auth")
const { checkToken } = require("../../middlewares/AuthVaildator")

routes.get("/", checkToken, myProfile);

routes.post("/basic", checkToken, userProfileBasicData)
routes.post("/change-password", checkToken, changePassword);


module.exports = routes 