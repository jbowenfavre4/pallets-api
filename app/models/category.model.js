const sql = require('./db.js')
const Category = function(category) {
    this.categoryName = category.categoryName
}

Category.create = (newCategory, result) => {
    sql.query('INSERT INTO categories SET ?', newCategory, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        console.log('created category: ', { id: res.insertId, ...newCategory })
        result(null, { id: res.insertId, ...newCategory })
    })
}

Category.getAll = (result) => {
    let query = `SELECT * FROM categories`
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null, err)
            return
        }
        console.log('categories: ', res)
        result(null, res)
    })
}

Category.delete = (categoryId, result) => {
    let query = `DELETE FROM categories WHERE categoryId = ${categoryId}`
    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }
        console.log('deleted category successfully')
        result(null, res)
    })
}

Category.getDropdownInfo = (result) => {
    let query = `SELECT categoryId, categoryName FROM categories`
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

module.exports = Category