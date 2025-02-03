const express = require("express");
const routes = express.Router();
const Events = require("../../models/event");
const {
    getAllEvents,
    getEventBiID,
    getMyEvents,
    createEventP1,
    updateEventP1,
    uploadEventImagesP2,
    deleteEventImagesP2
} = require("../../controllers/users/event")


const { upload } = require("../../utils/MulterImageUploader");
const { checkToken, isOwner } = require("../../middlewares/AuthVaildator");
const { eventValidationRulesP1, eventValidationRulesP2 } = require("../../middlewares/validations/events");

//  The Basic Crud Oprations
routes.get("/", getAllEvents);
routes.get("/:id", getEventBiID);

//user events
routes.get("/my-events", checkToken, getMyEvents);


// Part 1 The Basic Infromation
routes.post("/p1/", checkToken, eventValidationRulesP1, createEventP1);
//routes.post("/p1/:id", checkToken, isOwner(Events), updateEventP1);

// Part 2 The Images
routes.post("/p2/images/:id", checkToken, isOwner(Events), eventValidationRulesP2, upload.single("image"), uploadEventImagesP2);
routes.delete("/p2/images/:id", checkToken, isOwner(Events), deleteEventImagesP2);



module.exports = routes