const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [
        {
            productId: {type: mongoose.Types.ObjectId, ref: 'Product'},
            quantity: Number
        }
    ],
    updatedDate: { type: Date, default: Date.now}
});


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;