const Speacker = require("../models/speackers");
const BASICCRUD = require("./index-crud");
const { removeFile } = require("../utils/FileHelper");

class SpeackerCrud extends BASICCRUD {
    constructor() {
        super(Speacker);
    }
    async getByEventId(eventId) {
        const speackers = await Speacker.find({ eventId: eventId });
        return speackers;
    }

    async updateSpeackerImage(speackerId, image) {
        const speacker = await Speacker.findById(speackerId);

        if (speacker && speacker.image && speacker.image !== null && speacker.image !== image) {
            {
                removeFile(speacker.image);
            }
            speacker.image = image;
            await speacker.save();

            return speacker;
        }

    }
}
module.exports = SpeackerCrud;