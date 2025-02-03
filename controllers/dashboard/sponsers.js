const ResponseHandler = require("../../utils/ResponseHandler");
const SponsersCrud_crud = require("../../services/sponsers-crud");
const SponsersModule = new SponsersCrud_crud();
const { normalizePath, removeFile } = require("../../utils/FileHelper");


const createSponsers = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const spons_image = req.file;

        if (!spons_image) {
            return responseHandler.error("Sponsers image is required", 400);
        }


        const sponsers = await SponsersModule.create({
            image: normalizePath(spons_image.path),
            active: false
        });
        if (!sponsers) {
            return responseHandler.error("Sponsers not found", 404);
        }
        return responseHandler.success(sponsers, "Sponsers Created Successfully", 201);
    } catch (error) {
    }
}

const getAll = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const sponsers = await SponsersModule.getAll();
        if (!sponsers) {
            return responseHandler.error("Sponsers not found", 404);
        }
        return responseHandler.success(sponsers, "Sponsers Feched Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}
const getById = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const sponsers = await SponsersModule.getById(req.params.id);
        if (!sponsers) {
            return responseHandler.error("Sponsers not found", 404);
        }
        return responseHandler.success(sponsers, "Sponsers Feched Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}
const deleteById = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const sponsers = await SponsersModule.delete(req.params.id);
        if (!sponsers) {
            return responseHandler.error("Sponsers not found", 404);
        }
        return responseHandler.success(sponsers, "Sponsers Deleted Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}



const changeVisablity = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const sponsers = await SponsersModule.changeVisablity(req.params.id);
        if (!sponsers) {
            return responseHandler.error("Sponsers not found", 404);
        }
        return responseHandler.success(sponsers, "Sponsers Updated Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}


module.exports = { changeVisablity, createSponsers, getAll, getById, deleteById, }    