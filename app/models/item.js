
import jacket from '../imgs store/jacket.jpeg'
import pants from '../imgs store/pants.jpeg'
import shorts from '../imgs store/shorts.jpeg'
import tshirt from '../imgs store/tshirt.jpeg'

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
        //here is the where to select the image to the type of item
        itemtype: {
            type: Image,
            enum:[pants, jacket, shorts, tshirt]

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