const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    schedule: {
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        doorTime: {
            type: String,
            required: true,
        },
    },
    images: {
        main: {
            type: String,
            required: false,
        },
        secondary: {
            type: String,
            required: false,
        },
        layout: {
            type: String,
            required: false,
        },
    },
    locationDetails: {
        location: {
            type: String,
            required: true,
        },
        venue: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    contactInfo: {
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        fax: {
            type: String,
            required: false,
        },
        website: {
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
    },
    status: {
        type: String,
        required: true,
        enum: ['Showing', 'Cancelled', 'Postponed'],
        default: 'Showing',
    },
    price: {
        type: String,
        required: true,
    },
    totalTickets: {
        type: Number,
        required: true,
    },
    organizer: {
        type: [String],
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    map: {
        src: {
            type: String,
            required: false,
            default: ""
        },
        lat: {
            type: String,
            required: false,
            default: ""
        },
        lng: {
            type: String,
            required: false,
            default: ""
        }
    },
    speakers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Speaker',
    }],
    agenda: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Day',
    }],

    // active or visbality
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
    sliderActive: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});


module.exports = mongoose.model("Event", eventSchema);