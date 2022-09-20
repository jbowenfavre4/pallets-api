const sql = require('./db.js')
const Pallet = function(pallet) {
    this.palletName = pallet.palletName
    this.purchaseDate = pallet.purchaseDate
    this.purchasePrice = pallet.purchasePrice
}

Pallet.create = (newPallet, result) => {
    sql.query('INSERT INTO pallets SET ?', newPallet, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        console.log('created pallet: ', { id: res.insertId, ...newPallet })
        result(null, { id: res.insertId, ...newPallet })
    })
}

Pallet.getAll = (palletName, result) => {
    let query = `SELECT * FROM pallets`
    if (palletName) {
        query += ` WHERE palletName LIKE '%${palletName}%'`
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null, err)
            return
        }
        console.log('pallets: ', res)
        result(null, res)
    })
}

Pallet.getAllActive = (palletName, result) => {
    let query = `SELECT * FROM pallets WHERE active = true`
    if (palletName) {
        query += ` AND WHERE palletName LIKE '%${palletName}%'`
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null, err)
            return
        }
        console.log('active pallets: ', res)
        result(null, res)
    })
}

Pallet.getDropDownInfo = (result) => {
    let query = `SELECT palletId, palletName FROM pallets`
    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }
        console.log('dd info: ', res)
        result(null, res)
    })
}

Pallet.findOne = (palletId, result) => {
    sql.query(`SELECT * FROM pallets WHERE palletId = "${palletId}"`, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result (err, null)
            return
        }
        if (res.length) {
            console.log('found pallet: ', res[0])
            result(null, res[0])
            return
        }
        result('no pallet found', null)
        return
    })
}
module.exports = Pallet