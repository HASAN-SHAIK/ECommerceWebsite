
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import './ProductList.css';

// const ProductList = ({cartItems, setCartItems}) => {
//   const [products, setProducts] = useState([]);

//   // useEffect(()=>{
//   //   const addToCart = async() =>{
//   //      const userData = sessionStorage.getItem('userInfo');
//   //      const {_id, cart} = JSON.parse(userData);
//   //      await axios.post('http://localhost:8080/api/users/addToCart', {
//   //        _id,
//   //        cartItems
//   //      })
//   //    }
//   //    window.addEventListener('beforeunload', addToCart);
//   //   }, [cartItems]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const response = await axios.get('http://localhost:8080/api/products');
//       setProducts(response.data);
//     };
//     fetchProducts();
//   }, []);
//   const handleAddToCart = (product) =>{
//     console.log("Product", product);

//     var items = [...cartItems];
//     let found = false;
//     items = items.map((item)=>{
//       if(item._id === product._id){
//         found = true;
//         return {...item, quantity: item.quantity + 1};
//       }
//       return item;
//     })
//     if(!found)
//     items.push({quantity:1,...product});
//     console.log("Items", items)
//     setCartItems(items);
//   }
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8; // Number of products displayed per page

//   // Pagination logic
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const [pathname, setPathname] = useState(window.location.pathname);
//   useEffect(()=>{
//     setPathname(window.location.pathname);
//   }, [window.location])


//   return (
//   <Container id='container' className="my-5">
//       <Row>
//         {currentProducts.map((product) => (
//           <Col md={3} className="mb-4" key={product._id}>
//             <Card className="h-100 shadow-sm">
//               <Link to={`/product/${product._id}`}>
//                 <Card.Img
//                   variant="top"
//                   src={product.image}
//                   alt={product.name}
//                   className="product-image"
//                   id={product._id}
//                 />
//               </Link>
//               <Card.Body className="d-flex flex-column">
//                 <Card.Title>{product.name}</Card.Title>
//                 <Card.Text className="text-success">
//                   ${product.price.toFixed(2)}
//                 </Card.Text>
//                 <Button
//                   variant="primary"
//                   className="mt-auto"
//                   disabled={product.stock === 0}
//                   onClick={()=>handleAddToCart(product)}
//                 >
//                   {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Pagination */}
//       <Row>
//         <Col className="d-flex justify-content-center">
//           <nav>
//             <ul className="pagination">
//               {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((number) => (
//                 <li key={number + 1} className="page-item">
//                   <Button
//                     onClick={() => paginate(number + 1)}
//                     className="page-link"
//                   >
//                     {number + 1}
//                   </Button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ProductList;

// import React from 'react'
// import './ProductCard.css'
// export const ProductCard = ({name, url, price, rating}) => {
//   return (
//     <div className='card'>
//         <img src={url} height='180vh' alt={name}/>
//         <div>{name}</div>
//     </div>
//   )
// } 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ProductCard } from './ProductCard';


const ProductList = ({ setWishList, wishList, cartRef, cartItems, setCartItems, products, setProducts }) => {
  // const [products, setProducts] = useState([]);

  // useEffect(()=>{
  //   const addToCart = async() =>{
  //      const userData = sessionStorage.getItem('userInfo');
  //      const {_id, cart} = JSON.parse(userData);
  //      await axios.post('http://localhost:8080/api/users/addToCart', {
  //        _id,
  //        cartItems
  //      })
  //    }
  //    window.addEventListener('beforeunload', addToCart);
  //   }, [cartItems]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const response = await axios.get('http://localhost:8080/api/products');
  //     setProducts(response.data);
  //   };
  //   fetchProducts();
  // }, []);

  // const handleAddToCart = (product) => {
  //   console.log("Product", product);

  //   var items = [...cartItems];
  //   let found = false;
  //   items = items.map((item) => {
  //     if (item._id === product._id) {
  //       found = true;
  //       return { ...item, quantity: item.quantity + 1 };
  //     }
  //     return item;
  //   })
  //   if (!found)
  //     items.push({ quantity: 1, ...product });
  //   // Animate the button (could add more complex animations here)
  //   const button = document.getElementById(`add-to-cart-${product._id}`);
  //   if (button) {
  //     button.classList.add('animate');
  //     setTimeout(() => {
  //       button.classList.remove('animate');
  //     }, 500); // Remove animation class after 0.5 seconds
  //   }
  //   setCartItems(items);
  // }
  // const checkInCart = (id) => {
  //   var quantity = 0;
  //   cartItems.map((item) => {
  //     if (item._id == id)
  //       quantity = item.quantity;
  //     return item;
  //   })
  //   return quantity;
  // }
  // const moveToCenterAndBounce = (elementId) => {
  //   // const cartElement = cartRef.current;
  //   const element = document.getElementById(elementId);
  //   if (element) {
  //     // Get the current position of the element
  //     const rect = element.getBoundingClientRect();
  //     const clone = element.cloneNode(true); // Clone the element to animate
  //     clone.style.position = "fixed";
  //     clone.style.left = `${rect.left}px`;
  //     clone.style.top = `${rect.top}px`;
  //     clone.style.width = `${rect.width}px`;
  //     clone.style.height = `${rect.height}px`;
  //     clone.style.transition = "all 1s ease-in-out";
  //     clone.style.zIndex = "3000"
  //     document.body.appendChild(clone); // Append to body for animation

  //     // Calculate the center of the screen
  //     const centerX = window.innerWidth / 2 - rect.width / 2;
  //     const centerY = window.innerHeight / 2 - rect.height / 2;

  //     // Move to the center of the screen
  //     setTimeout(() => {
  //       // const cartElement = document.getElementById('cartItem');
  //       // const recty = cartElement.getBoundingClientRect();
  //       // console.log(recty)
  //       clone.style.left = '78em';
  //       clone.style.right = '10em';
  //       clone.style.top = '-10em';
  //       clone.style.bottom = '97em';
  //     }, 0);


  //     // Add bounce effect once it reaches the center
  //     // clone.addEventListener("transitionend", () => {
  //     // box.innerHTML = '<i class="bi bi-box2 fa-4x text-success"></i>';
  //     setTimeout(() => {
  //       clone.classList.add('add-to-cart-card');
  //       setTimeout(() => {
  //         document.body.removeChild(clone);
  //       }, 1000)
  //     }, 0)
  //     // body.appendChild(box);
  //     // box.classList.add('add-to-cart-animation');
  //     clone.addEventListener("animationend", () => {
  //       //   box.classList.remove('add-to-cart-animation');
  //       //   box.addEventListener('animationend', () => {
  //       //     body.removeChild(box);

  //       //   }, { once: true })
  //     });
  //     // }, { once: true });

  //     // Remove the element after the animation
  //     // setTimeout(() => {

  //     // }, 1500)
  //     setTimeout(() => {
  //     }, 2000); // Adjust time to match animation duration
  //   }
  // };
  // const handleAddToCart = (product) => {
  //   console.log("Product", product);
  //   var quantity = 0;
  //   var items = [...cartItems];
  //   let found = false;
  //   items = items.map((item) => {
  //     if (item._id === product._id) {
  //       found = true;
  //       quantity = item.quantity + 1;
  //       return { ...item, quantity: item.quantity + 1 };
  //     }
  //     return item;
  //   })
  //   if (!found) {
  //     items.push({ quantity: 1, ...product });
  //     quantity = 1;
  //   }
  //   // Animate the button (could add more complex animations here)
  //   const button = document.getElementById(`add-to-cart-${product._id}`);
  //   if (button) {
  //     // const body = document.querySelector('body');
  //     // const box = document.createElement('div');
  //     // box.innerHTML = '<i class="bi bi-box2 fa-4x text-success"></i>';
  //     moveToCenterAndBounce(product._id);
  //   }

  //   setCartItems(items);
  //   setProducts(products.map((item) => {
  //     if (item._id == product._id)
  //       return { inCart: 1, ...item };
  //   }))
  //   // setAddButton(true)
  //   // button.classList.add('d-none');
  //   // const element = document.getElementById(`quantity-${product._id}`);
  //   // element.classList.remove('d-none');
  //   // const quantityElement = document.getElementById(`quantity-value-${product._id}`);
  //   // if (quantityElement)
  //   // quantityElement.innerHTML = quantity;
  //   // alert("Item Added");
  // }

  return (
    <div className="product-list-container">
      {products.length < 1 ? <h2 className='text-info'><div class="spinner-border" role="status">
      </div></h2> :
        <>
          <h2>Our Products</h2>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard wishList={wishList} setWishList={setWishList} products={products} setProducts={setProducts} cartRef={cartRef} product={product} cartItems={cartItems} setCartItems={setCartItems} />
            ))}
          </div></>}
    </div>
  );
};

export default ProductList;