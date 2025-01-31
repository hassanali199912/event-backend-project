const Event = require("../models/event");
const IndexCrud = require("./index-crud");

class EventCrud extends IndexCrud {
    constructor() {
        super(Event);
    }
}

module.exports = EventCrud;