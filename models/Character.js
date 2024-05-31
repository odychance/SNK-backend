const mongoose = require('mongoose');

const CharacterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    titan: {
        type: String,
        required: false,
        trim: true,
    },
    skills: {
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
        ref: 'Admin'
    },
    created: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('Character', CharacterSchema)