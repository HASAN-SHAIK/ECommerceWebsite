const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  rating:{
    type: Number
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
}); 

const Product = mongoose.model('Product', productSchema);

module.exports = Product;