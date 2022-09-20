const Category = require('../models/category.model.js')
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'content cannot be empty'
        })
    }
    const category = new Category({
        categoryName: req.body.categoryName
    })
    console.log(category)

    Category.create(category, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'An error occurred.'
            })
        } else res.send(data)
    })
}

exports.findAll = (req, res) => {
    Category.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'an error occurred.'
            })
        } else {
            res.send(data)
        }
    })
}

exports.delete = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'content cannot be empty'
        })
    }
    Category.delete(req.body.categoryId, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || 'an error occurred'
            })
        } else {
            console.log(data)
            res.send(data)
        }
    })
}

exports.getDropdownInfo = (req, res) => {
    Category.getDropdownInfo((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'an error occured'
            })
        } else {
            res.send(data)
        }
    })
}