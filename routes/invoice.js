const express = require('express')
const router = express.Router()
const { postInvoice } = require('../controllers/invoice')
const auth = require('../middlewares/auth')

router.route('/invoice').post(auth, postInvoice)

module.exports = router