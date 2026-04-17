// import React from "react";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "./../../components/Layout/Layout";

// const Users = () => {
//   return (
//     <Layout title={"Dashboard - All Users"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1>All Users</h1>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Users;
import React, { useState, useEffect, useCallback } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaUsers,
  FaUserCheck,
  FaUserSlash,
  FaUserShield,
  FaSearch,
 
  FaTrash,
  FaBan,
  FaCheckCircle,
   
  FaUserGraduate,
} from "react-icons/fa";
import "../Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    blocked: 0,
    admins: 0,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState("");

  // Debounce search
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/v1/auth/all-users?search=${searchTerm}&page=${currentPage}&limit=10`
      );
      if (data.success) {
        setUsers(data.users);
        setStats(data.stats);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle search with debounce
  const handleSearch = debounce((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 500);

  // Handle user actions
  const handleBlockUser = async (userId) => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/block-user/${userId}`);
      if (data.success) {
        toast.success("User blocked successfully");
        fetchUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to block user");
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/unblock-user/${userId}`);
      if (data.success) {
        toast.success("User unblocked successfully");
        fetchUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to unblock user");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/auth/delete-user/${userId}`);
      if (data.success) {
        toast.success("User deleted successfully");
        fetchUsers();
        setShowConfirmModal(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handleMakeAdmin = async (userId) => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/make-admin/${userId}`);
      if (data.success) {
        toast.success("User promoted to admin successfully");
        fetchUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to promote user");
    }
  };

  // Confirm action modal
  const confirmAction = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setShowConfirmModal(true);
  };

  const executeAction = () => {
    if (actionType === "delete") {
      handleDeleteUser(selectedUser._id);
    } else if (actionType === "block") {
      handleBlockUser(selectedUser._id);
    } else if (actionType === "unblock") {
      handleUnblockUser(selectedUser._id);
    } else if (actionType === "makeAdmin") {
      handleMakeAdmin(selectedUser._id);
    }
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Stats cards data
  const statsCards = [
    {
      title: "Total Users",
      value: stats.total,
      icon: <FaUsers />,
      color: "gradient-1",
      change: "+12%",
    },
    {
      title: "Active Users",
      value: stats.active,
      icon: <FaUserCheck />,
      color: "gradient-2",
      change: "+8%",
    },
    {
      title: "Blocked Users",
      value: stats.blocked,
      icon: <FaUserSlash />,
      color: "gradient-3",
      change: "-3%",
    },
    {
      title: "Admin Users",
      value: stats.admins,
      icon: <FaUserShield />,
      color: "gradient-4",
      change: "+5%",
    },
  ];

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="users-management">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              {/* Header Section */}
              <div className="users-header">
                <div className="header-title">
                  <h1>Users Management</h1>
                  <p>Manage and monitor all platform users</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="stats-grid">
                {statsCards.map((card, index) => (
                  <div key={index} className={`stat-card ${card.color}`}>
                    <div className="stat-icon">{card.icon}</div>
                    <div className="stat-info">
                      <h3>{card.value.toLocaleString()}</h3>
                      <p>{card.title}</p>
                      <span className="stat-change">{card.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Search Bar */}
              <div className="search-section">
                <div className="search-wrapper">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              {/* Users Table */}
              <div className="users-table-wrapper">
                {loading ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading users...</p>
                  </div>
                ) : users.length === 0 ? (
                  <div className="empty-state">
                    <FaUsers className="empty-icon" />
                    <h3>No users found</h3>
                    <p>Try adjusting your search criteria</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="users-table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Joined Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user._id} className="user-row">
                            <td className="user-info">
                              <img
                                src={
                                  user.profileImage ||
                                  `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`
                                }
                                alt={user.name}
                                className="user-avatar"
                              />
                              <div>
                                <div className="user-name">{user.name}</div>
                                <div className="user-phone">{user.phone}</div>
                              </div>
                            </td>
                            <td className="user-email">{user.email}</td>
                            <td>
                              <span
                                className={`role-badge ${
                                  user.role === 1 ? "admin" : "user"
                                }`}
                              >
                                {user.role === 1 ? "Admin" : "User"}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`status-badge ${
                                  user.isBlocked ? "blocked" : "active"
                                }`}
                              >
                                {user.isBlocked ? "Blocked" : "Active"}
                              </span>
                            </td>
                            <td>{formatDate(user.createdAt)}</td>
                            <td>
                              <div className="action-buttons">
                                {!user.isBlocked ? (
                                  <button
                                    onClick={() =>
                                      confirmAction(user, "block")
                                    }
                                    className="action-btn block"
                                    title="Block User"
                                  >
                                    <FaBan />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      confirmAction(user, "unblock")
                                    }
                                    className="action-btn unblock"
                                    title="Unblock User"
                                  >
                                    <FaCheckCircle />
                                  </button>
                                )}
                                {user.role !== 1 && (
                                  <button
                                    onClick={() =>
                                      confirmAction(user, "makeAdmin")
                                    }
                                    className="action-btn promote"
                                    title="Make Admin"
                                  >
                                    <FaUserGraduate />
                                  </button>
                                )}
                                <button
                                  onClick={() => confirmAction(user, "delete")}
                                  className="action-btn delete"
                                  title="Delete User"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Pagination */}
                {!loading && users.length > 0 && (
                  <div className="pagination-wrapper">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                    >
                      Previous
                    </button>
                    <div className="pagination-info">
                      Page {currentPage} of {totalPages}
                    </div>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="pagination-btn"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Action</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to {actionType}{" "}
                <strong>{selectedUser?.name}</strong>?
              </p>
              {actionType === "delete" && (
                <p className="warning-text">
                  This action cannot be undone!
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="modal-btn cancel"
              >
                Cancel
              </button>
              <button onClick={executeAction} className="modal-btn confirm">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Users;