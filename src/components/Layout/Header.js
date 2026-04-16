 
// import React from "react";
// import { NavLink, Link } from "react-router-dom";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import SearchInput from "../Form/SearchInput";
// import useCategory from "../../hooks/useCategory";
// import { useCart} from "../../context/cart";
// import { Badge } from "antd";
// import { TiShoppingCart } from "react-icons/ti";

// const Header = () => {
//   const [auth, setAuth] = useAuth();
//   const [cart] = useCart();
//   const categories = useCategory();
//   const handleLogout = () => {
//     setAuth({
//       ...auth,
//       user: null,
//       token: "",
//     });
//     localStorage.removeItem("auth");
//     toast.success("Logout Successfully");
//   };
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarTogglerDemo01"
//             aria-controls="navbarTogglerDemo01"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//             <Link to="/" className="navbar-brand">
//               🛒 Ecommerce App
//             </Link>
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//               <SearchInput />
//               <li className="nav-item">
//                 <NavLink to="/" className="nav-link ">
//                   Home
//                 </NavLink>
//               </li>
//               <li className="nav-item dropdown">
//                 <Link
//                   className="nav-link dropdown-toggle"
//                   to={"/categories"}
//                   data-bs-toggle="dropdown"
//                 >
//                   Categories
//                 </Link>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <Link className="dropdown-item" to={"/categories"}>
//                       All Categories
//                     </Link>
//                   </li>
//                   {categories?.map((c) => (
//                     <li key={c._id}>
//                       <Link
//                         className="dropdown-item"
//                         to={`/category/${c.slug}`}
//                       >
//                         {c.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </li>

//               {!auth?.user ? (
//                 <>
//                   <li className="nav-item">
//                     <NavLink to="/register" className="nav-link">
//                       Register
//                     </NavLink>
//                   </li>
//                   <li className="nav-item">
//                     <NavLink to="/login" className="nav-link">
//                       Login
//                     </NavLink>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li className="nav-item dropdown">
//                     <NavLink
//                       className="nav-link dropdown-toggle"
//                       role="button"
//                       data-bs-toggle="dropdown"
//                       style={{ border: "none" }}
//                     >
//                       {auth?.user?.name}
//                     </NavLink>
//                     <ul className="dropdown-menu">
//                       <li>
//                         <NavLink
//                           to={`/dashboard/${
//                             auth?.user?.role === 1 ? "admin" : "user"
//                           }`}
//                           className="dropdown-item"
//                         >
//                           Dashboard
//                         </NavLink>
//                       </li>
//                       <li>
//                         <NavLink
//                           onClick={handleLogout}
//                           to="/login"
//                           className="dropdown-item"
//                         >
//                           Logout
//                         </NavLink>
//                       </li>
//                     </ul>
//                   </li>
//                 </>
//               )}
//               <li className="nav-item">
//                 <Badge count={cart?.length}>
//                   <NavLink to="/cart" className="nav-link">
//                     <span>Cart <TiShoppingCart /></span>
//                   </NavLink>
//                 </Badge>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Header;

import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { TiShoppingCart } from "react-icons/ti";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import "./styles/Header.css"; // make sure this file exists

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  // Day/Night Theme State
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const categoriesRef = useRef(null);
  const userRef = useRef(null);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    setUserOpen(false);
  };

  // Apply theme to <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setCategoriesOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debug: check if categories exist
  console.log("Categories loaded:", categories);

  return (
    <>
      <nav className="glass-navbar">
        <div className="nav-container">
          <Link to="/" className="brand-logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">Ecommerce App</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <div className="search-wrapper">
              <SearchInput />
            </div>

            <NavLink to="/" className="nav-link" end>
              Home
            </NavLink>

            {/* Categories Dropdown */}
            <div className="dropdown" ref={categoriesRef}>
              <button
                className="dropdown-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  setCategoriesOpen(!categoriesOpen);
                }}
              >
                Categories
              </button>
              {categoriesOpen && (
                <ul className="glass-dropdown">
                  <li>
                    <Link to="/categories" onClick={() => setCategoriesOpen(false)}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link to={`/category/${c.slug}`} onClick={() => setCategoriesOpen(false)}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Auth Links or User Dropdown */}
            {!auth?.user ? (
              <>
                <NavLink to="/register" className="nav-link">Register</NavLink>
                <NavLink to="/login" className="nav-link">Login</NavLink>
              </>
            ) : (
              <div className="dropdown" ref={userRef}>
                <button
                  className="dropdown-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserOpen(!userOpen);
                  }}
                >
                  {auth?.user?.name}
                </button>
                {userOpen && (
                  <ul className="glass-dropdown">
                    <li>
                      <NavLink
                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                        onClick={() => setUserOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="logout-btn" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}

            {/* Cart */}
            <NavLink to="/cart" className="cart-link">
              <Badge count={cart?.length} overflowCount={99}>
                <TiShoppingCart className="cart-icon" />
              </Badge>
            </NavLink>

            {/* 🌙☀️ Day/Night Toggle Button (Desktop) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button + Theme Toggle (combined row) */}
          <div className="mobile-controls">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle-mobile"
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-nav-content">
            <SearchInput />
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>

            <div className="mobile-dropdown">
              <button onClick={() => setCategoriesOpen(!categoriesOpen)}>Categories</button>
              {categoriesOpen && (
                <div className="mobile-dropdown-menu">
                  <Link to="/categories" onClick={() => setCategoriesOpen(false)}>All Categories</Link>
                  {categories?.map((c) => (
                    <Link key={c._id} to={`/category/${c.slug}`} onClick={() => setCategoriesOpen(false)}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {!auth?.user ? (
              <>
                <NavLink to="/register" onClick={() => setMobileMenuOpen(false)}>Register</NavLink>
                <NavLink to="/login" onClick={() => setMobileMenuOpen(false)}>Login</NavLink>
              </>
            ) : (
              <>
                <span className="mobile-user-name">{auth?.user?.name}</span>
                <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </NavLink>
                <button onClick={handleLogout} className="mobile-logout">Logout</button>
              </>
            )}

            <NavLink to="/cart" onClick={() => setMobileMenuOpen(false)} className="mobile-cart">
              Cart <Badge count={cart?.length} />
            </NavLink>
          </div>
        </div>
      </nav>
      <div className="navbar-spacer"></div>
    </>
  );
};

export default Header;