const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const invoiceSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    description: String,
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: moment().format("ll")
    }
})

const Invoice = mongoose.model('invoice', invoiceSchema)

module.exports = Invoice