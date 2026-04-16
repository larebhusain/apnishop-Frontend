// import React from "react";
// import Layout from "./../components/Layout/Layout";

// const About = () => {
//   return (
//     <Layout>
//       <div className="row contactus ">
//         <div className="col-md-6 ">
//           <img
//             src="/images/about.jpeg"
//             alt="contactus"
//             style={{ width: "100%" }}
//           />
//         </div>
//         <div className="col-md-4 ">
//           <p className="text-justify mt-2  ">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
//             officiis obcaecati esse tempore unde ratione, eveniet mollitia,
//             perferendis eius temporibus dicta blanditiis doloremque explicabo
//             quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
//             accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
//             commodi illum quidem neque tempora nam.
//           </p>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default About;
// About.js - Premium 3D Glassmorphism About Us Page
import React from "react";
import Layout from "../components/Layout/Layout";
import "./About.css"; // Premium 3D styles

const About = () => {
  return (
    <Layout title={"About Us - Our Story"}>
      {/* Main container - uncommented for proper 3D background */}
      <div className="premium-about-container">
        {/* Animated Gradient Background */}
        <div className="about-animated-bg"></div>
        
        {/* Floating 3D Blurred Shapes */}
        <div className="about-floating-shape shape-1"></div>
        <div className="about-floating-shape shape-2"></div>
        <div className="about-floating-shape shape-3"></div>
        <div className="about-floating-shape shape-4"></div>
        
        <div className="container premium-about-wrapper">
          <div className="row about-glass-row">
            {/* Left Image Section - 3D Tilt Card */}
            <div className="col-md-6 about-image-col">
              <div className="about-image-card">
                <div className="image-card-glow"></div>
                <div className="image-wrapper">
                  <img
                    src="/images/about.jpeg"
                    alt="About Us"
                    className="about-premium-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-icon">🌟</div>
                    <div className="overlay-text">Crafting Excellence Since 2020</div>
                  </div>
                </div>
                <div className="image-card-footer">
                  <div className="footer-icon">🏆</div>
                  <div className="footer-text">Trusted by Thousands</div>
                </div>
              </div>
            </div>
            
            {/* Right Content Section - Glass Card */}
            <div className="col-md-6 about-content-col">
              <div className="about-content-card">
                <div className="content-card-glow"></div>
                
                {/* Header */}
                <div className="about-header">
                  <div className="header-icon-wrapper">
                    <div className="header-icon-pulse"></div>
                    <span className="header-icon">📖</span>
                  </div>
                  <h1 className="about-premium-title">About Us</h1>
                  <div className="about-title-underline">
                    <span className="underline-dot"></span>
                    <span className="underline-line"></span>
                    <span className="underline-dot"></span>
                  </div>
                  <p className="about-subtitle">Who We Are</p>
                </div>
                
                {/* Content Blocks */}
                <div className="about-content-blocks">
                  <div className="about-block">
                    <div className="block-icon">✨</div>
                    <div className="block-content">
                      <p className="block-text">
                        Welcome to <strong className="highlight-text">Ecommerce apni shop</strong> – your trusted partner in 
                        innovative e‑commerce solutions. We are a passionate team dedicated to delivering 
                        exceptional products and unforgettable shopping experiences.
                      </p>
                    </div>
                  </div>
                  
                  <div className="about-block">
                    <div className="block-icon">🎯</div>
                    <div className="block-content">
                      <p className="block-text">
                        Our mission is to bridge the gap between quality and affordability. We curate 
                        premium products from around the world, ensuring every item meets our rigorous 
                        standards of excellence.
                      </p>
                    </div>
                  </div>
                  
                  <div className="about-block">
                    <div className="block-icon">💡</div>
                    <div className="block-content">
                      <p className="block-text">
                        Innovation drives us. From seamless browsing to secure checkout, we leverage 
                        modern technology to make your shopping journey smooth, safe, and enjoyable.
                      </p>
                    </div>
                  </div>
                  
                  <div className="about-block">
                    <div className="block-icon">🤝</div>
                    <div className="block-content">
                      <p className="block-text">
                        Customer satisfaction is our north star. Our dedicated support team works 
                        around the clock to resolve queries and ensure you always feel valued.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="about-footer">
                  <div className="footer-divider"></div>
                  <div className="trust-badge">
                    <span className="badge-icon">✅</span>
                    <span className="badge-text">100% Secure Payments</span>
                    <span className="badge-separator"></span>
                    <span className="badge-icon">🚚</span>
                    <span className="badge-text">Fast Shipping Worldwide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;