const ResponseHandler = require("../../utils/ResponseHandler");
const SponsersCrud_crud = require("../../services/sponsers-crud");
const SponsersModule = new SponsersCrud_crud();


const getAll = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const sponsers = await SponsersModule.filterBy({active:true});
        if (!sponsers) {
            return responseHandler.error("Sponsers not found", 404);
        }
        return responseHandler.success(sponsers, "Sponsers Feched Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}



module.exports = { getAll}    