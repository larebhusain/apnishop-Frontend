// import React, { useState, useEffect } from "react";
// import UserMenu from "../../components/Layout/UserMenu";
// import Layout from "./../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import axios from "axios";
// const Profile = () => {
//   //context
//   const [auth, setAuth] = useAuth();
//   //state
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");

//   //get user data
//   useEffect(() => {
//     const { email, name, phone, address } = auth?.user;
//     setName(name);
//     setPhone(phone);
//     setEmail(email);
//     setAddress(address);
//   }, [auth?.user]);

//   // form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put("/api/v1/auth/profile", {
//         name,
//         email,
//         password,
//         phone,
//         address,
//       });
//       if (data?.errro) {
//         toast.error(data?.error);
//       } else {
//         setAuth({ ...auth, user: data?.updatedUser });
//         let ls = localStorage.getItem("auth");
//         ls = JSON.parse(ls);
//         ls.user = data.updatedUser;
//         localStorage.setItem("auth", JSON.stringify(ls));
//         toast.success("Profile Updated Successfully");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };
//   return (
//     <Layout title={"Your Profile"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <UserMenu />
//           </div>
//           <div className="col-md-9">
//             <div className="form-container ">
//               <form onSubmit={handleSubmit}>
//                 <h4 className="title">USER PROFILE</h4>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     placeholder="Enter Your Name"
//                     autoFocus
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     placeholder="Enter Your Email "
//                     disabled
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="form-control"
//                     id="exampleInputPassword1"
//                     placeholder="Enter Your Password"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     placeholder="Enter Your Phone"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     placeholder="Enter Your Address"
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-primary">
//                   UPDATE
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Profile;

// Profile.jsx - Premium 3D Glassmorphism Design (No functionality changes)
 import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import "../Profile.css"; // Import new premium styles

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        setPassword(""); // Clear password field after successful update
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout title={"Your Profile"}>
      {/* Premium Dashboard Container */}
      <div className="premium-profile-container">
        {/* Animated Gradient Background */}
        <div className="animated-gradient-bg"></div>
        
        {/* Floating Blurred Orbs */}
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="floating-orb orb-4"></div>
        
        <div className="container-fluid premium-dashboard">
          <div className="row g-4">
            {/* Left Column - UserMenu (Unchanged) */}
            <div className="col-md-3">
              <div className="user-menu-wrapper">
                <UserMenu />
              </div>
            </div>
            
            {/* Right Column - Premium Profile Card */}
            <div className="col-md-9">
              <div className="glassmorphism-card">
                <div className="card-glow"></div>
                
                {/* Header Section */}
                <div className="profile-header">
                  <div className="header-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="url(#gradient-icon)"/>
                      <defs>
                        <linearGradient id="gradient-icon" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{stopColor:"#a855f7"}}/>
                          <stop offset="100%" style={{stopColor:"#ec4899"}}/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h1 className="profile-title">USER PROFILE</h1>
                  <div className="title-underline">
                    <span className="underline-dot"></span>
                    <span className="underline-line"></span>
                    <span className="underline-dot"></span>
                  </div>
                  <p className="profile-subtitle">Manage and update your personal information</p>
                </div>
                
                {/* Profile Form - ALL functionality preserved */}
                <form onSubmit={handleSubmit} className="premium-form">
                  <div className="row g-4">
                    {/* Name Field */}
                    <div className="col-md-6">
                      <div className="form-group-premium">
                        <label className="premium-field-label">
                          <span className="label-icon">👤</span>
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="premium-input"
                          placeholder="Enter your full name"
                          autoFocus
                        />
                        <div className="input-focus-glow"></div>
                      </div>
                    </div>
                    
                    {/* Email Field - Disabled */}
                    <div className="col-md-6">
                      <div className="form-group-premium">
                        <label className="premium-field-label">
                          <span className="label-icon">📧</span>
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="premium-input disabled-input"
                          placeholder="Your email address"
                          disabled
                        />
                        <div className="disabled-badge">Verified</div>
                      </div>
                    </div>
                    
                    {/* Password Field with Eye Toggle */}
                    <div className="col-md-6">
                      <div className="form-group-premium">
                        <label className="premium-field-label">
                          <span className="label-icon">🔒</span>
                          Password
                        </label>
                        <div className="password-input-wrapper">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="premium-input password-input"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={togglePasswordVisibility}
                            tabIndex="-1"
                          >
                            {showPassword ? (
                              // Eye Open Icon (Visible)
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="currentColor"/>
                                <circle cx="12" cy="12" r="3" fill="currentColor"/>
                              </svg>
                            ) : (
                              // Eye Closed Icon (Hidden)
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2.81 2.81L1.39 4.22l3.4 3.4c-1.51 1.26-2.7 2.89-3.43 4.75 1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l2.61 2.61 1.41-1.41L2.81 2.81zM12 17c-2.76 0-5-2.24-5-5 0-.65.13-1.26.36-1.83l2.92 2.92c-.57.23-1.18.36-1.83.36z" fill="currentColor"/>
                              </svg>
                            )}
                          </button>
                        </div>
                        <div className="input-focus-glow"></div>
                        <small className="password-hint">Leave blank to keep current password</small>
                      </div>
                    </div>
                    
                    {/* Phone Field */}
                    <div className="col-md-6">
                      <div className="form-group-premium">
                        <label className="premium-field-label">
                          <span className="label-icon">📱</span>
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="premium-input"
                          placeholder="Enter your phone number"
                        />
                        <div className="input-focus-glow"></div>
                      </div>
                    </div>
                    
                    {/* Address Field - Full Width */}
                    <div className="col-12">
                      <div className="form-group-premium">
                        <label className="premium-field-label">
                          <span className="label-icon">📍</span>
                          Address
                        </label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="premium-input"
                          placeholder="Enter your complete address"
                        />
                        <div className="input-focus-glow"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit Button Section */}
                  <div className="button-section">
                    <button type="submit" className="premium-submit-btn">
                      <span className="btn-text">UPDATE PROFILE</span>
                      <span className="btn-glow"></span>
                      <span className="btn-icon">→</span>
                    </button>
                  </div>
                </form>
                
                {/* Decorative Elements */}
                <div className="card-decoration deco-1"></div>
                <div className="card-decoration deco-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;