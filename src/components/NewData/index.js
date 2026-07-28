import "./NewData.css";

const NewData = ({ arrivals }) => {
  const {
    name,
    image,
    price,
    oldPrice,
    rating,
    discount,
    badge,
    category,
  } = arrivals;

  return (
    <div className="product-card">
      <div className="image-box">
        <img src={image} alt={name} className="product-image" />
        <span className="badge">{badge}</span>
      </div>

      <div className="product-content">
        <p className="category">{category}</p>

        <h3 className="product-name">{name}</h3>

        <div className="price-box">
          <span className="price">₹{price}</span>
          <span className="old-price">₹{oldPrice}</span>
          <span className="discount">{discount} OFF</span>
        </div>

        <div className="rating">
          ⭐ {rating}
        </div>

        <button className="add-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default NewData;