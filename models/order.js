import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Order = new Schema({
    username: {
        type: String
    },
    amount: {
        type: Number
    },
    name:{
        type: String
    },
    items:{
        type: Array
    },
    time:{
        type: Date
    },
    enterprise:{
        type: String
    },
    flag: {
        type: Boolean
    }
});

const orderDB = mongoose.connection.useDb("farmers");

module.exports = orderDB.model("Order" , Order, "orders");