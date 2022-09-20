const express = require('express')
const cors = require('cors')
const app = express()
// var corsOptions = {
//     origin: "http://localhost:8081",

// }
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.json({ message: 'welcome to the bfd api.'})
})
require('./app/routes/pallet.routes')(app)
require('./app/routes/item.routes')(app)
require('./app/routes/category.routes')(app)
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})