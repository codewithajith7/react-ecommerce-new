import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingBag,
  FaUserCircle,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import "./Navabar.css";
import { useTheme } from "../ThemeContext";

const Navbar = () => {
  const { mode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowMenu(false);
    window.location.href = "/login";
  };

  return (
    <div className="navbar-container">

      <h1 className="logo">
        <FaShoppingBag className="logo-icon" />
        ShopNest
      </h1>

      <nav className="nav-item-container">

        <Link to="/" className="nav-items">
          Home
        </Link>


        {user ? (
          <>
            <Link to="/products" className="nav-items">
              Products
            </Link>

            <Link to="/cart" className="nav-items">
              Cart
            </Link>

            <Link to="/wishlist" className="nav-items">
              Wishlist
            </Link>

            <Link to="/orders" className="nav-items">
              Orders
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-items">
              Login
            </Link>

            <Link to="/register" className="nav-items">
              Register
            </Link>
          </>
        )}


        <button
          className="theme-btn"
          onClick={toggleTheme}
          title={mode === "light" ? "Dark Mode" : "Light Mode"}
        >
          {mode === "light" ? <FaMoon /> : <FaSun />}
        </button>


        <div
          className="user-menu"
          onClick={() => user && setShowMenu(!showMenu)}
        >

          <FaUserCircle size={24} />

          <span>
            {user ? user.username : "Guest"}
          </span>


          {showMenu && user && (
            <div className="dropdown-menu">

              <div className="dropdown-user">
                <FaUserCircle />
                <span>{user.username}</span>
              </div>


              <Link
                to="/cart"
                className="dropdown-item"
                onClick={() => setShowMenu(false)}
              >
                <FaShoppingCart />
                Cart
              </Link>


              <Link
                to="/wishlist"
                className="dropdown-item"
                onClick={() => setShowMenu(false)}
              >
                <FaHeart />
                Wishlist
              </Link>

              <Link
                to="/orders"
                className="dropdown-item"
                onClick={() => setShowMenu(false)}
              >
                <FaShoppingBag />
                Orders
              </Link>


              <button
                className="logout-item"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>
          )}

        </div>

      </nav>

    </div>
  );
};

export default Navbar;