const ResponseHandler = require("../../utils/ResponseHandler");
const DayCrud_crud = require("../../services/day-crud");
const DayModule = new DayCrud_crud();


const createDay = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const day = await DayModule.create(req.body);
        return responseHandler.success(day, "Day Created Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}
