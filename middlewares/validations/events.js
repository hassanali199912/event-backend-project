
const { body } = require("express-validator");


const eventValidationRulesP1 = [
    body("title")
        .notEmpty().withMessage("Title is required")
        .isString().withMessage("Title must be a string")
        .trim()
        .isLength({ max: 100 }).withMessage("Title cannot exceed 100 characters"),

    body("description")
        .notEmpty().withMessage("Description is required")
        .isString().withMessage("Description must be a string")
        .trim()
        .isLength({ max: 1000 }).withMessage("Description cannot exceed 1000 characters"),

    body("schedule.startDate")
        .notEmpty().withMessage("Start date is required")
        .isISO8601().withMessage("Start date must be a valid ISO8601 date"),

    body("schedule.endDate")
        .notEmpty().withMessage("End date is required")
        .isISO8601().withMessage("End date must be a valid ISO8601 date")
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.schedule.startDate)) {
                throw new Error("End date must be after the start date");
            }
            return true;
        }),

    body("schedule.doorTime")
        .notEmpty().withMessage("Door time is required")
        .matches(/^(0[0-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i).withMessage("Door time must be in 'HH:MM AM/PM' format"),

    body("locationDetails.location")
        .notEmpty().withMessage("Location is required")
        .isString().withMessage("Location must be a string")
        .trim(),

    body("locationDetails.venue")
        .notEmpty().withMessage("Venue is required")
        .isString().withMessage("Venue must be a string")
        .trim(),

    body("locationDetails.address")
        .notEmpty().withMessage("Address is required")
        .isString().withMessage("Address must be a string")
        .trim(),

    body("contactInfo.phone")
        .notEmpty().withMessage("Phone number is required")
        .matches(/^\+?[0-9]{1,4}-?[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/).withMessage("Phone number must be valid"),

    body("contactInfo.email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email must be valid"),

    body("status")
        .notEmpty().withMessage("Status is required")
        .isString().withMessage("Status must be a string")
        .isIn(["Showing", "Cancelled", "Postponed"]).withMessage("Status must be one of: Showing, Cancelled, Postponed"),

    body("price")
        .notEmpty().withMessage("Price is required")
        .matches(/^\$\d+(\.\d{2})?$/).withMessage("Price must be in the format '$XXX.XX'"),

    body("totalTickets")
        .notEmpty().withMessage("Total tickets is required")
        .isInt({ min: 1 }).withMessage("Total tickets must be a positive integer"),

    body("organizer")
        .notEmpty().withMessage("Organizer is required")
        .isArray({ min: 1 }).withMessage("Organizer must be an array with at least one item")
        .custom((value) => {
            if (!value.every((item) => typeof item === "string")) {
                throw new Error("All organizer items must be strings");
            }
            return true;
        }),

    body("category")
        .notEmpty().withMessage("Category is required")
        .isString().withMessage("Category must be a string")
        .trim(),

    body("tags")
        .notEmpty().withMessage("Tags are required")
        .isArray({ min: 1 }).withMessage("Tags must be an array with at least one item")
        .custom((value) => {
            if (!value.every((item) => typeof item === "string")) {
                throw new Error("All tags must be strings");
            }
            return true;
        }),
]
const eventValidationRulesP2 = [
    body("type")
        .notEmpty().withMessage("Type is required")
        .isIn(["main", "secondary", "layout"]).withMessage("Type must be one of: main, sec, layout"),
]

const eventValidationRulesP3 = [
    body("map")
        .notEmpty().withMessage("Map src is required")
]

module.exports = { eventValidationRulesP1, eventValidationRulesP2 ,eventValidationRulesP3}