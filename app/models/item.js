
const mongoose = require('mongoose')

//const weaponSchema = require('./weapons')

const { Schema, model } = mongoose

const itemSchema = new Schema(
    {
        item: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        new: {
            type: Boolean,
            required: true
        },
        //weapons: [weaponSchema],
        owner: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
    }, {
        timestamps: true,

        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
)


itemSchema.virtual('fullTitle').get(function () {
    
    return `${this.name} the ${this.type}`
})

itemSchema.virtual('isaKid').get(function () {
    if (this.age < 10) {
        return "he is a kid"
    } else if (this.age >= 10 && this.age < 20) {
        return "he is a teenager"
    } else {
        return "more old more estrong item is"
    }
})

module.exports = model('Item', itemSchema)