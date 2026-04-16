 

import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FiHome, 
  FiGrid, 
  FiPackage, 
  FiPlusCircle, 
  FiShoppingCart, 
  FiUsers,
  FiMail 
} from "react-icons/fi";
import "./AdminMenu.css";

const AdminMenu = () => {
  return (
    <div className="premium-sidebar">
      {/* Animated Background Particles */}
      <div className="sidebar-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      {/* Main Glass Card */}
      <div className="sidebar-glass">
        {/* Neon Border Glow */}
        <div className="neon-border"></div>
        
        {/* Shimmer Effect */}
        <div className="shimmer-effect"></div>

        {/* Premium Header */}
        <div className="sidebar-header">
          <div className="header-glow"></div>
          <div className="crown-container">
            <div className="crown-ring">👑</div>
            <div className="crown-pulse"></div>
          </div>
          <div className="header-text">
            <h3 className="admin-title">
              <span className="title-word">Admin</span>
              <span className="title-word highlight">Panel</span>
            </h3>
            <div className="title-underline">
              <div className="underline-glow"></div>
            </div>
          </div>
        </div>

        {/* Premium Navigation Menu */}
        <div className="sidebar-nav">
          {/* Dashboard */}
          <NavLink 
            to="/dashboard/admin" 
            className={({ isActive }) => 
              `nav-premium ${isActive ? 'active-premium' : ''}`
            }
          >
            <div className="nav-icon-badge">
              <FiHome className="nav-premium-icon" />
              <div className="icon-glow-ring"></div>
            </div>
            <span className="nav-premium-text">Dashboard</span>
            <div className="nav-active-indicator"></div>
            <div className="nav-hover-glow"></div>
          </NavLink>

          {/* Create Category */}
          <NavLink 
            to="/dashboard/admin/create-category" 
            className={({ isActive }) => 
              `nav-premium ${isActive ? 'active-premium' : ''}`
            }
          >
            <div className="nav-icon-badge">
              <FiGrid className="nav-premium-icon" />
              <div className="icon-glow-ring"></div>
            </div>
            <span className="nav-premium-text">Create Category</span>
            <div className="nav-active-indicator"></div>
            <div className="nav-hover-glow"></div>
          </NavLink>

          {/* Create Product */}
          <NavLink 
            to="/dashboard/admin/create-product" 
            className={({ isActive }) => 
              `nav-premium ${isActive ? 'active-premium' : ''}`
            }
          >
            <div className="nav-icon-badge">
              <FiPlusCircle className="nav-premium-icon" />
              <div className="icon-glow-ring"></div>
            </div>
            <span className="nav-premium-text">Create Product</span>
            <div className="nav-active-indicator"></div>
            <div className="nav-hover-glow"></div>
          </NavLink>

          {/* Products */}
          <NavLink 
            to="/dashboard/admin/products" 
            className={({ isActive }) => 
              `nav-premium ${isActive ? 'active-premium' : ''}`
            }
          >
            <div className="nav-icon-badge">
              <FiPackage className="nav-premium-icon" />
              <div className="icon-glow-ring"></div>
            </div>
            <span className="nav-premium-text">Products</span>
            <div className="nav-active-indicator"></div>
            <div className="nav-hover-glow"></div>
          </NavLink>

          {/* Orders */}
          <NavLink 
            to="/dashboard/admin/orders" 
            className={({ isActive }) => 
              `nav-premium ${isActive ? 'active-premium' : ''}`
            }
          >
            <div className="nav-icon-badge">
              <FiShoppingCart className="nav-premium-icon" />
              <div className="icon-glow-ring"></div>
            </div>
            <span className="nav-premium-text">Orders</span>
            <div className="nav-active-indicator"></div>
            <div className="nav-hover-glow"></div>
          </NavLink>

          {/* Users */}
          <NavLink 
            to="/dashboard/admin/users" 
            className={({ isActive }) => 
              `nav-premium ${isActive ? 'active-premium' : ''}`
            }
          >
            <div className="nav-icon-badge">
              <FiUsers className="nav-premium-icon" />
              <div className="icon-glow-ring"></div>
            </div>
            <span className="nav-premium-text">Users</span>
            <div className="nav-active-indicator"></div>
            <div className="nav-hover-glow"></div>
          </NavLink>

          {/* Contact Messages with Premium Badge */}
          <NavLink 
            to="/dashboard/admin/contact-messages" 
            className={({ isActive }) => 
              `nav-premium ${isActive ? 'active-premium' : ''}`
            }
          >
            <div className="nav-icon-badge">
              <FiMail className="nav-premium-icon" />
              <div className="icon-glow-ring"></div>
            </div>
            <span className="nav-premium-text">Contact Messages</span>
            <div className="unread-badge-premium" id="unreadBadge" style={{ display: 'none' }}>
              <span className="badge-text">New</span>
              <div className="badge-pulse"></div>
            </div>
            <div className="nav-active-indicator"></div>
            <div className="nav-hover-glow"></div>
          </NavLink>
        </div>

        {/* Premium Footer */}
        <div className="sidebar-footer">
          <div className="footer-glass">
            <div className="security-status">
              <div className="status-dot">
                <div className="dot-pulse"></div>
              </div>
              <span className="status-text">Secure Admin Area</span>
            </div>
            <div className="footer-shield">🛡️</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;