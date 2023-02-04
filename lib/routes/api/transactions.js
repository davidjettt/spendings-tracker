const express = require('express')
const router = express.Router()
const { Transaction } = require('../../models')


router.get('/', async (req, res, next) => {
    const transactions = await Transaction.findAll()
    return res.json(transactions)
})


router.post('/', async (req, res, next) => {
    const { name, category, amount } = req.body

    const newTransaction = await Transaction.create({
        name,
        category,
        amount
    })

    return res.json(newTransaction)
})


module.exports = router
