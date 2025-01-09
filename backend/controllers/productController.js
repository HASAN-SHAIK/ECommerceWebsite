const Product = require('../models/Product');

// @desc    Fetch all products
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getSearchProducts = async (req, res) => {
  const value = req.params.value;
  const products = await Product.find();
  const getSearchProducts = products.filter((product) => {
    if (product.name.toLowerCase().includes(value) || product.description.toLowerCase().includes(value))
      return product;
  });
  res.json(getSearchProducts);
}

const getProductsByCategory = async (req, res) => {
  const value = req.params.value;
  const products = await Product.find();
  const getProducts = products.filter((product) => {
    if (product.category.includes(value))
      return product;
  });
  res.json(getProducts);
}

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
}

const getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
}

// @desc    Create a product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, rating, countInStock, category } = req.body;

    const product = new Product({
      name,
      description,
      price,
      image,
      rating,
      countInStock,
      category,
    });

    const createdProduct = await product.save();
    const products = await Product.find();
    res.status(201).json(products);
  }
  catch (err) {
    res.status(500).json({ message: "Error in Adding Product", error: err })
  }
};
const updateProductHelper = async (id, params, quant = 0) => {
  const { name, description, price, image, countInStock, category, quantity } = params;
  const product = await Product.findById(id);

  if (product) {
    product.name = name ? name : product.name;
    product.description = description ? description : product.description;
    product.price = price ? price : product.price;
    product.image = image ? image : product.image;
    product.countInStock = countInStock ? countInStock - quantity : product.countInStock - quant;
    product.category = category ? category : product.category;

    const updatedProduct = await product.save();
    //console.log("updates", product, updatedProduct);
    const products = await Product.find();
    return products;
  }
}
// @desc    Update a product
const updateProduct = async (req, res) => {
  const products = await updateProductHelper(req.params.id, req.body);
  if (products) {
    res.json({ message: "Product Updated", products: products });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Delete a product
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne({ _id: req.params.id });
    const products = await Product.find();
    res.json({ message: 'Product removed', products: products });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

//Get Product Details with Id along with Quantity
const getCompleteProductDetails = async (products, forOrder = 0) => {
  var ind = 0;
  const completeProducts = await Promise.all(products.map(async (product) => {
    const temp = await Product.findById(product.productId);
    if (!forOrder) {
      if (temp != null)
        return { quantity: product.quantity, ...temp._doc };
    }
    if (forOrder && temp != null)
      return { quantity: product.quantity, price: product.price, status: products[ind++].status, ...temp._doc };
  })
  );
  const productswithoutNull = completeProducts.filter((product) => {
    if (product != null)
      return product;
  })
  return productswithoutNull;
}

module.exports = { updateProductHelper, getProductById, getProducts, getProduct, getSearchProducts, getProductsByCategory, createProduct, updateProduct, deleteProduct, getCompleteProductDetails };