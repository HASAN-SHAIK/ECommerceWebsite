const Cart = require('../models/Cart');
const Order = require('../models/Orders');
const User = require('../models/User');
const Wishlist = require('../models/Wishlist');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

//Register new user
const registerUser = async (req, res) => {
  const { name, email, password, image } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = await User.create({
    name,
    email,
    password,
    image,
  });
  console.log(newUser);
  const wishlist = await Wishlist.create({ userId: newUser._id, products: [] });
  const cart = await Cart.create({ userId: newUser._id, products: [] });
  const order = await Order.create({ userId: newUser._id, products: [], totalCost: 0 })
  newUser.cartId = cart._id;
  newUser.orderId = order._id;
  newUser.wishlistId = wishlist._id;
  if (newUser) {
    res.status(201).json({
      message: "User Created Successfully",
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      image: newUser.image,
      cartId: newUser.cartId,
      orderId: newUser.orderId,
      wishlistId: newUser.wishlistId,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

//Authenticate user & get token
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      "message": "Login Success",
      userId: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      date: user.date,
      role: "user",
      // cart:user.cart,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};


module.exports = { registerUser, authUser };