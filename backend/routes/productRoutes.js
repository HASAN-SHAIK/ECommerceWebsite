const express = require('express');
const { getProducts, createProduct,getSearchProducts, updateProduct, deleteProduct, getProduct, getProductsByCategory } = require('../controllers/productController');
const router = express.Router();

// Get all products
router.get('/', getProducts);

router.get('/search/:value', getSearchProducts);

router.get('/category/:value', getProductsByCategory);
//Get product by Id
router.get('/:id', getProduct);

// Create a new product
router.post('/add', createProduct);

// Update a product
router.put('/update/:id', updateProduct);

// Delete a product
router.delete('/delete/:id', deleteProduct);

module.exports = router;