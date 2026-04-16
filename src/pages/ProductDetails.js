// import  { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import '../styles/ProductDetailsStyles.css';
// const ProductDetails = () => {
//   const params = useParams();
  
//   const [product, setProduct] = useState({});
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   //initalp details
//   useEffect(() => {
//     if (params?.slug) getProduct();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [params?.slug]);
//   //getProduct
//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `/api/v1/product/get-product/${params.slug}`
//       );
//       setProduct(data?.product);
//       getSimilarProduct(data?.product._id, data?.product.category._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //get similar product
//   const getSimilarProduct = async (pid, cid) => {
//     try {
//       const { data } = await axios.get(
//         `/api/v1/product/related-product/${pid}/${cid}`
//       );
//       setRelatedProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Layout>
//       <div className=" product-details row container mt-2">
//         <div className="col-md-6">
//           <img
//             src={`/api/v1/product/product-photo/${product._id}`}
//             className="card-img-top"
//             alt={product.name}
//             height="300"
//             width={"350px"}
//           />
//         </div>
//         <div className="col-md-6 ">
//           <h1 className="text-center">Product Details</h1>
//           <h6>Name : {product.name}</h6>
//           <h6>Description : {product.description}</h6>
//           <h6>Price : {product.price}</h6>
//           <h6>Category : {product?.category?.name}</h6>
//           <button class="btn btn-secondary ms-1">ADD TO CART</button>
//         </div>
//       </div>
//       <hr />
//       <div className="  product-details row container">
//         <h6>Similar Products</h6>
//         {relatedProducts.length < 1 && (
//           <p className="text-center">No Similar Products found</p>
//         )}
//         <div className="d-flex flex-wrap">
//           {relatedProducts?.map((p) => (
//             <div className="card m-2" style={{ width: "18rem" }}>
//               <img
//                 src={`/api/v1/product/product-photo/${p?._id}`}
//                 className="card-img-top"
//                 alt={p.name}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{p.name}</h5>
//                 <p className="card-text">{p.description.substring(0, 30)}...</p>
//                 <p className="card-text"> $ {p.price}</p>
//                 {/* <button
//                   className="btn btn-primary ms-1"
//                   onClick={() => navigate(`/product/${p.slug}`)}
//                 >
//                   More Details
//                 </button> */}
//                 <button class="btn btn-secondary ms-1">ADD TO CART</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ProductDetails;

import { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../styles/ProductDetailsStyles.css';
import { useCart } from "../context/cart";
import { toast} from "react-hot-toast";
const ProductDetails = () => {
  const params = useParams();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/product/get-product/${params.slug}`
        );
        setProduct(data?.product);
        if (data?.product?._id && data?.product?.category?._id) {
          getSimilarProduct(data.product._id, data.product.category._id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getSimilarProduct = async (pid, cid) => {
      try {
        const { data } = await axios.get(
          `/api/v1/product/related-product/${pid}/${cid}`
        );
        setRelatedProducts(data?.products);
      } catch (error) {
        console.log(error);
      }
    };

    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Show loading state while product is being fetched
  if (!product?._id) {
    return (
      <Layout>
        <div className="glass-loader-container">
          <div className="glass-loader"></div>
          <p>Loading masterpiece...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="modern-product-container">
        {/* Main Product Section */}
        <div className="product-hero glass-card">
          <div className="product-image-wrapper">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="product-main-image"
            />
          </div>
          <div className="product-info-wrapper">
            <span className="product-category-badge">
              {product?.category?.name || "Uncategorized"}
            </span>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <div className="product-price-row">
              <span className="product-price">${product.price}</span>
              <button className="modern-cart-btn" 
               
              >ADD TO CART</button>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="similar-products-section">
          <div className="section-header">
            <h2>You May Also Like</h2>
            <div className="accent-line"></div>
          </div>

          {relatedProducts.length < 1 ? (
            <div className="no-products-glass">
              <p>✨ No similar products found ✨</p>
            </div>
          ) : (
            <div className="products-grid">
              {relatedProducts.map((p) => (
                <div key={p._id} className="similar-product-card glass-card">
                  <div className="card-image-wrapper">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="card-image"
                    />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{p.name}</h3>
                    <p className="card-description">
                      {p.description?.substring(0, 60) || "No description available"}...
                    </p>
                    <div className="card-footer">
                      <span className="card-price">${p.price}</span>
                      <button className="modern-cart-btn small"
                       onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart, p]));
                      toast.success("Item Added to cart");
                    }}
                      >ADD TO CART</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;