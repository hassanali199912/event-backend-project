const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    
    time: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    speaker: [
        {
            type: Schema.Types.ObjectId,
            ref: "Speaker",
        }
    ]

}, { timestamps: true });


module.exports = mongoose.model("Session", sessionSchema)