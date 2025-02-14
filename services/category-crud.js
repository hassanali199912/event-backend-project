const Categories = require("../models/category");
const IndexCrud = require("./index-crud");

class Category extends IndexCrud {
    constructor() {
        super(Categories);
    }
    
    async changeVisablity  (id) {
        const document = await this.model.findById(id);
    
        const updatedDocument = await this.model.findByIdAndUpdate(
            id,
            { $set: { status: !document.status } },
            { new: true }
        );
    
        return updatedDocument;
    
    }

}

module.exports = Category;