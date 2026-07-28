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
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Navabar.css";
import { useTheme } from "../ThemeContext";

const Navbar = () => {
  const { mode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowMenu(false);
    setIsMobileMenuOpen(false);
    window.location.href = "/login";
  };

  return (
    <div className="navbar-container">
      <h1 className="logo" onClick={() => { navigate("/"); setIsMobileMenuOpen(false); }}>
        <FaShoppingBag className="logo-icon" />
        ShopNest
      </h1>

      <div className="mobile-header-actions">
        {user && (
          <button
            className="header-logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
        )}
        <button
          className="hamburger-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <nav className={`nav-item-container ${isMobileMenuOpen ? "active" : ""}`}>
        <Link to="/" className="nav-items" onClick={() => setIsMobileMenuOpen(false)}>
          Home
        </Link>

        {user ? (
          <>
            <Link to="/products" className="nav-items" onClick={() => setIsMobileMenuOpen(false)}>
              Products
            </Link>

            <Link to="/cart" className="nav-items" onClick={() => setIsMobileMenuOpen(false)}>
              Cart
            </Link>

            <Link to="/wishlist" className="nav-items" onClick={() => setIsMobileMenuOpen(false)}>
              Wishlist
            </Link>

            <Link to="/orders" className="nav-items" onClick={() => setIsMobileMenuOpen(false)}>
              Orders
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-items" onClick={() => setIsMobileMenuOpen(false)}>
              Login
            </Link>

            <Link to="/register" className="nav-items" onClick={() => setIsMobileMenuOpen(false)}>
              Register
            </Link>
          </>
        )}

        <button
          className="theme-btn"
          onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
          title={mode === "light" ? "Dark Mode" : "Light Mode"}
        >
          {mode === "light" ? <FaMoon /> : <FaSun />}
        </button>

        <div
          className="user-menu"
          onClick={() => user && setShowMenu(!showMenu)}
        >
          <FaUserCircle size={24} />
          <span>{user ? user.username : "Guest"}</span>

          {showMenu && user && (
            <div className="dropdown-menu">
              <div className="dropdown-user">
                <FaUserCircle />
                <span>{user.username}</span>
              </div>

              <Link
                to="/cart"
                className="dropdown-item"
                onClick={() => { setShowMenu(false); setIsMobileMenuOpen(false); }}
              >
                <FaShoppingCart />
                Cart
              </Link>

              <Link
                to="/wishlist"
                className="dropdown-item"
                onClick={() => { setShowMenu(false); setIsMobileMenuOpen(false); }}
              >
                <FaHeart />
                Wishlist
              </Link>

              <Link
                to="/orders"
                className="dropdown-item"
                onClick={() => { setShowMenu(false); setIsMobileMenuOpen(false); }}
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

        {user && (
          <button
            className="logout-mobile-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>
        )}
      </nav>
    </div>
  );
};

export default Navbar;