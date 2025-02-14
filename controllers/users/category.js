const ResponseHandler = require("../../utils/ResponseHandler");
const CategoriesCrud_crud = require("../../services/category-crud");
const CategoriesModule = new CategoriesCrud_crud();


const getAllCategories = async (req, res) => {    
    const responseHandler = new ResponseHandler(res);
    try {
        const categories = await CategoriesModule.filterByAndSelect({status: true}, 'name -_id');
        console.log(categories);
        
        return responseHandler.success(categories, "Categories Feched Successfully", 200);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}


module.exports = {
    getAllCategories
}