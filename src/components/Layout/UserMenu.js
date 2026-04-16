// import React from "react";
// import { NavLink } from "react-router-dom";
// import { FaUser, FaShoppingBag, FaEnvelope} from "react-icons/fa";

// const UserMenu = ({ unreadCount = 0 }) => {
//   return (
//     <div className="text-center">
//       <div className="list-group">
//         <h4>Dashboard</h4>
//         <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
//           <FaUser className="me-2" /> Profile
//         </NavLink>
//         <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
//           <FaShoppingBag className="me-2" /> Orders
//         </NavLink>
//         <NavLink to="/dashboard/user/support-messages" className="list-group-item list-group-item-action position-relative">
//           <FaEnvelope className="me-2" /> Support Messages
//           {unreadCount > 0 && (
//             <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
//               {unreadCount}
//             </span>
//           )}
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default UserMenu;

// UserMenu.js - Premium 3D Glassmorphism Sidebar (No functionality changes)
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaUserAlt, 
  FaShoppingBag, 
  FaEnvelope, 
  FaTachometerAlt 
} from "react-icons/fa";
import { useAuth } from "../../context/auth";
import "./UserMenu.css";

const UserMenu = () => {
  const [auth] = useAuth();
  const unreadCount = auth?.user?.unreadSupportCount || 0;

  return (
    <div className="premium-sidebar-container">
      <div className="sidebar-glass-card">
        <div className="sidebar-glow-effect"></div>
        
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="header-icon-wrapper">
            <div className="header-icon-pulse"></div>
            <FaTachometerAlt className="header-icon" />
          </div>
          <h2 className="sidebar-title">Dashboard</h2>
          <div className="title-underline">
            <span className="underline-dot"></span>
            <span className="underline-line"></span>
            <span className="underline-dot"></span>
          </div>
          <p className="sidebar-subtitle">User Panel</p>
        </div>

        {/* Navigation Menu */}
        <div className="sidebar-nav">
          {/* Profile Link */}
          <NavLink 
            to="/dashboard/user/profile" 
            className={({ isActive }) => 
              isActive ? "nav-item-premium active" : "nav-item-premium"
            }
          >
            <div className="nav-icon-wrapper">
              <FaUserAlt className="nav-icon" />
            </div>
            <span className="nav-text">Profile</span>
            <div className="nav-hover-glow"></div>
          </NavLink>

          {/* Orders Link */}
          <NavLink 
            to="/dashboard/user/orders" 
            className={({ isActive }) => 
              isActive ? "nav-item-premium active" : "nav-item-premium"
            }
          >
            <div className="nav-icon-wrapper">
              <FaShoppingBag className="nav-icon" />
            </div>
            <span className="nav-text">Orders</span>
            <div className="nav-hover-glow"></div>
          </NavLink>

          {/* Support Messages Link with Badge */}
          <NavLink 
            to="/dashboard/user/support-messages" 
            className={({ isActive }) => 
              isActive ? "nav-item-premium active" : "nav-item-premium"
            }
          >
            <div className="nav-icon-wrapper">
              <FaEnvelope className="nav-icon" />
            </div>
            <span className="nav-text">Support Messages</span>
            {unreadCount > 0 && (
              <div className="notification-bubble-premium">
                <span className="bubble-text">{unreadCount}</span>
                <div className="bubble-pulse"></div>
              </div>
            )}
            <div className="nav-hover-glow"></div>
          </NavLink>
        </div>

        {/* Decorative Bottom Element */}
        <div className="sidebar-footer-decoration">
          <div className="footer-glow-line"></div>
          <div className="footer-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;