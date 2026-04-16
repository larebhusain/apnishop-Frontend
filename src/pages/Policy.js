// import React from "react";
// import Layout from "./../components/Layout/Layout";

// const Policy = () => {
//   return (
//     <Layout>
//       <div className="row contactus ">
//         <div className="col-md-6 ">
//           <img
//             src="/images/contactus.jpeg"
//             alt="contactus"
//             style={{ width: "100%" }}
//           />
//         </div>
//         <div className="col-md-4">
//           <p>add privacy policy</p>
//           <p>add privacy policy</p>
//           <p>add privacy policy</p>
//           <p>add privacy policy</p>
//           <p>add privacy policy</p>
//           <p>add privacy policy</p>
//           <p>add privacy policy</p>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Policy;

// Policy.js - Premium 3D Glassmorphism Privacy Policy Page
import React from "react";
import Layout from "./../components/Layout/Layout";
import "./Policy.css"; // Import premium styles

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="premium-policy-container">
        {/* Animated Gradient Background */}
        <div className="policy-animated-bg"></div>
        
        {/* Floating Blurred Shapes */}
        <div className="policy-floating-shape shape-1"></div>
        <div className="policy-floating-shape shape-2"></div>
        <div className="policy-floating-shape shape-3"></div>
        <div className="policy-floating-shape shape-4"></div>
        
        <div className="container policy-premium-container">
          <div className="row policy-glass-row">
            {/* Left Image Section - Premium Visual Card */}
            <div className="col-md-6 policy-image-col">
              <div className="policy-image-card">
                <div className="image-card-glow"></div>
                <div className="image-wrapper">
                  <img
                    src="/images/contactus.jpeg"
                    alt="Privacy Policy"
                    className="policy-premium-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-icon">🔒</div>
                    <div className="overlay-text">Your Privacy Matters</div>
                  </div>
                </div>
                <div className="image-card-footer">
                  <div className="footer-shield-icon">🛡️</div>
                  <div className="footer-text">100% Secure & Protected</div>
                </div>
              </div>
            </div>
            
            {/* Right Content Section - Premium Policy Content */}
            <div className="col-md-6 policy-content-col">
              <div className="policy-content-card">
                <div className="content-card-glow"></div>
                
                {/* Header Section */}
                <div className="policy-header">
                  <div className="header-icon-wrapper">
                    <div className="header-icon-pulse"></div>
                    <span className="header-icon">🔐</span>
                  </div>
                  <h1 className="policy-premium-title">Privacy Policy</h1>
                  <div className="policy-title-underline">
                    <span className="underline-dot"></span>
                    <span className="underline-line"></span>
                    <span className="underline-dot"></span>
                  </div>
                  <p className="policy-subtitle">
                    Your trust is our priority. Learn how we protect your data.
                  </p>
                </div>
                
                {/* Policy Content Blocks */}
                <div className="policy-content-blocks">
                  {/* Information We Collect */}
                  <div className="policy-block">
                    <div className="block-icon">📋</div>
                    <div className="block-content">
                      <h3 className="block-title">Information We Collect</h3>
                      <p className="block-text">
                        We collect information you provide directly to us, such as when you create an account, 
                        update your profile, place an order, or contact customer support. This may include your 
                        name, email address, phone number, shipping address, and payment information.
                      </p>
                    </div>
                  </div>
                  
                  {/* How We Use Your Information */}
                  <div className="policy-block">
                    <div className="block-icon">⚙️</div>
                    <div className="block-content">
                      <h3 className="block-title">How We Use Your Information</h3>
                      <p className="block-text">
                        We use the information we collect to provide, maintain, and improve our services, 
                        process transactions, send order confirmations, communicate with you about updates, 
                        and protect against fraudulent or unauthorized transactions.
                      </p>
                    </div>
                  </div>
                  
                  {/* Information Sharing */}
                  <div className="policy-block">
                    <div className="block-icon">🤝</div>
                    <div className="block-content">
                      <h3 className="block-title">Information Sharing</h3>
                      <p className="block-text">
                        We do not sell, trade, or rent your personal information to third parties. 
                        We may share information with service providers who assist us in operating our website, 
                        conducting our business, or servicing you, as long as those parties agree to keep this 
                        information confidential.
                      </p>
                    </div>
                  </div>
                  
                  {/* Data Security */}
                  <div className="policy-block">
                    <div className="block-icon">🛡️</div>
                    <div className="block-content">
                      <h3 className="block-title">Data Security</h3>
                      <p className="block-text">
                        We implement a variety of security measures to maintain the safety of your personal 
                        information. All sensitive information is transmitted via Secure Socket Layer (SSL) 
                        technology and encrypted in our payment gateway providers database.
                      </p>
                    </div>
                  </div>
                  
                  {/* Your Rights */}
                  <div className="policy-block">
                    <div className="block-icon">📜</div>
                    <div className="block-content">
                      <h3 className="block-title">Your Rights</h3>
                      <p className="block-text">
                        You have the right to access, correct, or delete your personal information. 
                        You may also object to or restrict certain processing of your data. To exercise 
                        these rights, please contact our support team.
                      </p>
                    </div>
                  </div>
                  
                  {/* Cookies Policy */}
                  <div className="policy-block">
                    <div className="block-icon">🍪</div>
                    <div className="block-content">
                      <h3 className="block-title">Cookies Policy</h3>
                      <p className="block-text">
                        We use cookies to enhance your browsing experience, analyze site traffic, and 
                        personalize content. By using our website, you consent to our use of cookies 
                        in accordance with this policy.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Last Updated Section */}
                <div className="policy-footer">
                  <div className="footer-divider"></div>
                  <div className="last-updated">
                    <span className="update-icon">📅</span>
                    <span className="update-text">
                      Last Updated: {new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="contact-support">
                    <span className="contact-icon">📧</span>
                    <span className="contact-text">
                      Questions? Contact us at <a href="mailto:support@example.com" className="contact-link">support@example.com</a>
                    </span>
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

export default Policy;