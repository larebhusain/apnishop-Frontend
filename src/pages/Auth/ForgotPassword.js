// import React, { useState } from "react";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";

// const ForgotPasssword = () => {
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [answer, setAnswer] = useState("");

//   const navigate = useNavigate();

//   // form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/v1/auth/forgot-password", {
//         email,
//         newPassword,
//         answer
//       });
//       if (res && res.data.success) {
//         toast.success(res.data && res.data.message);

//         navigate("/login");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };
//   return (
//     <Layout title={"Forgot Password - Ecommerce APP"}>
//       <div className="form-container ">
//         <form onSubmit={handleSubmit}>
//           <h4 className="title">RESET PASSWORD</h4>

//           <div className="mb-3">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Email "
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your favorite Sport Name "
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="form-control"
//               id="exampleInputPassword1"
//               placeholder="Enter Your Password"
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary">
//             RESET
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default ForgotPasssword;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="premium-auth-container">
      {/* Animated Gradient Background */}
      <div className="auth-animated-bg"></div>

      {/* Floating 3D Blobs */}
      <div className="auth-floating-shape shape-1"></div>
      <div className="auth-floating-shape shape-2"></div>
      <div className="auth-floating-shape shape-3"></div>
      <div className="auth-floating-shape shape-4"></div>

      <div className="premium-auth-wrapper forgot-wrapper">
        <div className="premium-auth-card glassmorphism-card">
          <div className="card-glow"></div>

          {/* Header Section */}
          <div className="auth-header">
            <div className="header-icon-wrapper">
              <div className="header-icon-pulse"></div>
              <span className="header-icon">🔑</span>
            </div>
            <h1 className="auth-premium-title">RESET PASSWORD</h1>
            <div className="auth-title-underline">
              <span className="underline-dot"></span>
              <span className="underline-line"></span>
              <span className="underline-dot"></span>
            </div>
            <p className="auth-subtitle">Recover Access Securely</p>
          </div>

          {/* Password Recovery Form */}
          <form onSubmit={handleSubmit} className="auth-form forgot-form">
            {/* Email */}
            <div className="input-group-premium">
              <div className="input-icon">📧</div>
              <input
                type="email"
                className="premium-input"
                placeholder="Registered Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="input-focus-glow"></div>
            </div>

            {/* Security Answer (Favorite Sport) */}
            <div className="security-field-wrapper">
              <div className="security-label">
                <span className="security-icon">🛡️</span>
                <span className="security-text">Security Verification: Favorite Sport</span>
              </div>
              <div className="input-group-premium">
                <div className="input-icon">⚽</div>
                <input
                  type="text"
                  className="premium-input"
                  placeholder="Your answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
                <div className="input-focus-glow"></div>
              </div>
            </div>

            {/* New Password */}
            <div className="input-group-premium">
              <div className="input-icon">🔒</div>
              <input
                type="password"
                className="premium-input"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <div className="input-focus-glow"></div>
            </div>

            {/* Reset Button */}
            <button type="submit" className="premium-login-btn reset-btn">
              <span className="btn-text">Reset Password</span>
              <span className="btn-glow"></span>
              <span className="btn-icon">→</span>
            </button>
          </form>

          {/* Decorative bottom text */}
          <div className="secure-badge">
            <span className="badge-icon">⚡</span>
            <span className="badge-text">Secure • Verified • Fast Recovery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;