const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema({
    eventId : {
        type: Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    order:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    sessions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Session",
        }
    ]
},{timestamps: true});

module.exports = mongoose.model("Day", daySchema);