import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import SingleProduct from "./components/SingleProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import Footer from "./components/Footer";

import { useState } from "react";


const App = () => {

  const [getValue, SetGetValue] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );


  return (
    <Router>

      <Navbar displayUser={getValue} />


      <Routes>

        {/* Public Pages */}
        <Route 
          path="/" 
          element={<Home />} 
        />


        <Route 
          path="/login" 
          element={
            <Login updateUser={SetGetValue} />
          } 
        />


        <Route 
          path="/register" 
          element={<Register />} 
        />


        {/* Protected Pages */}

        <Route 
          path="/products" 
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } 
        />


        <Route 
          path="/products/:id" 
          element={
            <ProtectedRoute>
              <SingleProduct />
            </ProtectedRoute>
          } 
        />


        <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } 
        />


        <Route 
          path="/wishlist" 
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } 
        />


        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } 
        />


        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } 
        />


      </Routes>

      {/* Back to Portfolio Floating Button */}
      <a 
        href="https://portfolio-omega-seven-zp267jfa2j.vercel.app" 
        style={{
          position: "fixed", 
          bottom: "20px", 
          left: "20px", 
          background: "rgba(15, 23, 42, 0.95)", 
          color: "#38bdf8", 
          padding: "12px 22px", 
          borderRadius: "50px", 
          textDecoration: "none", 
          fontFamily: "sans-serif", 
          fontSize: "14px", 
          fontWeight: "600", 
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)", 
          zIndex: 10000, 
          display: "flex", 
          alignItems: "center", 
          gap: "8px", 
          border: "1px solid rgba(255,255,255,0.1)", 
          backdropFilter: "blur(10px)", 
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(56,189,248,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
        }}
      >
        <span style={{ fontSize: "16px" }}>←</span> Back to Portfolio
      </a>

      <Footer />

    </Router>
  );
};


export default App;