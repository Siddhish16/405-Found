const mongoose = require("mongoose");

const studentRegistration = new mongoose.Schema({

    txt: {
        type: String,
        required: true
    },
    email: {
        type: String,

    },
    pswd: {
        type: String,
        unique: true
    },
    user: {
        type: String

    },
    userPass: {
        type: String
    },
    hashTran: {
        type: String
    },
    fullName: {
        type: String
    },
    hashPass: {
        type: String
    },
    hashMark: {
        type: String
    },
    Grad: {
        type: String
    },
    Course: {
        type: String
    },
    Stream: {
        type: String
    },
    DOB: {
        type: String
    }






})

module.exports = mongoose.model("Register", studentRegistration);