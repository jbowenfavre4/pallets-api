module.exports = app => {
    const pallets = require('../controllers/pallet.controller.js')
    var router = require('express').Router()
    const { body, validationResult } = require('express-validator')

    router.post('/', 
        body('palletName', 'pallet name cannot be empty').notEmpty(),
        body('purchasePrice', 'price must be a number greater than 0').notEmpty().trim().isNumeric(),
        body('purchaseDate', 'pallet must have a purchase date').notEmpty(),
        function(req, res) {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            try {
                pallets.create(req, res)
            }
            catch(err) {
                res.send(err)
            }
        })
    router.get('/', pallets.findAll)
    router.get('/active', pallets.findAllActve)
    router.get('/dropdown', pallets.getDropdownInfo)
    router.get('/totalProfit', pallets.getTotalProfit)
    router.get('/:palletId', pallets.findOne)
    router.get('/profit/:palletId', pallets.getProfit)
    router.get('/shipping/:palletId', pallets.getShippingCost)
    
    app.use('/pallets', router)
    
    
}