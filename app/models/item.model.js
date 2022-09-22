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
            result(null, err)
            return
        }
        console.log('items: ', res)
        result(null, res)
    })
}

Item.getItemsInPallet = (palletId, result) => {
    let query = `SELECT * FROM items WHERE palletId = ${palletId}`
    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
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
            result(null, err)
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
        console.log(`found item: ${res}`)
        result(null, res)
    })
}

Item.editItem = (itemId, item, result) => {
    let query_string = `UPDATE items SET itemName = '${item.itemName}', 
    itemDescription = '${item.itemDescription}', 
    palletId = '${item.palletId}', 
    itemPrice = '${item.itemPrice}', 
    sold = '${item.sold}', 
    category = '${item.category}', 
    sellDate = '${item.sellDate}', 
    sellPrice = '${item.sellPrice}', 
    platform = '${item.platform}'
    WHERE itemId = '${itemId}'`
    console.log(query_string)
    sql.query(query_string,
    (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }
        if (res.affectedRows === 0) {
            console.log('no item found')
            result('not found', null)
            return
        }
        console.log('updated item: ', {id: itemId, ...item})
        result(null, {id: itemId, ...item})
    })
}

module.exports = Item