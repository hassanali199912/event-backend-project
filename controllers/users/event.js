const ResponseHandler = require("../../utils/ResponseHandler");
const EventCrud_crud = require("../../services/event-crud");
const EventModule = new EventCrud_crud();
const { normalizePath, removeFile } = require("../../utils/FileHelper");

/*
    The Event Oprations For The Users
*/


// Main Crud      
const getAllEvents = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const events = await EventModule.getAll();
        return responseHandler.success(events, "Events Feched Successfully", 201);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}
const getEventBiID = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const event = await EventModule.getById(req.params.id);
        return responseHandler.success(event, "Event Feched Successfully", 201);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

// Part 1 The Basic Infromation
const createEventP1 = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const event = await EventModule.create({
            ...req.body,
            userId: req.userId
        });
        return responseHandler.success(event, "Event created successfully", 201);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}
const updateEventP1 = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const isExist = await EventModule.getById(req.params.id);
        if (!isExist) {
            return responseHandler.notFound("Event not found");
        }
        const event = await EventModule.update(req.params.id, req.body);
        return responseHandler.success(event, "Event updated successfully", 201);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}


// Part 2 The Images
const uploadEventImagesP2 = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const image = req.file;
        console.log(req.file);

        const { type } = req.body
        if (!image) {
            return responseHandler.fileFormatError("Invalid Error image is require and file type (Only .jpg, .jpeg, .png, .webp are allowed)");
        }

        const event = await EventModule.getById(req.params.id);
        if (event.images[type] && event.images[type] !== null) {
            removeFile(event.images[type]);
        }
        await EventModule.update(req.params.id, {
            $set: {
                [`images.${type}`]: normalizePath(image.path)
            }
        });
        return responseHandler.success(event, "Event created successfully", 201);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}
const deleteEventImagesP2 = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {

        const { type } = req.headers


        const event = await EventModule.getById(req.params.id);
        if (event.images[type]) {
            removeFile(event.images[type]);
        }
        await EventModule.update(req.params.id, {
            $set: {
                [`images.${type}`]: ""
            }
        });



        return responseHandler.success(event, "Event created successfully", 201);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}


// My events
const getMyEvents = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const events = await EventModule.filterBy({ userId: req.userId });
        return responseHandler.success(events, "Events Feched Successfully", 201);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}




module.exports = {
    // The Basic Crud Oprations
    getAllEvents,
    getEventBiID,

    // user events
    getMyEvents,
    // Part 1
    createEventP1,
    updateEventP1,
    // Part 2
    uploadEventImagesP2,
    deleteEventImagesP2,
};




