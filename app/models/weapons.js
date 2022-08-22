// import dependencies
const mongoose = require('mongoose')


const weaponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    isSharp: {
        type: Boolean,
        default: false,
        required: true
    },
    condition: {
        type: String,
        
        enum: ['new', 'used', 'powerful'],
        default: 'new'
    }
}, {
    timestamps: true
})

module.exports = weaponSchema