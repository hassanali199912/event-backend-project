const ResponseHandler = require("../../utils/ResponseHandler");
const SpeackerCrud_crud = require("../../services/speacker-crud");
const SpeackerModule = new SpeackerCrud_crud();

const EventCrud_crud = require("../../services/event-crud");
const EventModule = new EventCrud_crud();

const { normalizePath, removeFile } = require("../../utils/FileHelper");




const create = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {

        if (req.file) {
            req.body.image = normalizePath(req.file.path);

        } else {
            req.body.image = "";
        }

        const event = await EventModule.getById(req.body.eventId);
        if (!event) {
            req.body.image !== "" && removeFile(req.body.image);
            return responseHandler.error("event not found", 404);
        }
        const speacker = await SpeackerModule.create(req.body);
        if (speacker) {
            event.speakers.push(speacker._id);
            await event.save();
        } else {
            req.body.image !== "" && removeFile(req.body.image);
        }

        return responseHandler.success(speacker, "speacker Created Successfully", 201);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

const update = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const speacker = await SpeackerModule.getById(req.params.id);
        if (req.file) {
            removeFile(speacker.image);
            req.body.image = normalizePath(req.file.path);
        }
        const updatedSpeacker = await SpeackerModule.update(req.params.id, req.body);
        return responseHandler.success(updatedSpeacker, "speacker Updated Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

const deleteById = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const speacker = await SpeackerModule.delete(req.params.id);
        if (!speacker) {
            return responseHandler.error("speacker not found", 404);
        }
        removeFile(speacker.image);
        const event = await EventModule.getById(speacker.eventId);
        if (event) {
            event.speakers.pull(speacker._id);
            await event.save();
        }
        return responseHandler.success(speacker, "speacker Deleted Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

const updateSpeackerImage = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const img = normalizePath(req.file.path);
        const speacker = await SpeackerModule.updateSpeackerImage(req.params.id, img);
        return responseHandler.success(speacker, "speacker Updated Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

const getById = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const speacker = await SpeackerModule.getById(req.params.id);
        if (!speacker) {
            return responseHandler.error("speacker not found", 404);
        }
        return responseHandler.success(speacker, "speacker Feched Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

const getByEventId = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const speackers = await SpeackerModule.getByEventId(req.params.id);
        return responseHandler.success(speackers, "speackers Feched Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}


module.exports = {
    getById,
    create,
    update,
    deleteById,
    updateSpeackerImage,
    getByEventId
}