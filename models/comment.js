import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Comment = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    enterprise: {
        type: String
    },
    text: {
        type: String
    },
    grade:{
        type: Number
    },
    users:{
        type: Array
    }
});

const CommentDB = mongoose.connection.useDb("farmers");

module.exports = CommentDB.model("Comment" , Comment, "comments");