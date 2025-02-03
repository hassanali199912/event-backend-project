const Sponsers = require("../models/sponsers");
const IndexCrud = require("./index-crud");



class SponsersCrud extends IndexCrud {
    constructor() {
        super(Sponsers);
    }
    async changeVisablity(id) {
        const document = await this.model.findById(id);

        const updatedDocument = await this.model.findByIdAndUpdate(
            id,
            { $set: { active: !document.active } },
            { new: true }
        );

        return updatedDocument;

    }


}


module.exports = SponsersCrud;