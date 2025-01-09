const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product')
const getCompleteProductDetails = require('./productController');
// Helper function to update the cart with error handling
const updateWishlistHelper = async (products, userId) => {
    try {
        const result = await Wishlist.updateOne({ userId }, { products: products });
        if (result.modifiedCount > 0) {
            return { success: true, message: "Wishlist Updated Successfully" };
        } else {
            return { success: false, message: "No changes made to the cart" };
        }
    } catch (error) {
        return { success: false, message: "Error updating cart", error: error.message };
    }
};

// Route handler to update cart
const updateWishlist = async (req, res) => {
    try {
        const { products } = req.body;
        const productIds = products.map((product) => {
            return { productId: product._id, quantity: product.quantity };
        })
        const response = await updateCartHelper(productIds, req.params.id);

        if (response.success) {
            res.status(200).json(response);
        } else {
            res.status(400).json(response);
        }
    } catch (err) {
        res.status(500).json({ message: "Server Error: Unable to update cart", error: err.message });
    }
};

// Route handler to get cart and optionally update with new products
const getWishlist = async (req, res) => {
    try {
        const userCart = await Wishlist.findOne({ userId: req.params.id });
        if (userCart) {
            const products = userCart.products;
            if (!products)
                return [];
            // const completeProducts = await getCompleteProductDetails(products);
            const completeProducts = await Promise.all(products.map(async (product) => {
                const temp = await Product.findById(product.productId);
                return { quantity: product.quantity, ...temp._doc };
            }));

            if (completeProducts) {
                res.status(200).json({ products: completeProducts, message: "Wishlist fetched" });
            } else {
                res.status(400).json({ message: "Failed in fetching cart" });
            }
        } else {
            res.status(404).json({ message: "Wishlist not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server Error: Unable to fetch cart", error: err.message });
    }
};

module.exports = { getWishlist, updateWishlist };