const express = require('express');
const router = express.Router();
const { updateWishlist, getWishlist } = require('../controllers/wishlistController');

router.post('/updateWishlist/:id', updateWishlist)
router.get('/:id', getWishlist);

module.exports = router;