 
// import { useState, useEffect } from "react";
// import axios from "axios";
// // import toast from "react-hot-toast"; // Toast ko uncomment karein error dikhane ke liye
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";
// import moment from "moment";
// import { Select } from "antd";
// const { Option } = Select;

// function AdminOrders() {
//   const [status] = useState([
//     "Not Process",
//     "Processing",
//     "Shipped",
//     "deliverd",
//     "cancel",
//   ]);
//   const [orders, setOrders] = useState([]);
//   const [auth] = useAuth();

//   // getOrders ko bahar nikaala aur recursion (khud ko call karna) band kiya
//   const getOrders = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/auth/all-orders");
//       // Check karein backend orders bhej raha hai ya pura object
//       if (data?.orders) {
//         setOrders(data.orders);
//       } else {
//         setOrders(data);
//       }
//     } catch (error) {
//       console.log("Error fetching orders:", error);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) getOrders();
//   }, [auth?.token]); // Dependency array ko simple rakha

//   const handleChange = async (orderId, value) => {
//     try {
//       await axios.put(`/api/v1/auth/order-status/${orderId}`, {
//         status: value,
//       });
//       getOrders(); // Status change ke baad list refresh karein
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Layout title={"All Orders Data"}>
//       <div className="row dashboard">
//         <div className="col-md-3">
//           <AdminMenu />
//         </div>
//         <div className="col-md-9">
//           <h1 className="text-center">All Orders</h1>
//           {orders?.length > 0 ? (
//             orders.map((o, i) => (
//               <div className="border shadow mb-4" key={o._id}>
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th scope="col">#</th>
//                       <th scope="col">Status</th>
//                       <th scope="col">Buyer</th>
//                       <th scope="col">Date</th>
//                       <th scope="col">Payment</th>
//                       <th scope="col">Quantity</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>{i + 1}</td>
//                       <td>
//                         <Select
//                           bordered={false}
//                           onChange={(value) => handleChange(o._id, value)}
//                           defaultValue={o?.status}
//                         >
//                           {status.map((s, i) => (
//                             <Option key={i} value={s}>
//                               {s}
//                             </Option>
//                           ))}
//                         </Select>
//                       </td>
//                       <td>{o?.buyer?.name}</td>
//                       {/* createdAt check (Mongoose default) */}
//                       <td>{moment(o?.createdAt || o?.createAt).fromNow()}</td>
//                       <td>{o?.payment?.success ? "Success" : "Failed"}</td>
//                       <td>{o?.products?.length}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <div className="container">
//                   {o?.products?.map((p) => (
//                     <div className="row mb-2 p-3 card flex-row" key={p._id}>
//                       <div className="col-md-4">
//                         <img
//                           src={`/api/v1/product/product-photo/${p._id}`}
//                           className="card-img-top"
//                           alt={p.name}
//                           width="100px"
//                           height={"100px"} />
//                       </div>
//                       <div className="col-md-8">
//                         <p><strong>{p.name}</strong></p>
//                         <p>{p.description?.substring(0, 30)}...</p>
//                         <p>Price : {p.price}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center">No Orders Found</p>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default AdminOrders;

import { useState, useEffect } from "react";
import axios from "axios";
// import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import "../AdminOrders.css"; // Import new 2025 styles

const { Option } = Select;

function AdminOrders() {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      if (data?.orders) {
        setOrders(data.orders);
      } else {
        setOrders(data);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="admin-orders-container">
        {/* Sidebar + Main Grid */}
        <div className="orders-grid">
          <div className="orders-sidebar">
            <AdminMenu />
          </div>
          <div className="orders-main">
            <div className="orders-header">
              <h1 className="orders-title">📦 All Orders</h1>
              <div className="header-glow"></div>
            </div>

            {orders?.length > 0 ? (
              <div className="orders-list">
                {orders.map((o, i) => (
                  <div className="order-card glass-card" key={o._id}>
                    {/* Order Summary Table (Glass styled) */}
                    <div className="order-summary">
                      <div className="order-summary-grid">
                        <div className="summary-item">
                          <span className="summary-label">#ID</span>
                          <span className="summary-value">{i + 1}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Status</span>
                          <div className="status-select">
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                              className="glass-select"
                              dropdownClassName="glass-dropdown-menu"
                            >
                              {status.map((s, idx) => (
                                <Option key={idx} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Buyer</span>
                          <span className="summary-value">{o?.buyer?.name}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Date</span>
                          <span className="summary-value">
                            {moment(o?.createdAt || o?.createAt).fromNow()}
                          </span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Payment</span>
                          <span
                            className={`payment-badge ${
                              o?.payment?.success ? "success" : "failed"
                            }`}
                          >
                            {o?.payment?.success ? "Success" : "Failed"}
                          </span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Quantity</span>
                          <span className="summary-value">
                            {o?.products?.length}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Products List - 3D Cards */}
                    <div className="products-container">
                      {o?.products?.map((p) => (
                        <div className="product-card-3d" key={p._id}>
                          <div className="product-image">
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              alt={p.name}
                            />
                          </div>
                          <div className="product-details">
                            <h4 className="product-name">{p.name}</h4>
                            <p className="product-desc">
                              {p.description?.substring(0, 60)}...
                            </p>
                            <div className="product-price">
                              ₹ {p.price?.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-orders glass-card">
                <div className="no-orders-icon">📭</div>
                <p>No Orders Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminOrders;