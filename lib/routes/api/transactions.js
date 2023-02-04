const express = require('express')
const router = express.Router()
const { Transaction } = require('../../models')

router.post('/', async (req, res, next) => {
    const { name, category, amount } = req.body

    const newTransaction = await Transaction.create({
        name,
        category,
        amount
    })

    return res.json(newTransaction)
})
