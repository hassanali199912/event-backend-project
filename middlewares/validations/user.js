const { body } = require("express-validator");

const userValidationRules = [
    body("fname").isString().trim().escape().withMessage("First name is required"),
    body("lname").isString().trim().escape().withMessage("Last name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Email is required"),
    body("password").isString().trim().isLength({ min: 6 }).escape().withMessage("Password must be at least 6 characters"),
]

const loginValidationRules = [
    body("email").isEmail().normalizeEmail().withMessage("Email is required"),
    body("password").isString().trim().escape().withMessage("Password is required"),
]

module.exports = { userValidationRules, loginValidationRules }