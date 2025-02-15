const bcrypt = require("bcrypt")
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["CODEMODE", "CODEHASH"],
        default: "CODEHASH"
    },
    phone: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    }

}, { timeseries: true });


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 12);
    next();
})
userSchema.methods.comparePassword = async function (oldPass) {
    return bcrypt.compare(oldPass, this.password);
}
userSchema.methods.generateToken = async function () {
    return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
}


module.exports = mongoose.model("User", userSchema);