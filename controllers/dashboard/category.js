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

module.exports = { createCategory, getAllCategories };