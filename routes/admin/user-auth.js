const express = require("express");
const routes = express.Router();
const {
    createUsers,
    updateUsers,
    getOneUser,
    getAllUser,
    deleteUser,
    // admin Auth
    login

} = require("../../controllers/dashboard/users")
const ValidateResultes = require("../../middlewares/ValidatorResulte");
const { loginValidationRules, userValidationRules } = require("../../middlewares/validations/user");

//Auth 
routes.post("/login", loginValidationRules, ValidateResultes, login);

//Admin Crud On Users 
routes.get("/", getAllUser);
routes.get("/:id", getOneUser);
routes.post("/", userValidationRules, ValidateResultes, createUsers);
routes.put("/:id", userValidationRules, ValidateResultes, updateUsers);
routes.delete("/:id", deleteUser);



module.exports = routes