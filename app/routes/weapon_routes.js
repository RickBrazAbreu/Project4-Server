const express = require('express')
const passport = require('passport')

// pull in Mongoose model for items
const Item = require('../models/item')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// ROUTES GO HERE
// we only need three, and we want to set them up using the same conventions as our other routes, which means we might need to refer to those other files to make sure we're using our middleware correctly

// POST -> create a weapon
// POST /weapons/<item>
router.post('/weapons/:itemId', removeBlanks, (req, res, next) => {
    // get our weapon from req.body
    const weapon = req.body.weapon
    // get our item's id from req.params.itemId
    const itemId = req.params.itemId
    // find the item
    Item.findById(itemId)
        .then(handle404)
        .then(item => {
            console.log('this is the item', item)
            console.log('this is the weapon', weapon)

            // push the weapon into the item's weapons array
            item.weapons.push(weapon)

            // save the item
            return item.save()
            
        })
        // send the newly updated item as json
        .then(item => res.status(201).json({ item: item }))
        .catch(next)
})

// UPDATE a weapon
// PATCH /weapons/<item_id>/<weapon_id>
router.patch('/weapons/:itemId/:weaponId', requireToken, removeBlanks, (req, res, next) => {
    // get the weapon and the item ids saved to variables
    const itemId = req.params.itemId
    const weaponId = req.params.weaponId

    // find our item
    Item.findById(itemId)
        .then(handle404)
        .then(item => {
            // single out the weapon (.id is a subdoc method to find something in an array of subdocs)
            const theWeapon = item.weapons.id(weaponId)
            // make sure the user sending the request is the owner
            requireOwnership(req, item)
            // uitempdate the weapon with a subdocument method
            theWeapon.set(req.body.weapon)
            // return the saved item
            return item.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE a weapon
// DELETE /weapons/<item_id>/<weapon_id>
router.delete('/weapons/:itemId/:weaponId', requireToken, (req, res, next) => {
    // get the weapon and the item ids saved to variables
    const itemId = req.params.itemId
    const weaponId = req.params.weaponId
    // then we find the item
    Item.find(itemId)
        // handle a 404
        .then(handle404)
        // do stuff with the weapon(in this case, delete it)
        .then(item => {
            // we can get the subdoc the same way as update
            const theWeapon = item.weapons.id(weaponId)
            // require that the user deleting this weapon is the item's owner
            requireOwnership(req, item)
            // call remove on the subdoc
            theWeapon.remove()

            // return the saved item
            return item.save()
        })
        // send 204 no content status
        .then(() => res.sendStatus(204))
        // handle errors
        .catch(next)
})

// export the router
module.exports = router