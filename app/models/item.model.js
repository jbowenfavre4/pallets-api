const sql = require('./db.js')
const Item = function(item) {
    this.itemName = item.itemName
    this.itemDescription = item.itemDescription
    this.palletId = item.palletId
    this.itemPrice = item.itemPrice
    this.sold = item.sold
    this.category = item.category
    this.sellDate = item.sellDate
    this.sellPrice = item.sellPrice
    this.platform = item.platform
    this.shippingCost = item.shippingCost
    this.miscExpenses = item.miscExpenses
    this.listDate = item.listDate
}

Item.create = (newItem, result) => {
    sql.query('INSERT INTO items SET ?', newItem, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        console.log('created item: ', { id: res.insertId, ...newItem })
        result(null, { id: res.insertId, ...newItem })
    })
}

Item.getAll = (itemName, result) => {
    let query = `SELECT * FROM items`
    if (itemName) {
        query += ` WHERE itemName LIKE '%${itemName}%'`
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }
        result(null, res)
    })
}

Item.getItemsInPallet = (palletId, result) => {
    let query = `SELECT * FROM items WHERE palletId = ${palletId}`
    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        console.log(`found ${res.length} items`)
        result(null, res)
    })
}

Item.getItemsByCategory = (categoryId, result) => {
    let query = `SELECT * FROM items WHERE category = '${categoryId}'`
    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        console.log(`found ${res.length} items`)
        result(null, res)
    })
}

Item.getItem = (itemId, result) => {
    let query = `SELECT * FROM items WHERE itemId = '${itemId}'`
    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: err')
            result(null, err)
            return
        }
        result(null, res)
    })
}

Item.editItem = (itemId, item, result) => {
    sql.execute(`UPDATE items SET itemName = ?, 
    itemDescription = ?, 
    palletId = ?, 
    itemPrice = ?, 
    sold = ?, 
    category = ?, 
    sellDate = ?, 
    sellPrice = ?, 
    platform = ?,
    listDate = ?,
    shippingCost = ?,
    miscExpenses = ?
    WHERE itemId = ?`,
    [item.itemName, item.itemDescription, item.palletId, item.itemPrice, item.sold, item.category, item.sellDate, item.sellPrice, item.platform, item.listDate, item.shippingCost, item.miscExpenses, itemId],
    (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }
        if (res.affectedRows === 0) {
            result('not found', null)
            return
        }
        result(null, {id: itemId, ...item})
    })
}

module.exports = Item