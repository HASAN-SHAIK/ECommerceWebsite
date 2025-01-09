const express = require('express');
const router = express.Router();
const { getOrders, updateOrder, getAllOrders, addOrder } = require('../controllers/orderController');

router.get('/', getAllOrders);
router.get('/:id', getOrders);
router.post('/addorder/:id', addOrder);
router.post('/update', updateOrder);

module.exports = router;

