// import React from "react";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "./../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";
// const AdminDashboard = () => {
//   const [auth] = useAuth();
//   return (
//     <Layout>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <div className="card w-75 p-3">
//               <h3> Admin Name : {auth?.user?.name}</h3>
//               <h3> Admin Email : {auth?.user?.email}</h3>
//               <h3> Admin Contact : {auth?.user?.phone}</h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default  

import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import "../AdminDashboard.css"; // Import new 2025 styles

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="admin-dashboard-wrapper">
        <div className="dashboard-grid">
          {/* Sidebar - AdminMenu remains exactly as before */}
          <div className="dashboard-sidebar">
            <AdminMenu />
          </div>

          {/* Main Content - Admin Info Card (3D Glassmorphism) */}
          <div className="dashboard-main">
            <div className="admin-card glass-card">
              <div className="admin-card-header">
                <div className="admin-icon">👑</div>
                <h2 className="admin-title">Admin Profile</h2>
                <div className="admin-glow"></div>
              </div>
              <div className="admin-card-body">
                <div className="info-row">
                  <span className="info-label">Name</span>
                  <span className="info-value">{auth?.user?.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email</span>
                  <span className="info-value">{auth?.user?.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Contact</span>
                  <span className="info-value">{auth?.user?.phone}</span>
                </div>
              </div>
              <div className="admin-card-footer">
                <div className="pulse-dot"></div>
                <span>Active Session</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;