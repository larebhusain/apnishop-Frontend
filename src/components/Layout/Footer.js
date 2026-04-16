// import { Link } from "react-router-dom";
// const Footer = () => {
//   return (
//     <div className="footer">
//       <h1 className="text-center">All Right Reserved &copy; Techinfoyt</h1>
//       <p className="text-center mt-3">
//         <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
//         <Link to="/policy">Privacy Policy</Link>
//       </p>
//     </div>
//   );
// };

// export default Footer;
// Footer.js - Premium 3D Glassmorphism Footer (No functionality changes)
 
import { Link } from "react-router-dom";
import "../../styles/Footer.css"; // Import premium styles

const Footer = () => {
  return (
    <footer className="premium-footer-container">
      {/* Animated Background Blobs */}
      <div className="footer-bg-blob blob-1"></div>
      <div className="footer-bg-blob blob-2"></div>
      <div className="footer-bg-blob blob-3"></div>
      
      <div className="premium-footer-glass">
        {/* Top Glow Line */}
        <div className="footer-top-glow"></div>
        
        {/* <div className="container premium-footer-content"> */}
          {/* Brand Section */}
          <div className="footer-brand-section">
            <div className="brand-icon-wrapper">
              <span className="brand-icon">✨</span>
            </div>
            <p className="footer-copyright-text">
              All Right Reserved © <span className="brand-highlight">Ecommerce App</span>
            </p>
            <div className="brand-decoration">
              <span className="deco-dot"></span>
              <span className="deco-line"></span>
              <span className="deco-dot"></span>
            </div>
          </div>
          
          {/* Navigation Links Section */}
          <div className="footer-nav-section">
            <div className="footer-nav-links">
              <Link to="/about" className="footer-nav-link">
                <span className="link-icon">🏠</span>
                <span className="link-text">About</span>
                <span className="link-glow"></span>
              </Link>
              
              <div className="link-separator">
                <span className="separator-dot"></span>
              </div>
              
              <Link to="/contact" className="footer-nav-link">
                <span className="link-icon">📞</span>
                <span className="link-text">Contact</span>
                <span className="link-glow"></span>
              </Link>
              
              <div className="link-separator">
                <span className="separator-dot"></span>
              </div>
              
              <Link to="/policy" className="footer-nav-link">
                <span className="link-icon">🔒</span>
                <span className="link-text">Privacy Policy</span>
                <span className="link-glow"></span>
              </Link>
            </div>
          </div>
          
          {/* Decorative Bottom Section */}
          <div className="footer-bottom-decoration">
            <div className="footer-shine"></div>
            <div className="footer-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>
      {/* </div> */}
    </footer>
  );
};

export default Footer;