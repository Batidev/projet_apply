/**
 * Meeting document DB model
 */

const mongoose = require('mongoose')

const meetingSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    pstud: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    ppro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

const meeting = mongoose.model('meeting', meetingSchema)
module.exports = meeting