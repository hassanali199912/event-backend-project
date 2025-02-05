const Categories = require("../models/category");
const IndexCrud = require("./index-crud");

class Category extends IndexCrud {
    constructor() {
        super(Categories);
    }

}

module.exports = Category;