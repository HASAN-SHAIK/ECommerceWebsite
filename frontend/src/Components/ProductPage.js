import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react';
// import './ProductPage.css'; // Add custom CSS for additional styling
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ProductCard } from './ProductCard';
// import handleAddToCart from '../Utils/Cart';
import Popup from './Popup';
const ProductPage = ({ getRelatedProducts, cartItems, setCartItems }) => {
  const { id } = useParams(); // For dynamic product routing
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [found, setFound] = useState(0);
  useEffect(() => {
    const getProduct = (async (req, res) => {
      const response = await axios.get(`http://localhost:8080/api/products/${id}`);
      setProduct(response.data);
      const prod = response.data;
      console.log(prod)
      cartItems.length > 0 && cartItems.map((item) => {
        if (item._id == prod._id)
          setFound(item.quantity);
      });
    });
    getProduct();
  }, []);
  useEffect(() => {
    if (product === null)
      return;
    var checked = 0;
    cartItems.length > 0 && cartItems.map((item) => {
      if (item._id == product._id) {
        setFound(item.quantity);
        checked = 1;
      }
    });
    if (checked == 0)
      setFound(0);
  }, [cartItems]);

  const handleAddToCart = () => {
    var items = [...cartItems];
    var found = false;
    items = items.map((item) => {
      if (item._id === product._id) {
        found = true;
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    })
    if (!found) {
      items.push({ quantity: 1, ...product });
      // quantity = 1;
    }
    setCartItems(items);
  }
  const handlePlusButton = (productId) => {
    var items = [...cartItems];
    var quantity = found;
    items = items.map((item) => {
      if (item._id === productId) {
        if (item.quantity < product.countInStock) {
          quantity = item.quantity + 1;
        }
        else
          alert("Product Stock Completed")
        setFound(quantity);
        return { ...item, quantity: quantity };
      }
      return item;
    })
    setCartItems(items);
    // setFound(quantity);
  }
  const handleMinusButton = (productId) => {
    var quantity;
    var items = [...cartItems];
    items = items.map((item) => {
      if (item._id === productId) {
        quantity = item.quantity - 1;
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    })
    items = items.filter((item) => {
      if (item.quantity != 0)
        return item;
    })
    setCartItems(items);
    // setFound(quantity);
    // if (quantity == 0) {
    //   const button = document.getElementById(`add-to-cart-${product._id}`);
    //   button.classList.remove('d-none');
    //   const element = document.getElementById(`quantity-${product._id}`);
    //   element.classList.add('d-none');
    // }
    // else {
    //   const quantityElement = document.getElementById(`quantity-value-${product._id}`);
    //   if (quantityElement)
    //     quantityElement.innerHTML = quantity;
    // }
  }
  // const handleAddToCart = (product) => {
  //   var items = [...cartItems];
  //   let found = false;
  //   items = items.map((item) => {
  //     if (item._id === product._id) {
  //       found = true;
  //       let value = item.quantity + 1;
  //       // console.log("Value", value);
  //       return { ...item, quantity: item.quantity + 1 };
  //     }
  //     return item;
  //   })
  //   if (!found)
  //     items.push({ quantity: 1, ...product });
  //   setCartItems(items);

  //   // const element = document.getElementById(product._id).cloneNode(true);
  //   // const element = document.createElement('div')
  //   // element.innerText = 'Item Added';
  //   // element.classList.add('zoom');
  //   // document.getElementById('container').appendChild(element);
  // }
  // useEffect(() => {
  //   const addToCart = async () => {
  //     const userData = sessionStorage.getItem('userInfo');
  //     const { _id, cart } = JSON.parse(userData);
  //     await axios.post('http://localhost:8080/api/users/addToCart', {
  //       _id,
  //       cartItems
  //     })
  //   }
  //   window.addEventListener('beforeunload', addToCart);
  // }, [cartItems]);

  return (product &&
    <div id='container' className='bg-light p-3 rounded'>
      <Container className="my-5">
        <Row>
          {/* Product Image */}
          <Col md={4}>
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid"
              style={{ borderRadius: '10px' }}
            />
          </Col>

          {/* Product Details */}
          <Col md={4}>
            <h2 className="display-5 mb-3">{product.name}</h2>
            <h4 className="text-success mb-3">${product.price.toFixed(2)}</h4>

            <div className="mb-3">
              <span className="text-warning me-2">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </span>
              {/* <span>({product.rating.count} Reviews)</span> */}
            </div>

            <p className="mb-4">{product.description}</p>

            <div className="mb-3">
              {/* <strong>Stock: </strong> */}
              {product.countInStock > 0 ? (
                <Badge bg="success">In Stock</Badge>
              ) : (
                <Badge bg="danger">Out of Stock</Badge>
              )}
            </div>

            <Button className={found == 0 ? 'd-block' : 'd-none'} variant="primary" size="lg" disabled={product.stock === 0} onClick={() => handleAddToCart()}>Add to cart</Button>
            {product.stock === 0 ? 'Out of Stock' : found == 0 ? "Add To Cart" :
              <div style={{ transition: 'all 1s' }} id={`quantity-${product._id}`} className={found > 0 ? 'd-block rounded plus-minus-button d-flex justify-content-between' : 'd-none'}>
                <button className='btn text-light' onClick={() => { handleMinusButton(product._id) }}><i class="bi bi-dash fa-2x" /></button>
                <div id={`quantity-value-${product._id}`} style={{ paddingLeft: '1.3em', fontSize: '2em', paddingRight: '1.3em', marginTop: '.2em' }}>{found}</div>
                <button className='btn text-light' onClick={() => handlePlusButton(product._id)}><i class="bi bi-plus fa-2x" /></button>
              </div>
            }

          </Col>
        </Row>

        {/* Related Products Section
        <div className='col-lg-4 m-lg-4 bg-info border-0 rounded p-4 row d-md-flex justify-content-between d-lg-block'>
          <h2 className='text-center m-0 text-light'>Related Products</h2>
          {relatedProducts.length > 0 &&
            relatedProducts.map((product) => {
              return <div className='mt-4 m-lg-4 col-md-6 col-lg-10'> <ProductCard product={product} cartItems={cartItems} setCartItems={setCartItems} /></div>
            })
          }
        </div> */}
      </Container >
    </div >
  );
};

export default ProductPage;