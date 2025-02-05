const express = require("express");
const routes = express.Router();
const Events = require("../../models/event");
const { upload } = require("../../utils/MulterImageUploader");
const { checkToken, isOwner, isAdmin } = require("../../middlewares/AuthVaildator");
const { eventValidationRulesP1, eventValidationRulesP2, eventValidationRulesP3 } = require("../../middlewares/validations/events");

const {
    sliderSelector,
    getAllEvents,
    getEventBiID,
    getMyEvents,
    createEventP1,
    updateEventP1,
    uploadEventImagesP2,
    deleteEventImagesP2,
    uploadEventLocationsP3 } = require("../../controllers/dashboard/event");





//  The Basic Crud Oprations
routes.get("/", getAllEvents);
routes.get("/:id", getEventBiID);

// Part 1 The Basic Infromation
routes.post("/p1/",
    //isAdmin,
    eventValidationRulesP1, createEventP1);
routes.post("/p1/:id",
    //isAdmin,
    updateEventP1);

// Part 2 The Images
routes.post("/p2/images/:id",
    //isAdmin, 
    eventValidationRulesP2, upload.single("image"), uploadEventImagesP2);
routes.delete("/p2/images/:id",
    //isAdmin,
    deleteEventImagesP2);

// Part 3 The Locations
routes.post("/p3/map/:id",
    //isAdmin,
    eventValidationRulesP3, uploadEventLocationsP3);


routes.get("/slider/:id"
    //,isAdmin
    , sliderSelector);


module.exports = routes
