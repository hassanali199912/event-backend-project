const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["chair", "table"],
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "reserved", "sold"],
        default: "available"
    },
    position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    capacity: {
        type: Number,
        required: true
    },
    reservedSeates: {
        type: Number,
        default: 0
    },
    reservedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    createdAt: { type: Date, default: Date.now }
});

const Seat = mongoose.model("Seat", SeatSchema);
module.exports = Seat;
