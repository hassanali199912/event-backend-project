const ResponseHandler = require("../../utils/ResponseHandler");
const DayCrud_crud = require("../../services/day-crud");
const DayModule = new DayCrud_crud();
const EventCrud_crud = require("../../services/event-crud");
const EvevntModule = new EventCrud_crud();

const SessionCrud_crud = require("../../services/session");
const SessionModule = new SessionCrud_crud();

const SpeakerCrud_crud = require("../../services/speacker-crud");
const SpeakerModule = new SpeakerCrud_crud();


const createDay = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const { eventId, order, date } = req.body;
        const event = await EvevntModule.getById(eventId);
        if (!event) {
            return responseHandler.error("Event not found", 404);
        }
        const day = await DayModule.create(req.body);
        return responseHandler.success(day, "Day Created Successfully", 201);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}
const updateDay = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const { eventId, order, date } = req.body;
        const event = await EvevntModule.getById(eventId);
        const day = await DayModule.getById(req.params.id);
        if (!event) {
            return responseHandler.error("Event not found", 404);
        }
        if (!day) {
            return responseHandler.error("Day not found", 404);
        }


        const dayUpdate = await DayModule.update(req.params.id, req.body);
        return responseHandler.success(dayUpdate, "Day Updated Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

const deleteDay = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const day = await DayModule.getById(req.params.id);
        if (!day) {
            return responseHandler.error("Day not found", 404);
        }
        const dayDelete = await DayModule.delete(req.params.id);
        return responseHandler.success(dayDelete, "Day Deleted Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

const getAlldaysByEventId = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const event = await EvevntModule.getById(req.params.id);
        if (!event) {
            return responseHandler.error("Event not found", 404);
        }
        const days = await DayModule.filterBy({ eventId: req.params.id });
        return responseHandler.success(days, "Days Fetched Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}





const createSession = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const { dayId, time, title, description, speaker } = req.body;
        const day = await DayModule.getById(dayId);
        if (!day) {
            return responseHandler.error("Day not found", 404);
        }

        const speakers = await SpeakerModule.filterBy({
            _id: { $in: speaker }
        });
        if ( speakers.length !== speaker.length) {
            return responseHandler.error("Speaker not found", 404);
        }

        const session = await SessionModule.create({
            time,
            title,
            description,
            speaker
        });
        await DayModule.update(dayId, {
            $push: {
                sessions: session._id
            }
        });

        return responseHandler.success(session, "Session Created Successfully", 201);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}




module.exports = {
    createDay,
    updateDay,
    deleteDay,

    createSession,


    getAlldaysByEventId
}