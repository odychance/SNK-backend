const mongoose = require('mongoose');

const WhereToSeeSchema = mongoose.Schema({
    episode: {
        type: Number,
        required: true,
        unique: true,
    },
    season: {
        type: Number,
        required: true
    },
    synopsis: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
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

module.exports = mongoose.model('WhereToSee', WhereToSeeSchema)