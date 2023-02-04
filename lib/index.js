const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./models')
const {Transaction} = require('./models')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

db.sequelize.sync()
    .then(() => {
        console.log('Synced db')
    })
    .catch((err) => {
        console.log('Failed to sync db' + err.message)
    })


app.post('/api/transactions', async (req, res, next) => {
    const { name, category, amount, userId } = req.body

    const newTransaction = await Transaction.create({
        name,
        category,
        amount,
        userId
    })

    return res.json(newTransaction)
})

app.get('/', (req, res) => {
    res.json({message: 'Testing'})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
