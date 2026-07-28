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

      <Footer />

    </Router>
  );
};


export default App;