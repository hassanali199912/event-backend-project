const ResponseHandler = require("../../utils/ResponseHandler");
const SeatsCrud_crud = require("../../services/seats-crud");
const SeatModule = new SeatsCrud_crud();



const create = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const seat = await SeatModule.create(req.body);
        return responseHandler.success(seat, "Seat created successfully", 201);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

const getAll = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const seat = await SeatModule.filterBy({ eventId: req.params.id });
        return responseHandler.success(seat, "Seat fetched successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

const updateSteat = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const seat = await SeatModule.update(req.params.id, req.body);
        return responseHandler.success(seat, "Seat updated successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}
const deleteSteat = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const seat = await SeatModule.delete(req.params.id);
        return responseHandler.success(seat, "Seat deleted successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

module.exports = { create, getAll, updateSteat, deleteSteat };