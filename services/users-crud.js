const User = require("../models/users");
const IndexCrud = require("./index-crud");

// Base class for CRUD operations
class Users extends IndexCrud {
    constructor() {
        super(User);
    }


}



module.exports = Users;