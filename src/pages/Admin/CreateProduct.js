// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import Layout from "./../../components/Layout/Layout";
// import AdminMenu from "./../../components/Layout/AdminMenu";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { Select } from "antd";
// import { useNavigate } from "react-router-dom";
// const { Option } = Select;

// const CreateProduct = () => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [shipping, setShipping] = useState("");
//   const [photo, setPhoto] = useState("");

//   //get all category
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/get-category");
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something wwent wrong in getting catgeory");
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//   }, []);

//   //create product function
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const productData = new FormData();
//       productData.append("name", name);
//       productData.append("description", description);
//       productData.append("price", price);
//       productData.append("quantity", quantity);
//       productData.append("photo", photo);
//       productData.append("category", category);
//       const { data } = axios.post(
//         "/api/v1/product/create-product",
//         productData
//       );
//       if (data?.success) {
//         toast.error(data?.message);
//       } else {
//         toast.success("Product Created Successfully");
//         navigate("/dashboard/admin/products");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("something went wrong");
//     }
//   };

//   return (
//     <Layout title={"Dashboard - Create Product"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1>Create Product</h1>
//             <div className="m-1 w-75">
//               <Select
//                 bordered={false}
//                 placeholder="Select a category"
//                 size="large"
//                 showSearch
//                 className="form-select mb-3"
//                 onChange={(value) => {
//                   setCategory(value);
//                 }}
//               >
//                 {categories?.map((c) => (
//                   <Option key={c._id} value={c._id}>
//                     {c.name}
//                   </Option>
//                 ))}
//               </Select>
//               <div className="mb-3">
//                 <label className="btn btn-outline-secondary col-md-12">
//                   {photo ? photo.name : "Upload Photo"}
//                   <input
//                     type="file"
//                     name="photo"
//                     accept="image/*"
//                     onChange={(e) => setPhoto(e.target.files[0])}
//                     hidden
//                   />
//                 </label>
//               </div>
//               <div className="mb-3">
//                 {photo && (
//                   <div className="text-center">
//                     <img
//                       src={URL.createObjectURL(photo)}
//                       alt="product_photo"
//                       height={"200px"}
//                       className="img img-responsive"
//                     />
//                   </div>
//                 )}
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="text"
//                   value={name}
//                   placeholder="write a name"
//                   className="form-control"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <textarea
//                   type="text"
//                   value={description}
//                   placeholder="write a description"
//                   className="form-control"
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>

//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={price}
//                   placeholder="write a Price"
//                   className="form-control"
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={quantity}
//                   placeholder="write a quantity"
//                   className="form-control"
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <Select
//                   bordered={false}
//                   placeholder="Select Shipping "
//                   size="large"
//                   showSearch
//                   className="form-select mb-3"
//                   onChange={(value) => {
//                     setShipping(value);
//                   }}
//                 >
//                   <Option value="0">No</Option>
//                   <Option value="1">Yes</Option>
//                 </Select>
//               </div>
//               <div className="mb-3">
//                 <button className="btn btn-primary" onClick={handleCreate}>
//                   CREATE PRODUCT
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CreateProduct;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import "../CreateProduct.css"; // Import glass styles

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="create-product-container">
        <div className="create-product-grid">
          <div className="admin-sidebar">
            <AdminMenu />
          </div>
          <div className="form-main">
            <div className="glass-form-card">
              <div className="form-header">
                <h1 className="form-title">✨ Create New Product</h1>
                <div className="title-glow"></div>
              </div>

              <div className="form-body">
                {/* Category Select */}
                <div className="input-group-glass">
                  <label className="glass-label">Category</label>
                  <Select
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="glass-select"
                    dropdownClassName="glass-dropdown"
                    onChange={(value) => setCategory(value)}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Photo Upload */}
                <div className="input-group-glass">
                  <label className="glass-label">Product Image</label>
                  <div className="upload-area">
                    <label className="upload-btn">
                      {photo ? photo.name : "📸 Upload Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                  {photo && (
                    <div className="image-preview">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        className="preview-img"
                      />
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <div className="input-group-glass">
                  <label className="glass-label">Product Name</label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter product name"
                    className="glass-input"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="input-group-glass">
                  <label className="glass-label">Description</label>
                  <textarea
                    value={description}
                    placeholder="Write a detailed description"
                    className="glass-textarea"
                    rows="4"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Price & Quantity Row */}
                <div className="form-row">
                  <div className="input-group-glass half">
                    <label className="glass-label">Price (₹)</label>
                    <input
                      type="number"
                      value={price}
                      placeholder="Enter price"
                      className="glass-input"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="input-group-glass half">
                    <label className="glass-label">Quantity</label>
                    <input
                      type="number"
                      value={quantity}
                      placeholder="Enter quantity"
                      className="glass-input"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>

                {/* Shipping Select */}
                <div className="input-group-glass">
                  <label className="glass-label">Shipping</label>
                  <Select
                    bordered={false}
                    placeholder="Select shipping option"
                    size="large"
                    showSearch
                    className="glass-select"
                    dropdownClassName="glass-dropdown"
                    onChange={(value) => setShipping(value)}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>

                {/* Submit Button */}
                <div className="form-actions">
                  <button className="glass-button" onClick={handleCreate}>
                    <span className="btn-text">CREATE PRODUCT</span>
                    <span className="btn-glow"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;