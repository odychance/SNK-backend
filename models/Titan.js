const mongoose = require('mongoose');

const TitanSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    host: {
        type: String,
        required: true,
    },
    skill: {
        type: String,
        required: true,
        trim: true,
    },
    history: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
    },
    created: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('Titan', TitanSchema)