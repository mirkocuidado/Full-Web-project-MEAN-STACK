import mongoose from "mongoose";

const Schema = mongoose.Schema;

let FarmerREQ = new Schema({
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
        type: String
    }
});

const farmerDB = mongoose.connection.useDb("farmers");

module.exports = farmerDB.model("FarmerREQ" , FarmerREQ, "farmersREQ");