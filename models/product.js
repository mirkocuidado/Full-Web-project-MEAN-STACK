import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Product = new Schema({
    name: {
        type: String
    },
    enterprise: {
        type: String
    },
    ownerUsername: {
        type: String
    },
    speed: {
        type: Number
    },
    qHave: {
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
    tip:{
        type: String
    },
    given:{
        type: Number
    },
    storage:{
        type: String
    }
});

const productDB = mongoose.connection.useDb("enterprises");

module.exports = productDB.model("Product" , Product, "products");