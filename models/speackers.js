const mongoose = require('mongoose');


const speakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    socialMedia: {
        facebook: {
            type: String,
            required: false,
        },
        twitter: {
            type: String,
            required: false,
        },
        instagram: {
            type: String,
            required: false,
        },
    },
    eventId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    }

}, {  timestamps: true });

module.exports = mongoose.model('Speaker', speakerSchema);
