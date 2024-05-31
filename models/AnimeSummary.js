const mongoose = require('mongoose');

const AnimeSummarySchema = mongoose.Schema({
    season: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    },
    resume: {
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

module.exports = mongoose.model('AnimeSummary', AnimeSummarySchema)