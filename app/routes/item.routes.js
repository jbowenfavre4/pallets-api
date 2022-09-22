module.exports = app => {
    const items = require('../controllers/item.controller.js')
    var router = require('express').Router()
    const { body, validationResult } = require('express-validator')

    router.post('/', 
        body('itemName', 'item name cannot be empty').notEmpty(),
        body('itemPrice', 'item price must be a valid number above 0').notEmpty().isNumeric(),
        function(req, res) {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            try {
                items.create(req, res)
            }
            catch(err) {
                res.send(err)
            }
        })
        
    router.get('/', items.findAll)
    router.get('/pallet/:palletId', items.findItemsInPallet)
    router.put('/:itemId',
        body('itemName', 'item name cannot be empty').notEmpty(),
        body('itemPrice', 'item price must be a valid number above 0').notEmpty().isNumeric(),
        function(req, res) {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            try {

                items.editItem(req, res)
            }
            catch(err) {
                res.send(err)
            }
        })
    router.get('/:itemId', items.getItem)
    router.get('/category/:categoryId', items.findItemsByCategory)

    app.use('/items', router)
}