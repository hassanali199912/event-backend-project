const Event = require("../models/event");
const IndexCrud = require("./index-crud");

class EventCrud extends IndexCrud {
    constructor() {
        super(Event);
    }
    async getAll() {
        return await this.getAllPopulat([
            {
                path: "userId",
                select: "fname lname email",
            },
            {
                path: "category",
                ref: "Category",
                select: "name"
            },
            {
                path: "speakers",
            }
        ]);
    }
    async getById(id) {
        return await this.getByIdPopulat(id,
            [
                {
                    path: "userId",
                    select: "fname lname email",
                },
                {
                    path: "category",
                    ref: "Category",
                    select: "-_id name"
                },
                {
                    path: "speakers",
                }
            ])




    }
}

module.exports = EventCrud;