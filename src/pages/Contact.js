// import React from "react";
// import Layout from "./../components/Layout/Layout";
// import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
// const Contact = () => {
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
//           <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
//           <p className="text-justify mt-2">
//             any query and info about prodduct feel free to call anytime we 24X7
//             vaialible
//           </p>
//           <p className="mt-3">
//             <BiMailSend /> : www.help@ecommerceapp.com
//           </p>
//           <p className="mt-3">
//             <BiPhoneCall /> : 012-3456789
//           </p>
//           <p className="mt-3">
//             <BiSupport /> : 1800-0000-0000 (toll free)
//           </p>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Contact;
import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { FaUser, FaEnvelope, FaPhone,  FaCommentDots } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await axios.post("/api/v1/contact/send-message", formData);
      
      if (data.success) {
        toast.success(data.message || "Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Contact Us - Ecommerce App"}>
      <div className="contact-page">
        <div className="contact-container">
          {/* Hero Section */}
          <div className="contact-hero">
            <h1 className="contact-hero-title">
              Get in Touch
              <span className="hero-dot">.</span>
            </h1>
            <p className="contact-hero-subtitle">
              We'd love to hear from you. Our team is here to help you 24/7
            </p>
          </div>

          <div className="contact-grid">
            {/* Left Side - Contact Image */}
            <div className="contact-image-wrapper">
              <div className="image-card">
                <div className="image-glow"></div>
                <img
                  src="/images/contactus.jpeg"
                  alt="Contact Us"
                  className="contact-image"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80";
                  }}
                />
                <div className="image-overlay"></div>
                <div className="image-badge">
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Info & Form */}
            <div className="contact-content">
              {/* Header Section */}
              <div className="contact-header">
                <h2 className="contact-title">
                  Contact 
                  <span className="gradient-text"> Us</span>
                </h2>
                <div className="title-underline"></div>
                <p className="contact-subtitle">
                  We're available 24/7 for your support
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="contact-info-grid">
                <div className="info-card">
                  <div className="info-icon-wrapper">
                    <div className="info-icon-glow"></div>
                    <BiMailSend className="info-icon" />
                  </div>
                  <div className="info-content">
                    <h4>Email Us</h4>
                    <p>support@ecommerce.com</p>
                    <p className="info-detail">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon-wrapper">
                    <div className="info-icon-glow"></div>
                    <BiPhoneCall className="info-icon" />
                  </div>
                  <div className="info-content">
                    <h4>Call Us</h4>
                    <p>+1 234 567 8900</p>
                    <p className="info-detail">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon-wrapper">
                    <div className="info-icon-glow"></div>
                    <BiSupport className="info-icon" />
                  </div>
                  <div className="info-content">
                    <h4>24/7 Support</h4>
                    <p>Toll Free: 1-800-123-4567</p>
                    <p className="info-detail">Available around the clock</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-wrapper">
                <h3 className="form-title">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <div className="input-wrapper">
                      <FaUser className="input-icon" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder=" "
                      />
                      <label className="floating-label">Full Name</label>
                      <div className="input-border"></div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-wrapper">
                      <FaEnvelope className="input-icon" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder=" "
                      />
                      <label className="floating-label">Email Address</label>
                      <div className="input-border"></div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-wrapper">
                      <FaPhone className="input-icon" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder=" "
                      />
                      <label className="floating-label">Phone Number</label>
                      <div className="input-border"></div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-wrapper">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder=" "
                      />
                      <label className="floating-label">Subject</label>
                      <div className="input-border"></div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-wrapper textarea-wrapper">
                      <FaCommentDots className="input-icon textarea-icon" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="form-textarea"
                        rows="4"
                        placeholder=" "
                      ></textarea>
                      <label className="floating-label">Your Message</label>
                      <div className="input-border"></div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-small"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="btn-glow"></span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;