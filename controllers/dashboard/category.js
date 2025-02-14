const ResponseHandler = require("../../utils/ResponseHandler");
const CategoryCrud_crud = require("../../services/category-crud");
const CategoryModule = new CategoryCrud_crud();



const createCategory = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const category = await CategoryModule.create(req.body);
        return responseHandler.success(category, "Category created successfully", 201);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

const getAllCategories = async (req, res) => {    
    const responseHandler = new ResponseHandler(res);
    try {
        const categories = await CategoryModule.getAll();
        return responseHandler.success(categories, "Categories Feched Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

const getById = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const category = await CategoryModule.getById(req.params.id);
        return responseHandler.success(category, "Category Feched Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}    


const updateCategory = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const category = await CategoryModule.update(req.params.id, req.body);
        return responseHandler.success(category, "Category Updated Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}

const deleteCategory = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const category = await CategoryModule.delete(req.params.id);
        return responseHandler.success(category, "Category Deleted Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}


const changeVisablity = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const category = await CategoryModule.changeVisablity(req.params.id);
        return responseHandler.success(category, "Category Updated Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}




module.exports = { 
    createCategory,
    getAllCategories,
    getById,
    updateCategory,
    deleteCategory,
    changeVisablity
     };