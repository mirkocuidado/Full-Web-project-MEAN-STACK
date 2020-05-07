import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Seedling = new Schema({
    OwnerUsername: {
        type: String
    },
    name: {
        type: String
    },
    NurseryName: {
        type: String
    },
    ManufName: {
        type: String
    },
    x: {
        type: Number
    },
    y: {
        type: Number
    },
    progressFinish: {
        type: Number
    },
    progress:{
        type: Number
    }
});

const seedlingDB = mongoose.connection.useDb("farmers");

module.exports = seedlingDB.model("Seedling" , Seedling, "Seedling");