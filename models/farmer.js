import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Farmer = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
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
    birth_date: {
        type: String
    },
    place: {
        type: String
    },
    mobile: {
        type: String
    },
    mail: {
        type: String,
        unique: true
    }
});

const farmerDB = mongoose.connection.useDb("farmers");

module.exports = farmerDB.model("Farmer" , Farmer, "farmers");