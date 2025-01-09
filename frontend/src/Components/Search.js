// import React, { useEffect, useState } from 'react'
// import { Link, Navigate, useNavigate } from 'react-router-dom';
// import './Search.css';
// import Form from 'react-bootstrap/Form';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faSearch,faUser, faCartShopping} from '@fortawesome/free-solid-svg-icons';


// export const Search = ({ handleLogout}) => {
//   const navigate = useNavigate();
//   const [searchValue, setSearchValue] = useState('');
//   const handleSearchClick = () => {
//     console.log("Search Clicked");
//   }
//   const handleProfileClick =() =>{
//     // document.querySelector('.dropdownContent').classList.toggle('opacity-0');
//     document.querySelector('.dropdownContent').classList.toggle('d-none');

//   }

//   return (
//     <div className='searchContainer'>
//     <div className='row pt-2 m-0'>
//       <div className='col-sm-3'>
//         <h3 className='m-2 text-center text-secondary'><Link to='/home'>eCommerce</Link></h3> 
//       </div>
//       <div className='col-12 p-0 col-sm-7'>
//       <Form className='formClass'>
//       <Form.Group className="d-flex flex-row align-items-center" controlId="">
//         <Form.Control  
//             type="search"
//             placeholder="Search the product"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)} 
//             />
//         <FontAwesomeIcon className='m-2 d-inline fa-xl' type='button' onClick={handleSearchClick} icon={faSearch} />
//       </Form.Group>
//       </Form>
//       </div>
      
//     </div>

//     {/* Adding the Profile Button */}
//     {/* <div className=''>
//     <Link to='/cart' ></Link>  
//     </div> */}
//     <div className='cartImage'>
//     <Link to='cart' ><FontAwesomeIcon icon={faCartShopping} className=' d-none fa-xl d-md-block m-1'/></Link>
//     </div>
//     <Link className='profileImage d-flex flex-row' onClick={handleProfileClick}>
//       <FontAwesomeIcon icon={faUser} className='m-1'  />
//     </Link>
//     <div className='dropdownContent d-none'>
//         <div><Link to='/home'>Home</Link></div>
//         <div><Link to='/profile'>Profile</Link></div>
//         <div className='d-block d-md-none'><Link to='/cart'>Cart</Link></div>
//         <div><Link to='/orders'>Orders</Link></div>
//         <div><Link to='/profile' onClick={handleLogout}>Logout </Link></div>
//       </div>
//     </div>
//   )
// }
import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import './Search.css';
import MyNavbar from './MyNavbar';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';


 const Search = ({handleLogout, path, setSearchValue, searchValue, handleSearch, handleCategory}) => {
  return (
    <div className="home-container">
      {/* Navigation Bar */}
      {/* <Navbar expand="lg" className="navbar">
        <Navbar.Brand href="#home" className="navbar-brand">eCommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Dropdown className="nav-item">
              <Dropdown.Toggle variant="link" className="nav-link">Mobiles</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action/3.1">Smartphones</Dropdown.Item>
                <Dropdown.Item href="#action/3.2">Accessories</Dropdown.Item>
                <Dropdown.Item href="#action/3.3">Wearables</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="nav-item">
              <Dropdown.Toggle variant="link" className="nav-link">Clothing</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action/3.1">Men</Dropdown.Item>
                <Dropdown.Item href="#action/3.2">Women</Dropdown.Item>
                <Dropdown.Item href="#action/3.3">Kids</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="nav-item">
              <Dropdown.Toggle variant="link" className="nav-link">Electronics</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action/3.1">Laptops</Dropdown.Item>
                <Dropdown.Item href="#action/3.2">Cameras</Dropdown.Item>
                <Dropdown.Item href="#action/3.3">Accessories</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="nav-item">
              <Dropdown.Toggle variant="link" className="nav-link">Accessories</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action/3.1">Headphones</Dropdown.Item>
                <Dropdown.Item href="#action/3.2">Bags</Dropdown.Item>
                <Dropdown.Item href="#action/3.3">Watches</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar> */}
      {/* <MyNavbar handleLogout={handleLogout}/> */}
      <div className="d-block d-md-none">
      <div className='search-container-mobile'> 
        <input
          type="text"
          className="search-input text-center"
          placeholder="Search products..."
          value={searchValue}
          onChange={(e)=> setSearchValue(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch} >
          <FaSearch />
        </button>
      </div>
      </div>
      {/* Header Section */}
      { path === '/'?
      <>
      <div className="header">
        <h1>Welcome to Our Store</h1>
        <p>Explore our diverse categories and find the perfect products</p>
      </div>

      {/* Category Section */}
      <div className="category-section">
        <div className="category-card" onClick={()=>handleCategory("Home")}>Home&Kitchen</div>
        <div className="category-card" onClick={()=>handleCategory("Fitness")}>Fitness</div>
        <div className="category-card" onClick={()=>handleCategory("Lifestyle")}>Lifestyle</div>
        <div className="category-card" onClick={()=>handleCategory("Electronics")}>Electronics</div>
        <div className="category-card" onClick={()=>handleCategory("Accessories")}>Accessories</div>
      </div>
      </> : null }
    </div>
  );
};

export default Search;