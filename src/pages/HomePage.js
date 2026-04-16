//  import React, { useState, useEffect, useCallback } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Checkbox, Radio } from "antd";
// import { Prices } from "../components/Prices";
// import { useCart } from "../context/cart"; // Added missing import
// import toast from "react-hot-toast";
// import '../styles/Homepage.css'; // Added missing import

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useCart(); // Added cart state
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [radio, setRadio] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // 1. Get all categories
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/get-category");
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // 2. Get total product count
//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/product-count");
//       setTotal(data?.total);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // 3. Initial Load
//   useEffect(() => {
//     getAllCategory();
//     getTotal();
//   }, []);

//   // 4. Get products (Initial & reset state)
//   const getAllProducts = useCallback(async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//       setLoading(false);
//       setProducts(data.products);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   }, [page]);

//   // 5. Load more products
//   const loadMore = useCallback(async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//       setLoading(false);
//       // Unique check to avoid duplicate products in state
//       setProducts((prev) => [...prev, ...data?.products]);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }, [page]);

//   // Trigger LoadMore when page changes
//   useEffect(() => {
//     if (page === 1) return;
//     loadMore();
//   }, [page, loadMore]);

//   // 6. Filter handlers
//   const handleFilter = (value, id) => {
//     let all = [...checked];
//     if (value) {
//       all.push(id);
//     } else {
//       all = all.filter((c) => c !== id);
//     }
//     setChecked(all);
//   };

//   // Fetch products based on filters or default
//   useEffect(() => {
//     if (!checked.length && !radio.length) {
//       getAllProducts();
//     }
//   }, [checked.length, radio.length, getAllProducts]);

//   // 7. Get filtered products
//   const filterProduct = useCallback(async () => {
//     try {
//       const { data } = await axios.post("/api/v1/product/product-filters", {
//         checked,
//         radio,
//       });
//       setProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   }, [checked, radio]);

//   useEffect(() => {
//     if (checked.length || radio.length) filterProduct();
//   }, [checked, radio, filterProduct]);

//   return (
//     <Layout title={"All Products - Best offers"}>
//       <div className=" home-page container-fluid row mt-3">
//         <div className="col-md-2">
//           <h4 className="text-center">Filter By Category</h4>
//           <div className="d-flex flex-column">
//             {categories?.map((c) => (
//               <Checkbox
//                 key={c._id}
//                 onChange={(e) => handleFilter(e.target.checked, c._id)}
//               >
//                 {c.name}
//               </Checkbox>
//             ))}
//           </div>

//           <h4 className="text-center mt-4">Filter By Price</h4>
//           <div className="d-flex flex-column">
//             <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//               {Prices?.map((p) => (
//                 <div key={p._id}>
//                   <Radio value={p.array}>{p.name}</Radio>
//                 </div>
//               ))}
//             </Radio.Group>
//           </div>

//           <div className="d-flex flex-column mt-3">
//             <button
//               className="btn btn-danger"
//               onClick={() => window.location.reload()}
//             >
//               RESET FILTERS
//             </button>
//           </div>
//         </div>

//         <div className="col-md-9 offset-1">
//           <h1 className="text-center">All Products</h1>
//           <div className="d-flex flex-wrap">
//             {products?.map((p, index) => (
//               <div 
//                 className="card m-2" 
//                 style={{ width: "18rem" }} 
//                 key={`${p._id}-${index}`} // FIX: Combined ID and Index for unique keys
//               >
//                 <img
//                   src={`/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{p.name}</h5>
//                   <p className="card-text">
//                     {p.description.substring(0, 30)}...
//                   </p>
//                   <p className="card-text fw-bold"> $ {p.price}</p>
                  
//                   <button
//                     className="btn btn-primary ms-1"
//                     onClick={() => navigate(`/product/${p.slug}`)}
//                   >
//                     More Details
//                   </button>
                  
//                   <button 
//                     className="btn btn-secondary ms-1"
//                     onClick={() => {
//                       setCart([...cart, p]);
//                       localStorage.setItem("cart", JSON.stringify([...cart, p]));
//                       toast.success("Item Added to cart");
//                     }}
//                   >
//                     ADD TO CART
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="m-2 p-3 text-center">
//             {products && products.length < total && (
//               <button
//                 className="btn btn-warning loadmore"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setPage(page + 1);
//                 }}
//               >
//                 {loading ? "Loading ..." : "Load more"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default HomePage;
import React, { useState, useEffect, useCallback } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import '../styles/Homepage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productsPerPage] = useState(4);
  
  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero Slides Data - Using unique string IDs
  const heroSlides = [
    {
      id: "slide-1",
      title: "Summer Collection",
      highlight: "2025",
      subtitle: "Discover the latest trends with exclusive discounts",
      discount: "Up to 50% Off",
      bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      buttonText: "Shop Now",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
      link: "/shop"
    },
    {
      id: "slide-2",
      title: "Premium Quality",
      highlight: "Essentials",
      subtitle: "Experience luxury with our premium collection",
      discount: "Free Shipping Worldwide",
      bgGradient: "linear-gradient(135deg, #64273f 0%, #b861e0 100%)",
      buttonText: "Explore Now",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      link: "/shop"
    },
    {
      id: "slide-3",
      title: "Limited Edition",
      highlight: "New Arrivals",
      subtitle: "Be the first to own these exclusive pieces",
      discount: "Limited Stock Available",
      bgGradient: "linear-gradient(135deg, #523479 0%, #00f2fe 100%)",
      buttonText: "View Collection",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=400&fit=crop",
      link: "/shop"
    }
  ];

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}?limit=${productsPerPage}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [page, productsPerPage]);

  const loadMore = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}?limit=${productsPerPage}`);
      setLoading(false);
      setProducts((prev) => {
        const existingIds = new Set(prev.map(p => p._id));
        const newProducts = data?.products?.filter(p => !existingIds.has(p._id)) || [];
        return [...prev, ...newProducts];
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [page, productsPerPage]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page, loadMore]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    setPage(1);
  };

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length, getAllProducts]);

  const filterProduct = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio, filterProduct]);

  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    setPage(1);
    getAllProducts();
  };

  const hasMoreProducts = products.length < total;

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="homepage-3d">
        {/* 3D Animated Background */}
        <div className="bg-3d-animation">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="grid-pattern"></div>
        </div>

        {/* Hero Slider Section */}
        <div className="hero-slider-container">
          <div className="hero-slider">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                style={{
                  background: slide.bgGradient,
                  transform: `translateX(${(index - currentSlide) * 100}%)`
                }}
              >
                <div className="hero-slide-content">
                  <div className="hero-slide-text">
                    <div className="slide-discount">{slide.discount}</div>
                    <h1 className="slide-title">
                      {slide.title} <span className="slide-highlight">{slide.highlight}</span>
                    </h1>
                    <p className="slide-subtitle">{slide.subtitle}</p>
                    <button 
                      className="slide-cta"
                      onClick={() => navigate(slide.link)}
                    >
                      {slide.buttonText}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <div className="hero-slide-image">
                    <img src={slide.image} alt={slide.title} />
                    <div className="image-glow-effect"></div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Slider Navigation Dots */}
            <div className="slider-dots">
              {heroSlides.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            
            {/* Slider Arrows */}
            <button className="slider-arrow prev" onClick={prevSlide} aria-label="Previous slide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="slider-arrow next" onClick={nextSlide} aria-label="Next slide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-container-3d">
          {/* 3D Filter Sidebar */}
          <div className="page-layout">
            <div className="filter-sidebar-3d">
            <div className="filter-card-3d glassmorphism">
              <div className="filter-header-3d">
                <h3>Filters</h3>
                <button className="reset-btn-3d" onClick={resetFilters}>
                  Reset All
                </button>
              </div>

              <div className="filter-section-3d">
                <h4 className="filter-title-3d">Categories</h4>
                <div className="filter-options-3d">
                  {categories?.map((c) => (
                    <label key={c._id} className="filter-checkbox-3d">
                      <Checkbox
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      />
                      <span className="checkbox-label-3d">{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-section-3d">
                <h4 className="filter-title-3d">Price Range</h4>
                <div className="filter-options-3d">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Prices?.map((p) => (
                      <label key={p._id} className="filter-radio-3d">
                        <Radio value={p.array} />
                        <span className="radio-label-3d">{p.name}</span>
                      </label>
                    ))}
                  </Radio.Group>
                </div>
              </div>

              {(checked.length > 0 || radio.length > 0) && (
                <div className="active-filters-3d">
                  <h4>Active Filters</h4>
                  <div className="filter-tags-3d">
                    {checked.map((id) => {
                      const category = categories.find(c => c._id === id);
                      return (
                        <span key={`tag-${id}`} className="filter-tag-3d">
                          {category?.name}
                          <button onClick={() => handleFilter(false, id)}>×</button>
                        </span>
                      );
                    })}
                    {radio.length > 0 && (
                      <span key="price-tag" className="filter-tag-3d">
                        {Prices.find(p => p.array[0] === radio[0] && p.array[1] === radio[1])?.name}
                        <button onClick={() => setRadio([])}>×</button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            </div>
          </div>  
          {/* Products Section */}
          <div className="products-section-3d" id="products-section">
            <div className="products-header-3d">
              <div>
                <h2 className="products-title-3d">All Products</h2>
                <div className="title-underline-3d"></div>
              </div>
              <div className="products-count-3d">
                Showing {products.length} of {total} products
              </div>
            </div>

            {loading && products.length === 0 ? (
              <div className="loading-3d" key="loading">
                <div className="cube-loader">
                  <div className="cube"></div>
                  <div className="cube"></div>
                  <div className="cube"></div>
                  <div className="cube"></div>
                </div>
                <p>Loading amazing products...</p>
              </div>
            ) : (
              <>
                <div className="products-grid-3d">
                  {products?.map((p, index) => (
                    <div className="product-card-3d"   key={`${p._id}-${index}`} >
                      <div className="card-inner">
                        <div className="card-front">
                          <div className="product-badge-3d">Hot 🔥</div>
                          <div className="product-image-wrapper-3d">
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="product-image-3d"
                              alt={p.name}
                            />
                            <div className="image-shine"></div>
                          </div>
                          <div className="product-info-3d">
                            <h3 className="product-name-3d">{p.name}</h3>
                            <p className="product-description-3d">
                              {p.description?.substring(0, 50)}...
                            </p>
                            <div className="product-price-3d">${p.price}</div>
                            <div className="product-actions-3d">
                              <button
                                className="btn-details-3d"
                                onClick={() => navigate(`/product/${p.slug}`)}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 8V12M12 16H12.01M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                Details
                              </button>
                              <button 
                                className="btn-cart-3d"
                                onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart, p]));
                      toast.success("Item Added to cart");
                    }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                  <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16C17 17.1 16.1 18 15 18H9C7.9 18 7 17.1 7 16V13M17 13H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                                  <circle cx="9" cy="20" r="1.5" fill="currentColor"/>
                                  <circle cx="15" cy="20" r="1.5" fill="currentColor"/>
                                </svg>
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {hasMoreProducts && !(checked.length || radio.length) && (
                  <div className="load-more-3d" key="load-more">
                    <button
                      className="load-more-btn-3d"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(prevPage => prevPage + 1);
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="btn-spinner-3d"></span>
                          Loading...
                        </>
                      ) : (
                        <>
                          Load More Products ({products.length} of {total})
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {!hasMoreProducts && products.length > 0 && !(checked.length || radio.length) && (
                  <div className="all-products-loaded" key="all-loaded">
                    <p>✨ You've seen all {products.length} products ✨</p>
                  </div>
                )}

                {products.length === 0 && !loading && (
                  <div className="no-products" key="no-products">
                    <div className="no-products-icon">🔍</div>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters</p>
                    <button className="reset-filters-btn" onClick={resetFilters}>
                      Reset Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;