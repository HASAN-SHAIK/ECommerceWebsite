const mongoose = require('mongoose');


const wishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [
        {
            productId: { type: mongoose.Types.ObjectId, ref: 'Product' },
            quantity: Number
        }
    ],
    updatedDate: { type: Date, default: Date.now }
});


const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;