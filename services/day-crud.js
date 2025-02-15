const Day = require("../models/day");
const IndexCrud = require("./index-crud");

class DayCrud extends IndexCrud {
    constructor() {
        super(Day)
    }

}

module.exports = DayCrud
