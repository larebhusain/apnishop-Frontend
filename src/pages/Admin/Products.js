import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Dashboard - All Products"}>
  <div className="container-fluid m-3 p-3">
    <div className="row">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9">
        <h1 className="text-center mb-4 fw-bold text-uppercase" style={{ color: "#333", letterSpacing: "1px" }}>
          All Products List
        </h1>
        <div className="row justify-content-center">
          {products?.map((p) => (
            <div key={p._id} className="col-md-4 col-sm-6 mb-4">
              <Link
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link text-decoration-none"
              >
                <div className="card product-card-3d border-0">
                  <div className="glass-overlay"></div>
                  <div className="img-wrapper">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top p-3"
                      alt={p.name}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-dark">{p.name}</h5>
                    <p className="card-text text-muted small">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="price-tag">${p.price}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</Layout>
  );
};

export default Products;