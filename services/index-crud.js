
// Base CRUD operations class that can be used with any model
class BaseCRUD {
    constructor(model) {
        this.model = model;
    }
    // Create new record
    async create(data) {
        return await this.model.create(data);
    }
    // Get all records
    async getAll() {
        return await this.model.find();
    }
    // Get single record by ID
    async getById(id) {
        return await this.model.findById(id);
    }
    // Update record by ID
    async update(id, data) {
        return await this.model.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    }
    // Delete record by ID
    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async filterBy(filter) {
        return await this.model.find(filter);
    }
}


module.exports = BaseCRUD