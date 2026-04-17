// // import React from "react";
// // import Layout from "../../components/Layout/Layout";
// // import UserMenu from "../../components/Layout/UserMenu";
// // import { useAuth } from "../../context/auth";
// // const Dashboard = () => {
// //   const [auth] = useAuth();
// //   return (
// //     <Layout title={"Dashboard - Ecommerce App"}>
// //       <div className="container-flui m-3 p-3">
// //         <div className="row">
// //           <div className="col-md-3">
// //             <UserMenu />
// //           </div>
// //           <div className="col-md-9">
// //             <div className="card w-75 p-3">
// //               <h3>{auth?.user?.name}</h3>
// //               <h3>{auth?.user?.email}</h3>
// //               <h3>{auth?.user?.address}</h3>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default Dashboard;
// import React, { useState, useEffect } from "react";
// import Layout from "../../components/Layout/Layout";
// import UserMenu from "../../components/Layout/UserMenu";
// import { FaBell } from "react-icons/fa";
// import axios from "axios";

// const Dashboard = () => {
//   const [unreadCount, setUnreadCount] = useState(0);

//   useEffect(() => {
//     fetchUnreadCount();
//   }, []);

//   const fetchUnreadCount = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/contact/unread-count");
//       if (data.success) {
//         setUnreadCount(data.count);
//       }
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   return (
//     <Layout title={"Dashboard - User"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <UserMenu unreadCount={unreadCount} />
//           </div>
//           <div className="col-md-9">
//             <div className="card">
//               <div className="card-header bg-primary text-white">
//                 <h3>User Dashboard</h3>
//               </div>
//               <div className="card-body">
//                 <p>Welcome to your dashboard!</p>
//                 {unreadCount > 0 && (
//                   <div className="alert alert-info">
//                     <FaBell /> You have {unreadCount} new support reply(s)!
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;
// Dashboard.js - Premium 3D Glassmorphism Design (No functionality changes)
import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import "../../styles/Dashboard.css"; // Import premium styles

const Dashboard = () => {
  const [auth] = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread notification count - DO NOT CHANGE
  const fetchUnreadCount = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/unread-notifications`);
      setUnreadCount(data.count);
    } catch (error) {
      console.log("Error fetching unread count:", error);
    }
  };

  // useEffect - DO NOT CHANGE
  useEffect(() => {
    fetchUnreadCount();
  }, []);

  return (
    <Layout title={"Dashboard - User Panel"}>
      <div className="premium-dashboard-container">
        {/* Animated Gradient Background */}
        <div className="dashboard-animated-bg"></div>
        
        {/* Floating Blurred Circles */}
        <div className="dashboard-floating-shape shape-1"></div>
        <div className="dashboard-floating-shape shape-2"></div>
        <div className="dashboard-floating-shape shape-3"></div>
        <div className="dashboard-floating-shape shape-4"></div>
        
        <div className="container-fluid premium-dashboard-layout">
          <div className="row g-4">
            {/* Left Column - UserMenu (Unchanged) */}
            <div className="col-md-3">
              <div className="user-menu-premium-wrapper">
                <UserMenu />
              </div>
            </div>
            
            {/* Right Column - Premium Dashboard Panel */}
            <div className="col-md-9">
              <div className="dashboard-glass-container">
                <div className="dashboard-header-section">
                  <div className="header-icon-wrapper">
                    <div className="header-icon-glow"></div>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" fill="url(#dashboardGradient)"/>
                      <defs>
                        <linearGradient id="dashboardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a855f7"/>
                          <stop offset="100%" stopColor="#ec4899"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h1 className="dashboard-premium-title">USER DASHBOARD</h1>
                  <div className="dashboard-title-underline">
                    <span className="underline-dot"></span>
                    <span className="underline-line"></span>
                    <span className="underline-dot"></span>
                  </div>
                  <p className="dashboard-subtitle">Manage your account and notifications</p>
                </div>
                
                {/* Welcome Section - Premium Widget */}
                <div className="welcome-premium-card">
                  <div className="welcome-card-glow"></div>
                  <div className="welcome-avatar">
                    <div className="avatar-ring"></div>
                    <div className="avatar-initial">
                      {auth?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  </div>
                  <div className="welcome-content">
                    <h2 className="welcome-title">
                      Welcome back, <span className="user-name-highlight">{auth?.user?.name || "User"}!</span>
                    </h2>
                    <p className="welcome-message">
                      We're glad to see you again. Manage your account, track orders, and stay updated with your notifications.
                    </p>
                  </div>
                </div>
                
                {/* Quick Stats Section - Static UI Enhancement */}
                <div className="quick-stats-grid">
                  <div className="stat-card stat-card-1">
                    <div className="stat-icon">📬</div>
                    <div className="stat-info">
                      <h4 className="stat-value">{unreadCount}</h4>
                      <p className="stat-label">Unread Notifications</p>
                    </div>
                    <div className="stat-glow"></div>
                  </div>
                  <div className="stat-card stat-card-2">
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                      <h4 className="stat-value">Active</h4>
                      <p className="stat-label">Account Status</p>
                    </div>
                    <div className="stat-glow"></div>
                  </div>
                  <div className="stat-card stat-card-3">
                    <div className="stat-icon">💬</div>
                    <div className="stat-info">
                      <h4 className="stat-value">Support</h4>
                      <p className="stat-label">24/7 Available</p>
                    </div>
                    <div className="stat-glow"></div>
                  </div>
                </div>
                
                {/* Notification Alert Section - Premium Design */}
                <div className="notification-section">
                  <div className="notification-header">
                    <span className="notification-icon">🔔</span>
                    <h3 className="notification-title">Notifications</h3>
                  </div>
                  
                  {unreadCount > 0 ? (
                    <div className="notification-alert-premium">
                      <div className="alert-bell-animation">
                        <div className="bell-ring"></div>
                        <span className="bell-icon">🔔</span>
                        <span className="notification-badge">{unreadCount}</span>
                      </div>
                      <div className="alert-content">
                        <p className="alert-text">
                          You have <strong className="count-highlight">{unreadCount}</strong> new support reply(s)
                        </p>
                        <p className="alert-subtext">
                          Check your messages for updates from support team
                        </p>
                      </div>
                      <div className="alert-glow"></div>
                    </div>
                  ) : (
                    <div className="notification-empty-premium">
                      <div className="empty-icon-wrapper">
                        <span className="empty-icon">🔕</span>
                      </div>
                      <div className="empty-content">
                        <p className="empty-text">No new notifications</p>
                        <p className="empty-subtext">You're all caught up! Check back later for updates.</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Quick Actions Section */}
                <div className="quick-actions-section">
                  <h3 className="actions-title">Quick Actions</h3>
                  <div className="actions-grid">
                    <div className="action-item" onClick={() => window.location.href = '/dashboard/user/profile'}>
                      <div className="action-icon">👤</div>
                      <span className="action-text">Edit Profile</span>
                    </div>
                    <div className="action-item" onClick={() => window.location.href = '/dashboard/user/orders'}>
                      <div className="action-icon">📦</div>
                      <span className="action-text">My Orders</span>
                    </div>
                    <div className="action-item" onClick={() => window.location.href = 'process.evn/cart'}>
                      <div className="action-icon">🛒</div>
                      <span className="action-text">View Cart</span>
                    </div>
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

export default Dashboard;