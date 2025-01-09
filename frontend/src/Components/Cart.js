import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image, Form, Table } from 'react-bootstrap';
import './Cart.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = ({ cartItems = [], setCartItems, handleCheckout, wishList, setWishList }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total.toFixed(2));
  }, [cartItems]);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const handleUnload = async () => {
      const { userId } = JSON.parse(sessionStorage.getItem('userInfo'));
      try {
        await axios.post(`http://localhost:8080/api/cart/updateCart/${userId}`, {
          products: cartItems
        });
      } catch (err) {
        console.error("Error occurred while updating the cart", err);
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [cartItems]);

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [window.innerWidth])

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };
  const removeWishlistItem = (id) => {
    setWishList(wishList.filter(item => item._id !== id));
  }
  const handleAddTocartFromWishlist = (product) => {
    console.log("pro", product)
    var items = [...cartItems];
    let found = false;
    var quantity = 0;
    items = items.map((item) => {
      if (item._id === product._id) {
        found = true;
        quantity = item.quantity + 1;
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    })
    if (!found) {
      items.push({ quantity: 1, ...product });
      quantity = 1;
    }
    setCartItems(items);
    setWishList(wishList.filter(item => item._id !== product._id));
  }
  const updateQuantity = (id, quantity) => {
    setCartItems(cartItems.map(item =>
      item._id === id ? { ...item, quantity: quantity } : item
    ));
  };

  return (
    <>
      <Container className="d-block  d-lg-none cart-page my-4">
        <h2 className="text-center mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p>Your cart is empty!</p>
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className='shopping-page bg-light rounded p-4'>
            {cartItems.map((item) => (
              <Row key={item._id} className="cart-item mb-4">
                <Col xs={5} className="d-flex justify-content-center">
                  <Image src={item.image} alt={item.name} fluid className="cart-item-image" />
                </Col>
                <Col xs={7} className="d-flex flex-column justify-content-between">
                  <div>
                    <h6 className='text-dark'>{item.name}</h6>
                    <p className="text-muted">${item.price}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Form.Control
                      as="select"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                      style={{ width: '70px' }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Col>
              </Row>
            ))}

            <div className="cart-summary p-4 mt-4 shadow-sm">
              <h4 className='text-primary'>Order Summary</h4>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <Button
                variant="success"
                className="w-100"
                disabled={cartItems.length === 0}
                onClick={() => handleCheckout(totalPrice)}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </Container>
      <Container className="d-none d-lg-block cart-page my-5">
        <h2 className="text-center mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p>Your cart is empty!</p>
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <Row>
              <Col md={8}>
                <Table responsive="sm" className="cart-table shopping-page">
                  <thead>
                    <tr style={{ backgroundColor: 'blue' }}>
                      <th colSpan="2">Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id} id='row-items'>
                        <td>
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="cart-item-image"
                            width="150"
                          />
                        </td>
                        <td>
                          <Link to={`/product/${item._id}`} className="">
                            {item.name}
                          </Link>
                          <div className="small m-2">{item.description}</div>
                          <div>
                            {"★".repeat(Math.floor(item.rating)) + "☆".repeat(5 - Math.floor(item.rating))}
                          </div>
                        </td>
                        <td>${item.price}</td>
                        <td>
                          <Form.Control
                            as="select"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item._id, parseInt(e.target.value))
                            }
                            style={{ width: '80px' }}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removeItem(item._id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>

              <Col md={4}>
                <div className="cart-summary p-4 shadow-sm">
                  <h4>Order Summary</h4>
                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal</span>
                    <span>${totalPrice}</span>
                  </div>
                  <Button
                    variant="success"
                    className="w-100"
                    disabled={cartItems.length === 0}
                    onClick={() => handleCheckout(totalPrice)}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>

      <Container className="d-block d-lg-none cart-page my-4">

        {wishList.length === 0 ? (
          <div className="text-center">
            {/* <p>Your cart is empty!</p> */}
            {/* <Link to="/" className="btn btn-primary">
              {/* Continue Shopping 
            </Link> */}
          </div>
        ) : (<>
          <h2 className="text-center mb-4">WishList</h2>
          <div className='shopping-page bg-light rounded p-4'>
            {wishList.map((item) => (
              <Row key={item._id} className="cart-item mb-4">
                <Col xs={5} className="d-flex justify-content-center">
                  <Image src={item.image} alt={item.name} fluid className="cart-item-image" />
                </Col>
                <Col xs={7} className="d-flex flex-column justify-content-between">
                  <div>
                    <h6 className='text-dark'>{item.name}</h6>
                    <p className="text-muted d-flex jsutify-content-between align-items-center">
                      ${item.price}
                      {/* <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                        style={{ width: '70px' }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control> */}
                    </p>
                  </div>
                  <div className="m-0 align-items-center">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleAddTocartFromWishlist(item)}
                      className='my-3'
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Col>
              </Row>
            ))}
          </div>
        </>)}
      </Container>
      <Container className="d-none d-lg-block cart-page my-5">
        {wishList.length > 0 && <>
          <h2 className="text-center mb-4">WishList</h2>
          <Row>
            <Col md={12}>
              <Table responsive="sm" className="cart-table shopping-page">
                <thead>
                  <tr style={{ backgroundColor: 'blue' }}>
                    <th colSpan="2" width='70%'>Product</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {wishList.map((item) => (
                    <tr key={item._id} id='row-items'>
                      <td>
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="cart-item-image"
                          width="150"
                        />
                      </td>
                      <td>
                        <Link to={`/product/${item._id}`} className="">
                          {item.name}
                        </Link>
                        <div className="small m-1">{item.description}</div>
                        <div>
                          {"★".repeat(Math.floor(item.rating)) + "☆".repeat(5 - Math.floor(item.rating))}
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleAddTocartFromWishlist(item)}
                          className='my-3 mx-2'
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeWishlistItem(item._id)}
                        >
                          X
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>

            {/* <Col md={4}>
              <div className="cart-summary p-4 shadow-sm">
                <h4>Order Summary</h4>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <Button
                  variant="success"
                  className="w-100"
                  disabled={cartItems.length === 0}
                  onClick={() => handleCheckout(totalPrice)}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </Col> */}
          </Row>
        </>
        }
      </Container>
    </>
  )
};

export default Cart;