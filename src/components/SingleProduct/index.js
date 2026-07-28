import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SingleProduct.css";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA";
const AUTH_HEADER = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA";

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await axios.get(
          `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/products?id=eq.${id}`,
          {
            headers: {
              apikey: API_KEY,
              Authorization: AUTH_HEADER,
            },
          }
        );
        setSingleProduct(res.data[0]);
      } catch (err) {
        console.error("Error fetching single product:", err);
      }
    };

    fetchSingleProduct();
  }, [id]);

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        return navigate("/login");
      }
      setAdding(true);

      await axios.post(
        "https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart",
        {
          user_id: user.id,
          product_id: singleProduct.id,
          quantity: quantity,
        },
        {
          headers: {
            apikey: API_KEY,
            Authorization: AUTH_HEADER,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
        }
      );
      alert("Item added to cart successfully!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add item to cart.");
    } finally {
      setAdding(false);
    }
  };

  const buyNow = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        return navigate("/login");
      }
      setAdding(true);

      await axios.post(
        "https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart",
        {
          user_id: user.id,
          product_id: singleProduct.id,
          quantity: quantity,
        },
        {
          headers: {
            apikey: API_KEY,
            Authorization: AUTH_HEADER,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
        }
      );
      navigate("/cart");
    } catch (err) {
      console.error("Error with Buy Now:", err);
      alert("Failed to proceed to buy.");
    } finally {
      setAdding(false);
    }
  };

  if (!singleProduct) {
    return (
      <div className="single-page-loading">
        <h2>Loading Product Details...</h2>
      </div>
    );
  }

  return (
    <div className="single-page">
      <div className="breadcrumb">
        Home / Products / {singleProduct.title}
      </div>

      <div className="single-product-container">
        <div className="left-section">
          <div className="image-card">
            <div className="image-box">
              <img
                src={singleProduct.image}
                alt={singleProduct.title}
                className="single-image"
              />
            </div>
          </div>
        </div>

        <div className="right-section">
          <h1 className="product-title">{singleProduct.title}</h1>

          <div className="rating-box">
            <span className="rating">★ 4.8</span>
            <span className="reviews">(120 customer reviews)</span>
          </div>

          <p className="product-description">
            {singleProduct.description}
          </p>

          <div className="price-box">
            <span className="current-price">₹ {singleProduct.price}</span>
            <span className="old-price">₹ {Math.round(singleProduct.price * 1.25)}</span>
            <span className="discount">20% OFF</span>
          </div>

          <p className="tax">
            Inclusive of all taxes
          </p>

          <p className="stock">
            <strong>Stock :</strong> <span>{singleProduct.stock > 0 ? `${singleProduct.stock} Available` : "Out of Stock"}</span>
          </p>

          <p className="category">
            <strong>Category :</strong> <span>{singleProduct.category}</span>
          </p>

          <div className="quantity-wrapper">
            <div className="quantity-title">Quantity</div>
            <div className="quantity-box">
              <button onClick={decrementQty} disabled={quantity <= 1}>-</button>
              <span>{quantity}</span>
              <button onClick={incrementQty}>+</button>
            </div>
          </div>

          <div className="button-group">
            <button className="cart-btn" onClick={addToCart} disabled={adding}>
              {adding ? "ADDING..." : "ADD TO CART"}
            </button>
            <button className="buy-btn" onClick={buyNow} disabled={adding}>
              BUY NOW
            </button>
          </div>

          <div className="delivery-card">
            <h3>Delivery & Services</h3>
            <div className="delivery-item">
              <h4>Free Shipping</h4>
              <p>On orders above ₹5000. Delivered in 3-5 business days.</p>
            </div>
            <div className="delivery-item">
              <h4>7 Days Replacement</h4>
              <p>Easy product replacement if damaged or incorrect size.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;