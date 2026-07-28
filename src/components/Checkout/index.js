import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA";
const AUTH_HEADER = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const userId = user?.id;

  const fetchCart = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?user_id=eq.${userId}&select=*,products(*)`,
        {
          headers: {
            apikey: API_KEY,
            Authorization: AUTH_HEADER,
          },
        }
      );
      setCartItems(res.data || []);
    } catch (err) {
      console.error("Error fetching cart for checkout:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    } else {
      fetchCart();
    }
  }, [userId, navigate, fetchCart]);

  const calculateTotalPrice = () => {
    const subtotal = cartItems.reduce((acc, item) => {
      const price = item.products?.price || 0;
      return acc + price * item.quantity;
    }, 0);
    const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 150;
    return subtotal + shipping;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address || !city || !pincode) {
      alert("Please fill all the mandatory address fields.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty. Cannot place an order.");
      return;
    }

    const totalPrice = calculateTotalPrice();

    const order = {
      user_id: user.id,
      name: user.username,
      phone: user.phone || "0000000000", // Fallback if phone is missing
      address,
      city,
      state: "Telangana",
      pincode,
      total_price: totalPrice,
      status: "pending",
    };

    try {
      setSubmitting(true);

      // 1. Post order to Supabase orders table
      await axios.post(
        "https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/orders",
        order,
        {
          headers: {
            apikey: API_KEY,
            Authorization: AUTH_HEADER,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
        }
      );

      // 2. Delete entire cart for the user
      await axios.delete(
        `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?user_id=eq.${user.id}`,
        {
          headers: {
            apikey: API_KEY,
            Authorization: AUTH_HEADER,
          },
        }
      );

      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.products?.price || 0;
    return acc + price * item.quantity;
  }, 0);
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="checkout-loading">
        <h2>Loading Order Details...</h2>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
      <h1 className="checkout-heading">Checkout</h1>

      <div className="checkout-content-grid">
        {/* Shipping Form */}
        <div className="checkout-form-section">
          <form className="shipping-form" onSubmit={handlePlaceOrder}>
            <h3>Shipping Information</h3>
            
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={user?.username || ""} disabled />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" value={user?.phone || ""} disabled />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                placeholder="Enter your full street address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input type="text" value="Telangana" disabled />
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode *</label>
                <input
                  type="text"
                  id="pincode"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="place-order-btn" disabled={submitting}>
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Details Panel */}
        <div className="checkout-summary-section">
          <div className="order-summary-card">
            <h3>Items in Order</h3>
            <div className="order-items-list">
              {cartItems.map((item) => (
                <div className="summary-item-row" key={item.id}>
                  <div className="item-title-qty">
                    <span>{item.products?.title}</span>
                    <span className="item-qty-badge">x{item.quantity}</span>
                  </div>
                  <span>₹{(item.products?.price || 0) * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <hr />
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
            <hr />
            <div className="summary-row total-row">
              <span>Total Price</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
