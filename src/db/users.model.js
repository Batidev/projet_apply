/**
 * Modélisation de la table users
 * sur la BDD mongoDB
 */

const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    pro: {
        type: Boolean
    }
})

const users = mongoose.model('users', usersSchema)

module.exports = users