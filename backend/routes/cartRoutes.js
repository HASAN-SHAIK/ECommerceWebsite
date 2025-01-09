const express = require('express');
const router = express.Router();
const { updateCart, getCart} = require('../controllers/cartController');

router.post('/updateCart/:id', updateCart)
router.get('/:id', getCart);

module.exports = router;