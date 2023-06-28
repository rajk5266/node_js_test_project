const express = require('express')
const router = express.Router()

const appcontroller = require('../controllers/main')
router.get('/', appcontroller.showhtmlfile)

router.get('/endpoint', appcontroller.showproduct)

router.post('/endpoint', appcontroller.addproduct)

router.put('/endpoint/:productId', appcontroller.updatequantity)

// router.delete('/actionendpoint/:expenseID', appcontroller.deleteExpense)

module.exports = router