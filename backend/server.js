require('dotenv').config();

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const Wishlist = require('./models/Wishlist');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//COnnecting to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('E-Commerce Platform API is running');
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/admin', adminUserRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));