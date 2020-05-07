import mongoose from "mongoose";

const Schema = mongoose.Schema;

let EnterpriseREQ = new Schema({
    name: {
        type: String
    },
    abb: {
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
    foundation_date: {
        type: String
    },
    place: {
        type: String
    },
    mail: {
        type: String
    },
    postman: {
        type: Number
    }
});

const enterpriseDB = mongoose.connection.useDb("enterprises");

module.exports = enterpriseDB.model("EnterpriseREQ" , EnterpriseREQ, "enterprisesREQ");