import NewList from "../NewList";
import "./Home.css";
import heroImg from "../images/world_class_hero_bg.jpg";

const Home = () => {
  const handleScrollToArrivals = () => {
    const section = document.getElementById("new-arrivals-section");
    if (section) {
      section.scrollIntoView({behavior: "smooth"});
    }
  };

  return (
    <>
      <div className="hero-container">
        <div className="hero-content-wrapper">
          <div className="hero-left-section">
            <span className="hero-badge">NEW COLLECTION 2026</span>
            <h1 className="hero-title">Elevate Your Style With Handcrafted Elegance</h1>
            <p className="hero-subtitle">
              Discover our exclusive range of premium sarees, from traditional Kanchipuram silks to lightweight georgettes. Handpicked designs tailored for your special moments.
            </p>
            <div className="hero-buttons">
              <button onClick={handleScrollToArrivals} className="hero-cta-primary">
                Shop New Arrivals
              </button>
              <a href="/products" className="hero-cta-secondary">
                Browse Collection
              </a>
            </div>
          </div>
          
          <div className="hero-right-section">
            <div className="hero-image-card">
              <img 
                src={heroImg} 
                alt="Premium Saree Showcase" 
                className="hero-image"
              />
              <div className="hero-image-badge">Luxury Collection</div>
            </div>
          </div>
        </div>
      </div>

      <div id="new-arrivals-section" className="arrivals-section">
        <h1 className="section-title">New Arrivals</h1>
        <NewList />
      </div>
    </>
  );
};

export default Home;