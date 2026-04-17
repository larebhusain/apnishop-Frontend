
// import React, { useState } from "react";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";
// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [answer, setAnswer] = useState("");
//   const navigate = useNavigate();

//   // form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/v1/auth/register", {
//         name,
//         email,
//         password,
//         phone,
//         address,
//         answer,

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
//     <Layout title="Register - Ecommer App">
//       <div className="form-container ">
//         <form onSubmit={handleSubmit}>
//           <h4 className="title">REGISTER FORM</h4>
//           <div className="mb-3">
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Name"
//               required
//               autoFocus
//             />
//           </div>
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
//           <div className="mb-3">
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Phone"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Address"
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
//               placeholder="what is your favourite sport?"
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">
//             REGISTER
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
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

      <div className="premium-auth-wrapper register-wrapper">
        <div className="premium-auth-card glassmorphism-card">
          <div className="card-glow"></div>

          {/* Header Section */}
          <div className="auth-header">
            <div className="header-icon-wrapper">
              <div className="header-icon-pulse"></div>
              <span className="header-icon">✨</span>
            </div>
            <h1 className="auth-premium-title">REGISTER FORM</h1>
            <div className="auth-title-underline">
              <span className="underline-dot"></span>
              <span className="underline-line"></span>
              <span className="underline-dot"></span>
            </div>
            <p className="auth-subtitle">Create Your Account</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="auth-form register-form">
            {/* Name */}
            <div className="input-group-premium">
              <div className="input-icon">👤</div>
              <input
                type="text"
                className="premium-input"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="input-focus-glow"></div>
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Phone */}
            <div className="input-group-premium">
              <div className="input-icon">📞</div>
              <input
                type="tel"
                className="premium-input"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <div className="input-focus-glow"></div>
            </div>

            {/* Address */}
            <div className="input-group-premium">
              <div className="input-icon">📍</div>
              <input
                type="text"
                className="premium-input"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <div className="input-focus-glow"></div>
            </div>

            {/* Security Question – visual label + input */}
            <div className="security-field-wrapper">
              <div className="security-label">
                <span className="security-icon">🛡️</span>
                <span className="security-text">Security Question: Favorite Sport</span>
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

            {/* Register Button */}
            <button type="submit" className="premium-login-btn register-btn">
              <span className="btn-text">Register</span>
              <span className="btn-glow"></span>
              <span className="btn-icon">→</span>
            </button>
          </form>

          {/* Decorative bottom text */}
          <div className="secure-badge">
            <span className="badge-icon">⚡</span>
            <span className="badge-text">Fast • Secure • Reliable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;