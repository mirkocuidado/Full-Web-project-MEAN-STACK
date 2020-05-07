import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Admin = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    confirm_password: {
        type: String
    }
});

const adminDB = mongoose.connection.useDb("administrator");

module.exports = adminDB.model("Admin" , Admin, "admin");