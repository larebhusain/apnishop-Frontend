// import React, { useState } from "react";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";
// import { useAuth } from "../../context/auth";
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();

//   // form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/v1/auth/login", {
//         email,
//         password,
//       });
//       if (res && res.data.success) {
//         toast.success(res.data && res.data.message);
//         setAuth({
//           ...auth,
//           user: res.data.user,
//           token: res.data.token,
//         });
//         localStorage.setItem("auth", JSON.stringify(res.data));
//         navigate("/");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };
//   return (
//     <Layout title="Register - Ecommer App">
//       <div className="form-container ">
//         <form onSubmit={handleSubmit}>
//           <h4 className="title">LOGIN FORM</h4>

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
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//               id="exampleInputPassword1"
//               placeholder="Enter Your Password"
//               required
//             />
//           </div>
//           <div className="mb-3 ">
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={() => navigate("/forgot-password")}
//             >
//               forgot password
//             </button>
//           </div>
//           <button type="submit" className="btn btn-primary">
//             LOGIN
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Login;

// Login.js - Premium 3D Glassmorphism Authentication Page
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
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
      
      {/* Floating Blurred Shapes */}
      <div className="auth-floating-shape shape-1"></div>
      <div className="auth-floating-shape shape-2"></div>
      <div className="auth-floating-shape shape-3"></div>
      <div className="auth-floating-shape shape-4"></div>
      
      <div className="premium-auth-wrapper">
        <div className="premium-auth-card glassmorphism-card">
          <div className="card-glow"></div>
          
          {/* Header Section */}
          <div className="auth-header">
            <div className="header-icon-wrapper">
              <div className="header-icon-pulse"></div>
              <span className="header-icon">🔐</span>
            </div>
            <h1 className="auth-premium-title">LOGIN FORM</h1>
            <div className="auth-title-underline">
              <span className="underline-dot"></span>
              <span className="underline-line"></span>
              <span className="underline-dot"></span>
            </div>
            <p className="auth-subtitle">Welcome Back</p>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email Input */}
            <div className="input-group-premium">
              <div className="input-icon">📧</div>
              <input
                type="email"
                className="premium-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="input-focus-glow"></div>
            </div>
            
            {/* Password Input */}
            <div className="input-group-premium">
              <div className="input-icon">🔒</div>
              <input
                type="password"
                className="premium-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="input-focus-glow"></div>
            </div>
            
            {/* Login Button */}
            <button type="submit" className="premium-login-btn">
              <span className="btn-text">Login</span>
              <span className="btn-glow"></span>
              <span className="btn-icon">→</span>
            </button>
            
            {/* Forgot Password Link */}
            <div className="auth-footer-links">
              <button
                type="button"
                className="forgot-password-btn"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>
          </form>
          
          {/* Secure Badge (Visual Only) */}
          <div className="secure-badge">
            <span className="badge-icon">🛡️</span>
            <span className="badge-text">Secure Login Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;