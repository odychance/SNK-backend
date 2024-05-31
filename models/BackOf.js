const mongoose = require('mongoose');

const BackOfSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgRef: {
        type: String,
        trim: true
        // required: true,
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

module.exports = mongoose.model('BackOf', BackOfSchema)