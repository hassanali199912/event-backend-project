const Session = require("../models/session");
const IndexCrud = require("./index-crud");

class SessionCrud extends IndexCrud {
    constructor() {
        super(Session)
    }

  
}

module.exports =  SessionCrud