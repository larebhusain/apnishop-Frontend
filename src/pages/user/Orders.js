// Orders.jsx - Fixed Product Image Display
import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import axios from "axios";
import "../Orders.css";

const Orders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      console.log("Orders data:", data);
      // Debug: Check if products have _id
      data?.forEach(order => {
        order?.cart?.forEach(product => {
          console.log("Product ID:", product._id, "Product Name:", product.name);
        });
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleImageError = (productId) => {
    console.log(`Image failed to load for product: ${productId}`);
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  // Get product image URL with cache-busting only on retry
  const getProductImageUrl = (productId, retryCount = 0) => {
    if (!productId) return null;
    // Base URL without timestamp for normal loading
    return `/api/v1/product/product-photo/${productId}`;
  };

  return (
    <Layout title={"Your Orders"}>
      <div className="premium-orders-container">
        <div className="orders-animated-bg"></div>
        <div className="orders-floating-shape shape-1"></div>
        <div className="orders-floating-shape shape-2"></div>
        <div className="orders-floating-shape shape-3"></div>
        <div className="orders-floating-shape shape-4"></div>
        
        <div className="container-fluid premium-orders-dashboard">
          <div className="row g-4">
            <div className="col-md-3">
              <div className="user-menu-premium-wrapper">
                <UserMenu />
              </div>
            </div>
            
            <div className="col-md-9">
              <div className="orders-glass-container">
                <div className="orders-header-section">
                  <div className="orders-header-icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z" fill="url(#ordersGradient)"/>
                      <defs>
                        <linearGradient id="ordersGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a855f7"/>
                          <stop offset="100%" stopColor="#ec4899"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h1 className="orders-premium-title">ALL ORDERS</h1>
                  <div className="orders-title-underline">
                    <span className="orders-underline-dot"></span>
                    <span className="orders-underline-line"></span>
                    <span className="orders-underline-dot"></span>
                  </div>
                  <p className="orders-subtitle">Track and manage your order history</p>
                </div>
                
                {orders?.length === 0 ? (
                  <div className="empty-orders-state">
                    <div className="empty-state-icon">📦</div>
                    <h3 className="empty-state-title">No Orders Yet</h3>
                    <p className="empty-state-text">Start shopping to see your orders here</p>
                    <button className="shop-now-btn" onClick={() => window.location.href = '/'}>
                      Shop Now
                    </button>
                  </div>
                ) : (
                  orders?.map((order) => {
                    const calculateTotal = () => {
                      if (order?.payment?.transaction?.amount) {
                        return (order.payment.transaction.amount / 100).toFixed(2);
                      }
                      if (order?.cart?.length) {
                        return order.cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0).toFixed(2);
                      }
                      return "0.00";
                    };

                    return (
                      <div key={order._id} className="premium-order-card">
                        <div className="order-card-glow"></div>
                        
                        {/* Order Header */}
                        <div className="order-header-premium">
                          <div className="order-status-badge">
                            <span className={`status-badge ${order?.status?.toLowerCase() || 'processing'}`}>
                              {order?.status || "Processing"}
                            </span>
                          </div>
                          <div className="order-meta-info">
                            <div className="order-meta-item">
                              <span className="meta-icon">📅</span>
                              <span className="meta-label">Order Date:</span>
                              <span className="meta-value">{moment(order?.createdAt).format('DD MMM YYYY')}</span>
                            </div>
                            <div className="order-meta-item">
                              <span className="meta-icon">🆔</span>
                              <span className="meta-label">Order ID:</span>
                              <span className="meta-value order-id">{order?._id?.slice(-8).toUpperCase()}</span>
                            </div>
                            <div className="order-meta-item">
                              <span className="meta-icon">💰</span>
                              <span className="meta-label">Total Amount:</span>
                              <span className="meta-value order-total">${calculateTotal()}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Products Section - FIXED IMAGE DISPLAY */}
                        <div className="orders-products-section">
                          <div className="products-header">
                            <h3 className="products-title">Order Items</h3>
                            <span className="items-count">{order?.cart?.length || 0} item(s)</span>
                          </div>
                          
                          <div className="products-list-container">
                            {order?.cart?.map((product, idx) => {
                              const hasError = imageErrors[product._id];
                              const imageUrl = getProductImageUrl(product._id);
                              
                              return (
                                <div key={product._id || idx} className="product-item-fixed">
                                  {/* Product Image - Left Side */}
                                  <div className="product-image-fixed">
                                    {!hasError && product._id ? (
                                      <img
                                        src={imageUrl}
                                        alt={product.name}
                                        className="product-img-fixed"
                                        onError={() => handleImageError(product._id)}
                                        loading="lazy"
                                      />
                                    ) : (
                                      <div className="product-img-placeholder">
                                        <span className="placeholder-emoji">🛍️</span>
                                        <span className="placeholder-text">No Image</span>
                                      </div>
                                    )}
                                    {product.quantity > 1 && (
                                      <div className="product-quantity-fixed">
                                        x{product.quantity}
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Product Details - Right Side */}
                                  <div className="product-details-fixed">
                                    <h4 className="product-name-fixed">{product.name}</h4>
                                    {product.description && (
                                      <p className="product-desc-fixed">
                                        {product.description.length > 80 
                                          ? `${product.description.substring(0, 80)}...` 
                                          : product.description}
                                      </p>
                                    )}
                                    <div className="product-meta-fixed">
                                      <div className="product-price-fixed">
                                        <span className="price-label">Price</span>
                                        <span className="price-value">${product.price}</span>
                                      </div>
                                      {product.quantity && (
                                        <div className="product-qty-fixed">
                                          <span className="qty-label">Quantity</span>
                                          <span className="qty-value">{product.quantity}</span>
                                        </div>
                                      )}
                                      <div className="product-subtotal-fixed">
                                        <span className="subtotal-label">Subtotal</span>
                                        <span className="subtotal-value">
                                          ${(product.price * (product.quantity || 1)).toFixed(2)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Delivery Address Section */}
                        {order?.shipping && (
                          <div className="order-delivery-info">
                            <div className="delivery-header">
                              <span className="delivery-icon">📍</span>
                              <span className="delivery-title">Delivery Address</span>
                            </div>
                            <div className="delivery-details">
                              <p className="delivery-address">
                                {order.shipping.address}
                                {order.shipping.city && `, ${order.shipping.city}`}
                                {order.shipping.state && `, ${order.shipping.state}`}
                                {(order.shipping.pinCode || order.shipping.postalCode) && ` - ${order.shipping.pinCode || order.shipping.postalCode}`}
                              </p>
                              {order.shipping.phone && (
                                <p className="delivery-phone">
                                  <span className="phone-icon">📞</span> {order.shipping.phone}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Order Timeline */}
                        <div className="order-timeline">
                          <div className="timeline-step completed">
                            <div className="timeline-dot"></div>
                            <div className="timeline-label">Order Placed</div>
                          </div>
                          <div className={`timeline-step ${order?.status?.toLowerCase() === 'processing' ? 'active' : order?.status?.toLowerCase() === 'shipped' || order?.status?.toLowerCase() === 'delivered' ? 'completed' : ''}`}>
                            <div className="timeline-dot"></div>
                            <div className="timeline-label">Processing</div>
                          </div>
                          <div className={`timeline-step ${order?.status?.toLowerCase() === 'shipped' ? 'active' : order?.status?.toLowerCase() === 'delivered' ? 'completed' : ''}`}>
                            <div className="timeline-dot"></div>
                            <div className="timeline-label">Shipped</div>
                          </div>
                          <div className={`timeline-step ${order?.status?.toLowerCase() === 'delivered' ? 'completed' : ''}`}>
                            <div className="timeline-dot"></div>
                            <div className="timeline-label">Delivered</div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;