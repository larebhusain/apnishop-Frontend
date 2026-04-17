import { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";
import '../styles/CartStyles.css';

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  
  const [clientToken, setClientToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [instance, setInstance] = useState("");

  const totalPrice = () => {
    try {
      let total = 0;
      if (Array.isArray(cart)) {
        cart.forEach((item) => {
          total = total + item.price;
        });
      }
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
 
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });

      setLoading(false);

      if (data?.ok || data?.success) { 
        localStorage.removeItem("cart");
        setCart([]);
        toast.success("Payment Completed Successfully");
        navigate(`/dashboard/user/orders`);
      } else {
        toast.error(data?.message || "Payment Failed");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("An error occurred during payment processing");
    }
  };

  return (
    <Layout>
      <div className="cart-page-wrapper">
        <div className="cart-container">
          {/* Header Section */}
          <div className="cart-header">
            <div className="header-content">
              <div className="welcome-badge">
                <span className="wave-emoji">👋</span>
                <span>Welcome back!</span>
              </div>
              <h1 className="greeting">
                Hello, <span className="user-name">{auth?.token && auth?.user?.name}</span>
              </h1>
              <p className="cart-info">
                {cart?.length
                  ? `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`
                  : "Your cart is empty"}
                {!auth?.token && (
                  <span className="login-prompt"> — Please login to checkout</span>
                )}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-layout">
            {/* Cart Items Section */}
            <div className="cart-items-section">
              {Array.isArray(cart) && cart.length > 0 ? (
                cart?.map((p, index) => (
                  <div className="cart-item" key={`${p._id}-${index}`}>
                    <div className="item-image">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                      />
                    </div>
                    <div className="item-details">
                      <h3 className="item-name">{p.name}</h3>
                      <p className="item-description">{p.description?.substring(0, 80)}...</p>
                      <div className="item-price">${p.price}</div>
                    </div>
                    <button
                      className="remove-button"
                      onClick={() => removeCartItem(p._id)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-cart">
                  <div className="empty-cart-icon">🛒</div>
                  <h3>Your cart is empty</h3>
                  <p>Looks like you haven't added any items yet</p>
                  <button className="shop-now-btn" onClick={() => navigate(`/`)}>
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary Section */}
            <div className="order-summary">
              <div className="summary-card">
                <h2 className="summary-title">Order Summary</h2>
                
                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span className="total-price">{totalPrice()}</span>
                </div>

                {/* Address Section */}
                {auth?.user?.address ? (
                  <div className="address-card">
                    <div className="address-header">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Shipping Address</span>
                    </div>
                    <p className="address-text">{auth?.user?.address}</p>
                    <button
                      className="update-address"
                      onClick={() => navigate(`/dashboard/user/profile`)}
                    >
                      Update Address
                    </button>
                  </div>
                ) : (
                  <div className="address-card warning">
                    <div className="address-header">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V12M12 16H12.01M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>No Address Added</span>
                    </div>
                    <p className="address-text">Please add a shipping address to continue</p>
                    {auth?.token ? (
                      <button
                        className="add-address"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Add Shipping Address
                      </button>
                    ) : (
                      <button
                        className="add-address"
                        onClick={() => navigate("/login", { state: "/cart" })}
                      >
                        Login to Checkout
                      </button>
                    )}
                  </div>
                )}

                {/* Payment Section */}
                <div className="payment-section">
                  {!clientToken || !cart?.length ? (
                    <div className="payment-placeholder">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 10H21M7 15H11M7 4H17C18.1046 4 19 4.89543 19 6V18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V6C5 4.89543 5.89543 4 7 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p>Payment options will appear here</p>
                    </div>
                  ) : (
                    <>
                      <div className="dropin-container">
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />
                      </div>
                      <button
                        className="payment-button"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? (
                          <>
                            <span className="spinner"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            Make Payment
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="trust-badges">
                  <div className="badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Secure Payment
                  </div>
                  <div className="badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 12H21M6 3L3 6L6 9M18 3L21 6L18 9M12 2V22M9 5H15M9 19H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Free Shipping
                  </div>
                  <div className="badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 12V8H4V12M20 12L12 20L4 12M20 12H22M2 12H4M12 2V4M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    30-Day Returns
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

export default CartPage;