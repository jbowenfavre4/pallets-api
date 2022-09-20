module.exports = app => {
    const categories = require('../controllers/category.controller.js')
    var router = require('express').Router()
    const { body, validationResult } = require('express-validator')

    router.post('/', 
        body('categoryName', 'category name required').notEmpty(),
        function(req, res) {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            try {
                categories.create(req, res)
            }
            catch(err) {
                res.send(err)
            }
        })
    router.get('/', categories.findAll)
    router.delete('/',
        body('categoryId', 'category ID required').notEmpty(),
        function(req, res) {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            try {
                categories.delete(req, res)
            }
            catch(err) {
                res.send(err)
            }
        })
    router.get('/dropdown', categories.getDropdownInfo)

    app.use('/categories', router)
    
}