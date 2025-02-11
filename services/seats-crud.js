const Seat = require("../models/seat");
const IndexCrud = require("./index-crud");

// Base class for CRUD operations
class Seates extends IndexCrud {
    constructor() {
        super(Seat);
    }


}



module.exports = Seates;