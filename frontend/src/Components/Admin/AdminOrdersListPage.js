import React, { useState, useEffect } from "react";
import "./AdminOrdersListPage.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminOrdersListPage = ({ setOrdersUpdated }) => {
  const [orders, setOrders] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [getOrders, setGetOrders] = useState(true);
  const getAllOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/order`);
      if (response.data) {
        setOrders(response.data);
        setFilteredOrders(response.data);
      }
    } catch (err) {
      console.error("Error", err);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = (orderId) => {
    if (dropdownOpen === orderId) {
      setDropdownOpen(null); // Close if the same dropdown is clicked
    } else {
      setDropdownOpen(orderId); // Open the specific dropdown
    }
  };

  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order._id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders); // Update orders with new status
    setFilteredOrders(updatedOrders); // Update filteredOrders
    setDropdownOpen(null); // Close the dropdown after selecting
  };

  const handleOrderUpdate = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/order/update`, {
        orders,
      });
      if (response) {
        setOrdersUpdated(["Changed"]);
        alert("Status Updated")
        console.log("Orders updated successfully");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = orders.filter((order) =>
      order._id.toLowerCase().includes(value)
    );
    setFilteredOrders(filtered);
  };

  return (
    <div>
      <div >
        <input
          type="text"
          placeholder="Type Here To Search!"
          value={searchTerm}
          onChange={handleSearch}
          className="orders-search-bar"
        />
        {/* <FontAwesomeIcon icon={faSearch} /> */}
      </div>
      <div className="order-list">
        <div className="row d-flex justify-content-center">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="admin-order-card white-text col-5 m-4 text-center"
            >
              <h5>Order ID: #{order._id}</h5>
              <p>Number of Products: {order.products.length}</p>
              <p>
                Total Cost: ${order.totalCost ? order.totalCost.toFixed(2) : "2000"}
              </p>

              <div className="dropdown">
                <button
                  className="dropdown-toggle"
                  onClick={() => toggleDropdown(order._id)}
                >
                  Status: {order.status}
                </button>

                {dropdownOpen === order._id && (
                  <div className="admin-dropdown-menu">
                    <div onClick={() => handleStatusChange(order._id, "Pending")}>
                      Pending
                    </div>
                    <div
                      onClick={() => handleStatusChange(order._id, "Completed")}
                    >
                      Completed
                    </div>
                    <div
                      onClick={() => handleStatusChange(order._id, "Cancelled")}
                    >
                      Cancelled
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={handleOrderUpdate}>Update</Button>
    </div>
  );
};

export default AdminOrdersListPage;