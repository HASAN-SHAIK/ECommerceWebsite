import { useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Login from './Components/Login';
import Register from './Components/Register';
import ProductList from './Components/ProductList';
import { Home } from './Components/Home';
import { ProtectedRoute } from './Utils/ProtectedRoute';
import ProductPage from './Components/ProductPage';
import Cart from './Components/Cart';
import { useState } from 'react';
// import { Search } from './Components/Search';
import Profile from './Components/Profile';
import Orders from './Components/Orders';
import Search from './Components/Search';
import MyNavbar from './Components/MyNavbar';
import Logout from './Components/Logout';
import { AdminHome } from './Components/Admin/AdminHome';
import ProductsPage from './Components/Admin/ProductsPage';
import OrdersPage from './Components/Admin/OrdersPage';
import { AdminDashboard } from './Components/Admin/AdminDashboard';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Components/OrderPopup.css';
import image from './Images/3.gif';

// import { gapi } from 'gapi-script'


function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [path, setPath] = useState('')
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [repeatFor10Min, setRepeatFor10Min] = useState(10);

  //Syncing with DB
  const syncCartItems = async () => {
    try {
      const { userId } = JSON.parse(sessionStorage.getItem('userInfo'));
      await axios.post(`http://localhost:8080/api/cart/updateCart/${userId}`, {
        products: cartItems
      });
      await axios.post(`http://localhost:8080/api/wishlist/updateWishlist/${userId}`, {
        products: wishList
      });
    }
    catch (err) {
      console.error("Error while Syncing", err);
    }
  }
  //Adding reload event
  useEffect(() => {
    window.addEventListener('beforeunload', syncCartItems);
    return () => window.removeEventListener('beforeunload', syncCartItems);
  }, [])
  //Loggec In useeffect
  useEffect(() => {
    if (sessionStorage.userInfo)
      setLoggedIn(true);
  }, [])
  useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname])

  //Register
  const handleRegister = async (name, email, password, image) => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        name,
        email,
        password,
        image: image,
      });
      if (response && response.status === 201) {
        alert('User Created Successfully');
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage('User Already Exists');
      console.error('Error:', error);
    }
  };

  //Logout
  const handleLogout = async () => {
    const element = document.createElement('div');
    element.classList.add('spinner-border');
    element.classList.add('text-info');
    element.style.position = 'fixed';
    element.style.top = '50%';
    element.style.left = '50%';
    element.style.backgroundColor = 'aliceblue';
    document.body.appendChild(element);
    await syncCartItems().then(() => {
      setCartItems([]);
      sessionStorage.removeItem('userInfo');
      navigate('/logout');
      setLoggedIn(false);
      document.body.removeChild(element);
    })
      .catch(() => {
        alert("Syncing Error Please Try Again Later");
      })
  }

  //Checkout function
  const handleCheckout = async (totalCost) => {
    try {
      const { userId } = JSON.parse(sessionStorage.getItem('userInfo'));
      const response = await axios.post(`http://localhost:8080/api/order/addorder/${userId}`, {
        products: cartItems,
        totalCost: totalCost,
        status: "Pending",
      });
      console.log("response ", response)
      if (response.data.message === "order Updated") {
        await syncCartItems();
        setCartItems([]);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          // navigate('/');
        }, 2000); // Close the popup after 1 second
        // setCartItems([]);
      }
    }
    catch (err) {
      alert("Syncing Error Please try Later");
      console.error("Error while Syncing", err);
    }
  }


  useEffect(() => {
    const handleGetCart = async () => {
      try {
        const { userId } = JSON.parse(sessionStorage.getItem('userInfo'));
        const cartResponse = await axios.get(`http://localhost:8080/api/cart/${userId}`);
        // const wishlistResponse = await axios.get(`http://localhost:8080/api/wishlist/${userId}`);
        setCartItems(cartResponse.data.products);
        // setWishList(wishlistResponse.data.products);
      } catch (err) {
        console.error("Error occurred while getting Cart from server", err);
      }
    }
    handleGetCart();
  }, [loggedIn, repeatFor10Min]);
  const handleGetAllProducts = async () => {
    const response = await axios.get(`http://localhost:8080/api/products`)
    setProducts(response.data);
    if (response) {
      const data = response.data;
      setProducts(data.map((item) => {
        var found = 0;
        cartItems.length > 0 && cartItems.map((cartItem) => {
          if (cartItem._id == item._id)
            found = cartItem.quantity;
        })
        var inWishlist = false;
        wishList.length > 0 && wishList.map((wishitem) => {
          if (wishitem._id == item._id)
            inWishlist = true
        })
        return { inWishlist: inWishlist, inCart: found, ...item }
      }));
    }
  }
  useEffect(() => {
    handleGetAllProducts();
  }, [cartItems, wishList]);

  // const handleGetAllProducts = async () => {
  //   const response = await axios.get(`http://localhost:8080/api/products`)
  //   setProducts(response.data);
  // };
  const handleSearch = async () => {
    const value = searchValue.toLowerCase();
    var response;
    if (value) {
      response = await axios.get(`http://localhost:8080/api/products/search/${value}`);
      setProducts(response.data);
    }
    else
      response = await handleGetAllProducts();
    // return response.data;
  }
  const handleCategory = async (value) => {
    const response = await axios.get(`http://localhost:8080/api/products/category/${value}`);
    setProducts(response.data);
    return response.data;
  }
  const getRelatedProducts = async (products) => {
    const cat = []
    products.map((product) => {
      if (!cat.includes(product.category) && cat.length < 2) {
        cat.push(product.category);
      }
    })
    var relatedProducts = await Promise.all(
      cat.map(async (category) => {
        const product = await handleCategory(category);
        return product;
      })
    )
    const prods = [];
    relatedProducts.map((product) => {
      prods.push(...product);
    })
    console.log(prods);
    return prods;
  }
  return (
    <div>
      {loggedIn && user != 0 &&
        <>
          <MyNavbar cartItems={cartItems} handleGetAllProducts={handleGetAllProducts} handleSearch={handleSearch} searchValue={searchValue} setSearchValue={setSearchValue} handleLogout={handleLogout} />
          <Search handleCategory={handleCategory} handleSearch={handleSearch} searchValue={searchValue} setSearchValue={setSearchValue} path={path} handleLogout={handleLogout} setLoggedIn={setLoggedIn} />
        </>}
      <Routes>
        <Route path='/' element={<ProtectedRoute element={<Home wishList={wishList} setWishList={setWishList} setProducts={setProducts} products={products} setCartItems={setCartItems} cartItems={cartItems} />} />} />
        <Route path='/login' exact element={<Login setUser={setUser} setLoggedIn={setLoggedIn} handleRegister={handleRegister} />} />
        <Route path='/register' element={<Register errorMessage={errorMessage} handleRegister={handleRegister} />} />
        <Route path='/product/:id' element={<ProtectedRoute element={<ProductPage setWishList={setWishList} getRelatedProducts={getRelatedProducts} cartItems={cartItems} setCartItems={setCartItems} />} />} />
        <Route path='/cart' element={<ProtectedRoute element={<Cart wishList={wishList} setWishList={setWishList} handleCheckout={handleCheckout} cartItems={cartItems} setCartItems={setCartItems} />} />} />
        <Route path='/profile' element={<ProtectedRoute element={<Profile handleLogout={handleLogout} />} />} />
        <Route path='/orders' element={<ProtectedRoute element={<Orders cartItems={cartItems} setCartItems={setCartItems} getRelatedProducts={getRelatedProducts} />} />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>

      <Routes>
        {/* Admin  */}
        {loggedIn && user == 0 && <Route path='/admin/*' element={<AdminHome handleLogout={handleLogout} />} />}
      </Routes>


      {showPopup && (
        <div className="order-popup">
          <div className="popup-content">
            {/* <div className="checkmark-wrapper">
              <div className="checkmark"></div>
            </div> */}
            <img src={image} height='150px' width='150px' />
            <h3>Order Received!</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;