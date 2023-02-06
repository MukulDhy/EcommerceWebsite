const express = require('express');
const router = express.Router();
const {addOrderItem} = require('../controller/placeOrderController');
const { protected } = require('../middlewares/authMiddleware');

router.route('/').post(protected,addOrderItem);

module.exports = router;