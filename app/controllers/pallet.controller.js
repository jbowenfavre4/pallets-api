const Pallet = require('../models/pallet.model.js')
const Item = require('../models/item.model.js')
const financeService = require('../services/finances.js')
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
        } else if (res.length != 1) {
            res.status(404).send({
                message: 'Pallet not found.'
            })
        } else res.send(data)
    })
}

exports.getProfit = (req, res) => {
    Pallet.findOne(req.params.palletId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'An error occurred.'
            })
        } else if (data.length != 1) {
            res.status(404).send({
                message: 'Pallet not found.'
            })
        } else {
            let cost = Number(data[0].purchasePrice)
            let itemProfits = 0
            Item.getItemsInPallet(req.params.palletId, (err, items) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || 'An error occurred.'
                    })
                } else if (items.length > 0) {
                    itemProfits = financeService.getPalletProfit(items)
                } 
                res.send({
                    palletId: data[0].palletId,
                    palletProfit: Math.round((itemProfits - cost) * 100) / 100
                })
            })
        }
    })
}