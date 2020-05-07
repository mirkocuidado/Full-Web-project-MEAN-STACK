import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Offer = new Schema({
    name: {
        type: String
    },
    enterprise: {
        type: String
    },
    speed: {
        type: Number
    },
    qAvailable: {
        type: Number
    },
    grade:{
        type: Number
    },
    price:{
        type: Number
    },
    numOfGrades:{
        type: Number
    },
    tip:{
        type: String
    },
    flag:{
        type: Boolean
    }
});

const offerDB = mongoose.connection.useDb("enterprises");

module.exports = offerDB.model("Offer" , Offer, "offers");