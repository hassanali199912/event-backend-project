const mongoose = require("mongoose");

const sponsersSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },

})


module.exports = mongoose.model("Sponsers", sponsersSchema)