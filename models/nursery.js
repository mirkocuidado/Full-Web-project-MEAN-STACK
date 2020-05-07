import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Nursery = new Schema({
    name: {
        type: String
    },
    place: {
        type: String
    },
    username: {
        type: String
    },
    length: {
        type: Number
    },
    width: {
        type: Number
    },
    temperature: {
        type: Number
    },
    water: {
        type: Number
    },
    placeTaken:{
        type: Number
    },
    flag:{
        type: String
    }
});

const nurseryDB = mongoose.connection.useDb("farmers");

module.exports = nurseryDB.model("Nursery" , Nursery, "nurseries");