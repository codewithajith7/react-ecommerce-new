import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaPlus, FaMinus, FaArrowRight, FaShoppingBag } from "react-icons/fa";
import "./Cart.css";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA";
const AUTH_HEADER = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
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
      console.error("Error fetching cart:", err);
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

  const updateQuantity = async (itemId, currentQty, increment) => {
    const newQty = increment ? currentQty + 1 : currentQty - 1;
    if (newQty < 1) return;

    try {
      // Optimistic update in UI
      setCartItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
      );

      await axios.patch(
        `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?id=eq.${itemId}`,
        { quantity: newQty },
        {
          headers: {
            apikey: API_KEY,
            Authorization: AUTH_HEADER,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
        }
      );
    } catch (err) {
      console.error("Failed to update quantity:", err);
      // Revert in case of error
      fetchCart();
    }
  };

  const deleteItem = async (itemId) => {
    try {
      // Optimistic update in UI
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));

      await axios.delete(
        `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?id=eq.${itemId}`,
        {
          headers: {
            apikey: API_KEY,
            Authorization: AUTH_HEADER,
          },
        }
      );
      alert("Item removed from cart");
    } catch (err) {
      console.error("Failed to delete item:", err);
      fetchCart();
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = item.products?.price || 0;
      return acc + price * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="cart-loading">
        <h2>Loading your cart...</h2>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1 className="cart-heading">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart-view">
          <FaShoppingBag className="empty-cart-icon" />
          <h2>Your cart is empty</h2>
          <p>Explore our beautiful collections and add items to your cart!</p>
          <Link to="/products" className="shop-now-btn">
            Shop Products
          </Link>
        </div>
      ) : (
        <div className="cart-content-grid">
          <div className="cart-items-section">
            {cartItems.map((item) => (
              <div className="cart-item-card" key={item.id}>
                <div className="cart-item-image-wrapper">
                  <img
                    src={item.products?.image}
                    alt={item.products?.title}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-details">
                  <span className="cart-item-category">{item.products?.category}</span>
                  <h3 className="cart-item-title">{item.products?.title}</h3>
                  <p className="cart-item-unit-price">Unit Price: ₹{item.products?.price}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="qty-control-box">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity, false)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity, true)}
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <div className="cart-item-subtotal-price">
                    ₹{ (item.products?.price || 0) * item.quantity }
                  </div>

                  <button className="cart-item-delete-btn" onClick={() => deleteItem(item.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-section">
            <div className="cart-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="free-shipping-note">
                  Add ₹{5000 - subtotal} more for FREE shipping
                </p>
              )}
              <hr />
              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button
                className="checkout-proceed-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;