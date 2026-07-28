import { Link } from "react-router-dom";
import { FaShoppingBag, FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-brand-section">
          <div className="footer-logo">
            <FaShoppingBag className="footer-logo-icon" />
            <span>ShopNest</span>
          </div>
          <p className="footer-description">
            Your premier destination for handcrafted elegance. Experience curated collections of traditional sarees and premium clothing tailored for your special moments.
          </p>
          <div className="footer-social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaPinterest />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-links-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/orders">My Orders</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="footer-contact-section">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <FaMapMarkerAlt />
              <span>Hyderabad, Telangana, India</span>
            </li>
            <li>
              <FaPhoneAlt />
              <span>+91 98765 43210</span>
            </li>
            <li>
              <FaEnvelope />
              <span>support@shopnest.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; {currentYear} ShopNest. All Rights Reserved.</p>
          <div className="payment-gateways">
            <span className="payment-badge">Visa</span>
            <span className="payment-badge">Mastercard</span>
            <span className="payment-badge">RuPay</span>
            <span className="payment-badge">UPI</span>
            <span className="payment-badge">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
