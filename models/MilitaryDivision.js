const mongoose = require('mongoose')

const MilitaryDivisionSchema = mongoose.Schema({
    division: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true
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
        default: Date.now()
    }
})

module.exports = mongoose.model('MilitaryDivision', MilitaryDivisionSchema)