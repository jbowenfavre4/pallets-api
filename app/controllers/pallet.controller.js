const Pallet = require('../models/pallet.model.js')
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'content cannot be empty'
        })
    }
    const pallet = new Pallet({
        palletName: req.body.palletName,
        purchasePrice: req.body.purchasePrice,
        purchaseDate: req.body.purchaseDate
    })
    Pallet.create(pallet, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'An error occurred.'
            })
        } else res.send(data)
    })
}

exports.findAll = (req, res) => {
    const palletName = req.query.palletName
    Pallet.getAll(palletName, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'an error occurred.'
            })
        } else {
            res.send(data)
        }
    })
}

exports.findAllActve = (req, res) => {
    const palletName = req.query.palletName
    Pallet.getAllActive(palletName, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'an error occurred.'
            })
        } else {
            res.send(data)
        }
    })
}

exports.getDropdownInfo = (req, res) => {
    Pallet.getDropDownInfo((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'an error occured'
            })
        } else {
            res.send(data)
        }
    })
}

exports.findOne = (req, res) => {
    Pallet.findOne(req.params.palletId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'An error occurred.'
            })
        } else res.send(data)
    })
}