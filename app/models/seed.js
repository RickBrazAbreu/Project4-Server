
const mongoose = require('mongoose')
const Item = require('./item')
const db = require('../../config/db')

const startItens = [
    { item: 'Tshirt', brand: 'Nike', price: 30, new: true},
    { item: 'Shorts', brand: 'Adidas', price: 15, new: true},
    { item: 'Pantss', brand: 'LuluLemon', price: 35, new: true},
    { item: 'Shoes', brand: 'Adidas', price: 55, new: true},
    { item: 'Tshirt', brand: 'LuluLemon', price: 35, new: true},
    { item: 'Shorts', brand: 'Nike', price: 54, new: true},
    { item: 'Pants', brand: 'Gucci', price: 220, new: true},
    { item: 'Chinelas', brand: 'Nike', price: 78, new: true}
]

// first we need to connect to the database
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        
        Item.deleteMany({ owner: null })
            .then(deletedItens => {
                console.log('deletedItem', deletedItens)

                Item.create(startItens)
                    .then(newItens => {
                        console.log('the new item', newItens)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })



