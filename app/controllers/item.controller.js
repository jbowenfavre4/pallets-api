const Item = require('../models/item.model.js')
const financeService = require('../services/finances.js')
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'content cannot be empty'
        })
    }
    const item = new Item({
        itemName: req.body.itemName,
        itemDescription: req.body.itemDescription,
        palletId: req.body.palletId,
        itemPrice: req.body.itemPrice,
        sold: req.body.sold,
        category: req.body.category,
        sellDate: req.body.sellDate,
        sellPrice: req.body.sellPrice,
        platform: req.body.platform,
        shippingCost: req.body.shippingCost,
        listDate: req.body.listDate,
        miscExpenses: req.body.miscExpenses
    })
    Item.create(item, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'An error occurred.'
            })
        } else res.send(data)
    })

}

exports.findAll = (req, res) => {
    const itemName = req.query.itemName
    Item.getAll(itemName, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'an error occurred.'
            })
        } else {
            res.send(data)
        }
    })
}

exports.findItemsInPallet = (req, res) => {
    Item.getItemsInPallet(req.params.palletId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'an error occurred.'
            })
        } else {
            res.send(data)
        }
    })
}

exports.findItemsByCategory = (req, res) => {
    Item.getItemsByCategory(req.params.categoryId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'an error occurred.'
            })
        } else {
            res.send(data)
        }
    })
}

exports.getProfit = (req, res) => {
    Item.getItem(req.params.itemId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'an error occurred.'
            })
        } else if (data.length != 1) {
            res.status(404).send({
                messsage: 'Item not found.'
            })
        } else {
            let thisItem = data[0]
            let itemProfit = financeService.getItemProfit(thisItem)
            res.send({
                itemId: thisItem.itemId,
                itemName: thisItem.itemName,
                itemProfit: itemProfit
            })
        }
    })
}

exports.getItem = (req, res) => {
    Item.getItem(req.params.itemId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'an error occurred.'
            })
        } else {
            res.send(data)
        }
    })
}

exports.editItem = (req, res) => {
    console.log('body : ', req.body)
    if (!req.body) {
        res.status(400).send({
            message: 'content cannot be empty'
        })
    }
    Item.editItem(req.params.itemId, new Item(req.body),
    (err, data) => {
        console.log(req.params.itemId)
        if (err) {
            res.status(500).send({
                message: 'an error occurred.'
            })
        } else res.send(data)
    })
}