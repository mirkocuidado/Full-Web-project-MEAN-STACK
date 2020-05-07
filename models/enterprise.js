import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Enterprise = new Schema({
    name: {
        type: String
    },
    abb: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    confirm_password: {
        type: String
    },
    foundation_date: {
        type: String
    },
    place: {
        type: String
    },
    mail: {
        type: String,
        unique: true
    },
    postman: {
        type: Number
    }
});

const enterpriseDB = mongoose.connection.useDb("enterprises");

module.exports = enterpriseDB.model("Enterprise" , Enterprise, "enterprises");