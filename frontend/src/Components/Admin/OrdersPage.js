import React, { useState, useEffect } from "react";
import { Dropdown, Card, Row, Col, Button } from "react-bootstrap";
import DoughnutChart from "./DoughnutChart";
import axios from "axios";
import './OrdersPage.css'
import AdminOrdersListPage from "./AdminOrdersListPage";


const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [ordersUpdated, setOrdersUpdated] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [pendingOrders, setPendingOrders] = useState();
  const [completedOrders, setCompletedOrders] = useState();
  const [cancelledOrders, setCancelledOrders] = useState();

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/order`);
        const orders = response.data;
        if (orders) {
          var pend = 0, comp = 0, cancel = 0;
          orders.map((order) => {
            if (order.status === "Pending")
              pend += 1;
            if (order.status === "Completed")
              comp += 1;
            if (order.status === "Cancelled")
              cancel += 1
          })
          setPendingOrders(pend);
          setCancelledOrders(cancel);
          setCompletedOrders(comp);
        }
      }
      catch (err) {
        console.log("Error", err);
      }
    }
    // const getAllOrders = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:8080/api/order`);
    //     if (response.data) {
    //       setOrders(response.data);
    //     }
    //   } catch (err) {
    //     console.error("Error", err);
    //   }
    // };
    getAllOrders();
  }, [ordersUpdated]);


  const [statusChanges, setStatusChanges] = useState({});

  // Handle dropdown change
  const handleStatusChange = (orderId, newStatus) => {
    setStatusChanges((prevChanges) => ({
      ...prevChanges,
      [orderId]: newStatus,
    }));
  };

  // Update the order status on clicking Update button
  const updateOrderStatus = (orderId) => {
    const newStatus = statusChanges[orderId];
    if (!newStatus) return;

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    // Remove the updated order from statusChanges
    setStatusChanges((prevChanges) => {
      const updatedChanges = { ...prevChanges };
      delete updatedChanges[orderId];
      return updatedChanges;
    });
  };

  return (
    <div className=" mt-5" style={{ backgroundColor: '#111' }}>
      {/* <h3 className="mb-4">Orders Dashboard</h3> */}

      <Row>
        <Col md={4}>
          <Card className="text-center d-flex aligh-items-center justify-content-center p-3 mb-4 white-text" >
            <h5>Pending Orders</h5>
            <p className="display-4">{pendingOrders}</p>
          </Card>
          <Card className="text-center p-3 white-text d-flex aligh-items-center justify-content-center" >
            <h5>Completed Orders</h5>
            <p className="display-4">{completedOrders}</p>
          </Card>
        </Col>
        <Col md={8} className="Dark white-text">
          <div style={{ width: '100%', height: '100%' }}>
            <DoughnutChart ordersUpdated={ordersUpdated} />
          </div>
        </Col>
      </Row>

      <div className="container mt-5 text-center">
        <AdminOrdersListPage setOrdersUpdated={setOrdersUpdated} />
      </div>

      {/* //Dont disturb just for styling */}
      <div style={{ width: '103.3%', backgroundColor: '#111', position: 'relative', bottom: 0, height: '7em', marginTop: '1em' }}>

      </div>
    </div>
  );
};

export default OrdersPage;