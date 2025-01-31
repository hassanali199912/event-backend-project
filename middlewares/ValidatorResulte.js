const { validationResult } = require("express-validator");
const ResponseHandler = require("../utils/ResponseHandler");



const ValidateResultes = async (req, res, next) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseHandler.error("Invalid Data", 401, errors.array());
        }
        return next();
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }

}

module.exports = ValidateResultes;