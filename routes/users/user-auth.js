const express = require("express");
const routes = express.Router();
const {
    login,
    register

} = require("../../controllers/users/auth")

const { userValidationRules, loginValidationRules } = require("../../middlewares/validations/user");
const ValidateResultes = require("../../middlewares/ValidatorResulte");
//Auth 
routes.post("/login", loginValidationRules, ValidateResultes, login);
routes.post("/register", userValidationRules, ValidateResultes, register);



module.exports = routes