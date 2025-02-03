const Event = require("../models/event");
const IndexCrud = require("./index-crud");

class EventCrud extends IndexCrud {
    constructor() {
        super(Event);
    }
    async getAll() {
        return await Event.find().populate("userId",{
            fname:1,
            lname:1,
            email:1,
        });
    }
    async getById(id) {
        return await Event.findById(id).populate("userId",{
            fname:1,
            lname:1,
            email:1,
        });
    }
}

module.exports = EventCrud;