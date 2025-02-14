
// Categories schema definition
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    descriptions: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: true
    }

}, { timeseries: true });


module.exports = mongoose.model('Category', categorySchema);