import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Business = new Schema({
    username: {
        type: String
    },
    enterprise: {
        type: String
    },
    amount: {
        type: Number
    },
    date:{
        type: Date
    }
});

const BusinessDB = mongoose.connection.useDb("enterprises");

module.exports = BusinessDB.model("Business" , Business, "business");