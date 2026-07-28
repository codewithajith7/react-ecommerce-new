import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaShoppingBag, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaArrowLeft } from "react-icons/fa";
import "./Orders.css";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA";
const AUTH_HEADER = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA";

const Orders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const userId = user?.id;

  const fetchOrders = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/orders?user_id=eq.${userId}`,
        {
          headers: {
            apikey: API_KEY,
            Authorization: AUTH_HEADER,
          },
        }
      );
      // Sort orders by id descending (most recent first)
      const sortedOrders = (res.data || []).sort((a, b) => b.id - a.id);
      setOrdersList(sortedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    } else {
      fetchOrders();
    }
  }, [userId, navigate, fetchOrders]);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "status-delivered";
      case "shipped":
        return "status-shipped";
      case "processing":
        return "status-processing";
      case "pending":
      default:
        return "status-pending";
    }
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <h2>Loading your orders...</h2>
      </div>
    );
  }

  return (
    <div className="orders-page-container">
      <div className="orders-header-row">
        <Link to="/" className="back-home-link">
          <FaArrowLeft /> Back to Home
        </Link>
        <h1 className="orders-heading">My Orders</h1>
      </div>

      {ordersList.length === 0 ? (
        <div className="empty-orders-view">
          <FaShoppingBag className="empty-orders-icon" />
          <h2>No orders placed yet</h2>
          <p>You haven't placed any orders yet. Visit our store to find your perfect products!</p>
          <Link to="/products" className="browse-products-btn">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {ordersList.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-card-header">
                <div className="order-meta-info">
                  <span className="order-id">Order ID: #{order.id}</span>
                  <span className="order-date-row">
                    <FaCalendarAlt /> Placed on: {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
                <span className={`order-status-badge ${getStatusClass(order.status)}`}>
                  {order.status || "Pending"}
                </span>
              </div>

              <div className="order-card-body">
                <div className="order-detail-block">
                  <div className="block-title">
                    <FaMapMarkerAlt /> Shipping Address
                  </div>
                  <div className="block-content">
                    <p className="customer-name">{order.name}</p>
                    <p>{order.address}</p>
                    <p>{order.city}, {order.state} - {order.pincode}</p>
                    <p className="customer-phone">Phone: {order.phone_no || order.phone}</p>
                  </div>
                </div>

                <div className="order-price-block">
                  <div className="block-title">
                    <FaMoneyBillWave /> Payment Details
                  </div>
                  <div className="block-content">
                    <div className="price-summary-row">
                      <span>Payment Status:</span>
                      <span className="paid-badge">Cash on Delivery</span>
                    </div>
                    <div className="price-summary-row total-price-row">
                      <span>Total Amount Paid:</span>
                      <span className="order-amount">₹{order.total_price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
