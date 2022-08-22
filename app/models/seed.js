
const mongoose = require('mongoose')
const Item = require('./item')
const db = require('../../config/db')

const startItens = [
    { name: 'Goku', type: 'Item', age: 30, strong: true},
    { name: 'Gohan', type: 'Item', age: 15, strong: true},
    { name: 'Freeza', type: 'ALien', age: 35, strong: true},
    { name: ' Vegeta', type: 'Item', age: 33, strong: true},
    { name: 'Goku', type: 'Item', age: 36, strong: true},
    { name: 'Gohan', type: 'Item', age: 54, strong: true},
    { name: 'Freeza', type: 'ALien', age: 22, strong: true},
    { name: ' Vegeta', type: 'Item', age: 378, strong: true},
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



