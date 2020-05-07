import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Warning = new Schema({
    username: {
        type: String
    },
    nursery: {
        type: String
    },
    text: {
        type: String
    },
    better: {
        type: Number
    }
});

const adminDB = mongoose.connection.useDb("farmers");

module.exports = adminDB.model("Warning" , Warning, "warnings");