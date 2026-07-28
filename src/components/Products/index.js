import { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";



const Products = () => {
  const navigate = useNavigate();
  const [product, setproduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res = await axios.get(
          "https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/products",
          {
            headers: {
              apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
            },
          }
        );

        console.log(res.data);
        setproduct(res.data);
      } catch (err) {
        console.log("something went wrong", err);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (items) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        return navigate("/login");
      } else {
        const res = await axios.post(
          "https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart",
          {
            user_id: user.id,
            product_id: items.id,
            quantity: 1,
          },
          {
            headers: {
              apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
              "Content-Type": "application/json",
              Prefer: "return=representation",
            },
          }
        );

        console.log(res.data);
        alert("Item added to the cart");
      }
    } catch (err) {
      console.log("something went wrong", err);
      alert("Failed to cart");
    }
  };

  const addToWishlist = async (Products) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        return navigate("/login");
      }

      let res = await axios.post(
        "https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/wishlist",
        {
          user_id: user.id,
          product_id: Products.id,
        },
        {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
        }
      );
      console.log(res.data);
      alert("Item saved in wishlist");
    } catch (err) {
      console.log("something went wrong", err);
    }
  };

 return (
  <div className="product-container">
    {product.map((items) => (
      <div className="product-card" key={items.id}>
        <div className="image-wrapper">
          <Link to={`/products/${items.id}`}>
            <img
              src={items.image}
              alt={items.title}
              className="image-cart"
            />
          </Link>

          <button
            className="wishlist-btn"
            onClick={() => addToWishlist(items)}
          >
            <FaHeart />
          </button>
        </div>

        <h3>{items.title}</h3>
        <h3>{items.description}</h3>
        <p className="price">Price: {items.price}</p>
        <p>Stock: {items.stock}</p>
        <p>Category: {items.category}</p>

        <button onClick={() => addToCart(items)}>
          Add to Cart
        </button>
      </div>
    ))}
  </div>
);
};   // <-- You are missing this line

export default Products;