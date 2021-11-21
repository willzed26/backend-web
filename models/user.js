const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    github: {
        type: String,
        unique: true,
    },
    instagram: {
        type: String,
        unique: true,
    },
    facebook: {
        type: String,
        unique: true,
    },
    country: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
var git = {'github': req.user.github}

module.exports = mongoose.model("User", userSchema, 'account');