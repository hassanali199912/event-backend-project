const Event = require("../models/event");
const IndexCrud = require("./index-crud");

class EventCrud extends IndexCrud {
    constructor() {
        super(Event);
    }
    async getAll() {
        return await Event.find().populate([
            {
                path: "userId",
                select: "fname lname email",
            },
            {
                path: "speakers",
            }
        ]);
    }
    async getById(id) {
        return await Event.findById(id).populate([
            {
                path: "userId",
                select: "fname lname email",
            },
            {
                path: "speakers",
            }
        ]);
    }
}

module.exports = EventCrud;