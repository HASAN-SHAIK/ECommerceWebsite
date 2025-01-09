import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import './MyNavbar.css';

const MyNavbar = ({ onCartRef, cartItems, handleLogout, handleSearch, searchValue, setSearchValue, handleGetAllProducts }) => {
  React.useEffect(() => {
    if (onCartRef) {
      onCartRef(onCartRef);
    }
  }, [onCartRef]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  useEffect(() => {
    const element = document.getElementById('cartItem');
    setTimeout(() => {
      element.classList.add('add-to-cart');
    }, 1000)
    setTimeout(() => {
      element.classList.remove('add-to-cart');
    }, 1500);

  }, [cartItems]);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link" onClick={handleGetAllProducts}>eCommerce</Link>
      </div>

      <div className="d-none d-md-block search-container">
        <input
          type="text"
          className="search-input rounded"
          placeholder="Search products..."
          value={searchValue}
          onChange={(e) => { setSearchValue(e.target.value); handleSearch() }}
        />
        {/* <button className="search-button" onClick={handleSearch}>
          <FaSearch />
        </button> */}
      </div>

      <div className="nav-icons">
        <Link to="/cart" className="cart-icon d-none d-md-block">
          <div id="cartItem"><FaShoppingCart /><span className='badge badge-secondary cart-badge-position bg-primary '>{cartItems.length}</span></div>
          {/* <span className="icon-label">Cart</span> */}
        </Link>

        <div className="profile-dropdown">
          <button className="nav-icon profile-icon" onClick={toggleDropdown}>
            <FaUser />
            <span className="icon-label">Profile</span>
          </button>
          {dropdownVisible && (
            <div className="dropdown-menu">
              <Link to="/" className="dropdown-item display-7" onClick={handleGetAllProducts}>Home</Link>
              <Link to="/cart" className="dropdown-item d-block d-md-none">Cart</Link>
              <Link to="/profile" className="dropdown-item">Profile</Link>
              <Link to="/orders" className="dropdown-item">Orders</Link>
              <Link className="dropdown-item" onClick={handleLogout}>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;