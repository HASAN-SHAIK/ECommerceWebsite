const Product = require('../models/Product');
const Order = require('../models/Orders');

const { getCompleteProductDetails, updateProductHelper, getProductById } = require('./productController');

const getAllOrders = async (req, res) => {
    try {
        const response = await Order.find();
        // const products = response.products;
        // const completeProducts = await getCompleteProductDetails(products, 1);
        if (response)
            res.status(200).json(response);
        else {
            res.status(400).json({ message: "400 Error in Getting All orders in Order Controller" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Error in order Controller get All Orders", error: err.message });
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id });
        // const products = [];
        var i = 0;
        const products = await Promise.all(orders.map(async (order) => {
            console.log("Order", order);
            const prod = await Promise.all(order.products.map(async (product) => {
                console.log("rpdoct", product._id)
                const completeProduct = await getProductById(product.productId)
                // const completeProduct = await Product.findOne(product._id);
                console.log(i++, completeProduct);
                if (completeProduct) {
                    const completeOrderProduct = { product: completeProduct, status: order.status, quantity: product.quantity };
                    // console.log(completeOrderProduct);
                    return { product: { ...completeProduct._doc, status: order.status, quantity: product.quantity } };
                }

            }))
            return [...prod];
        }))
        const completeProducts = [];
        products.map((product) => {
            product.map((prod) => {
                if (prod)
                    completeProducts.push(prod.product);
            })
        })
        res.json(completeProducts.reverse());
    }
    catch (err) {
        res.status(500).json({ message: "Error in order Controller", error: err.message });
    }
}

const addOrder = async (req, res) => {
    try {
        const { products, totalCost } = req.body;
        // var resp = "ssss";
        const completeProducts = await Promise.all(products.map(async (product) => {
            console.log("PPPP", product);
            // const params = { countInStock: product.countInStock - product.quantity, ...product };
            // console.log("params", params);
            const resp = await updateProductHelper(product._id, product, product.quantity);
            // console.log("RESP", resp) 
            return { productId: product._id, quantity: product.quantity, price: product.price * product.quantity };
        }));
        console.log("COML", completeProducts);
        const response = await Order.create({ products: [...completeProducts], totalCost: totalCost, status: "Pending", userId: req.params.id });
        if (response) {
            res.status(200).json({ message: "order Updated", updatedProduct: "resp" });
        }
        else {
            res.status(400).json({ message: "Error while updating the Orders" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Error in order Controller", error: err.message });
    }
}

const updateOrder = async (req, res) => {
    try {
        const { orders } = req.body;
        var notUpdatedCount = 0;
        orders.map(async (order) => {
            const response = await Order.updateOne({ _id: order._id }, { status: order.status });
            if (!response)
                notUpdatedCount++;
            return true;
        })
        if (!notUpdatedCount)
            res.status(200).json({ message: "Orders Updated" });
        if (notUpdatedCount)
            res.status(200).json({ message: "Partially updated" });
        res.status(400).json({ message: "Failed to Update the Orders", notUpdatedCount: notUpdatedCount })
    } catch (error) {
        console.log("Error", error);
    }
}

module.exports = { getOrders, updateOrder, getAllOrders, addOrder };