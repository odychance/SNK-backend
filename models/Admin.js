const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    admin: {
        type: String,
        default: "si",
        // required: true,
        trim: true,
    },
    created: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('Admin', AdminSchema)