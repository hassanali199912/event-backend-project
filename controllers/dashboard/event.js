const ResponseHandler = require("../../utils/ResponseHandler");
const EventCrud_crud = require("../../services/event-crud");
const EventModule = new EventCrud_crud();

const sliderSelector = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {

        const event = await EventModule.getById(req.params.id);
        if (!event) {
            return responseHandler.error("Event Not Found", 404);
        }
        event.$set({
            sliderActive: !event.sliderActive || false
        });
        await event.save();

        console.log(event);

        return responseHandler.success(event, "Events Feched Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}


module.exports = {
    sliderSelector
}