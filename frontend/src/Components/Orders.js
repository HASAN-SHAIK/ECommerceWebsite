import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import './Orders.css';
import { Circles } from 'react-loading-icons'
import { ProductCard } from './ProductCard';

const Orders = ({ getRelatedProducts, cartItems, setCartItems }) => {
  const [orders, setOrders] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    const handlegetOrders = async () => {
      try {
        const { userId } = JSON.parse(sessionStorage.getItem('userInfo'));
        const response = await axios.get(`http://localhost:8080/api/order/${userId}`)
        if (response.data)
          setOrders(response.data);
        setRelatedProducts(await getRelatedProducts(response.data));
      }
      catch (err) {
        console.error("Error in Order.js", err);
      }
    }
    handlegetOrders();
  }, [])
  return (
    <Container className="orders-page my-4">
      <h2 className="text-center mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <>
          <div className='text-center'>
            <Circles size='xs' />
          </div>
          <div className="text-center">
            <p>You have no orders yet.</p>
            <Button variant="primary" href="/shop">Shop Now</Button>
          </div>
        </>
      ) : (
        <div className='row d-flex justify-content-between'>
          <div className='col-lg-7'>{
            orders.map((order) => (
              <div key={order.id} className="order-card mb-3 shadow-sm">
                <Row>
                  <Col xs={12} sm={5} className="d-flex p-0 p-sm-2 align-items-center">
                    <Image src={order.image} alt={order.name} fluid className="order-item-image" />
                  </Col>
                  <Col xs={12} sm={7} className='p-2 text-center'>
                    <h3 className="order-item-name mb-1">{order.name}</h3>
                    <h5 className="order-item-price text-muted mb-1">Price: ${order.price}</h5>
                    <p className="order-item-quantity text-muted">Qty: {order.quantity}</p>
                    <div className="mb-3">
                      <span className="text-warning me-2">
                        {"★".repeat(Math.floor(order.rating))}
                        {"☆".repeat(5 - Math.floor(order.rating))}
                      </span>
                      {/* <span>({product.rating.count} Reviews)</span> */}
                    </div>
                    {/* <h6 className='order-item-quantity'>Rating: <strong>{order.rating}</strong></h6> */}
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col className="d-flex justify-content-between align-items-center">
                    <span className="order-status">
                      Status: <strong style={{ color: order.status == "Completed" ? 'green' : order.status == "Pending" ? 'orange' : 'red' }}>{order.status}</strong>
                    </span>
                    {/* <Button variant="outline-primary" size="sm" href={`/order/${order.id}`}>
                  View Details
                </Button> */}
                  </Col>
                </Row>
              </div>
            ))}
          </div>

          <div className='col-lg-4 m-lg-4  border-0 rounded p-4 row d-md-flex justify-content-between d-lg-block'>
            <h2 className='text-center m-0 text-light'>Related Products</h2>
            {relatedProducts.length > 0 &&
              relatedProducts.map((product) => {
                return <div className='mt-4 m-lg-4 col-md-6 col-lg-10'> <ProductCard product={product} cartItems={cartItems} setCartItems={setCartItems} /></div>
              })
            }
          </div>
        </div>

      )}
    </Container>
  );
};

export default Orders;