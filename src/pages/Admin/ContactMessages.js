// import React, { useState, useEffect } from "react";
// import Layout from "../../components/Layout/Layout";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import {
//   FaEnvelope,
//   FaEye,
//   FaTrash,
//   FaCheck,
//   FaReply,
//   FaSearch,
   
//   FaEnvelopeOpen,
//   FaCheckDouble,
// } from "react-icons/fa";
// import "../ContactMessages.css";

// const ContactMessages = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [stats, setStats] = useState({
//     total: 0,
//     unread: 0,
//     read: 0,
//     replied: 0,
//   });

//   // Fetch all messages
//   const fetchMessages = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get("/api/v1/contact/all-messages");
//       if (data.success) {
//         setMessages(data.messages);
//         setStats(data.stats);
        
//         // Update unread badge in sidebar
//         const badge = document.getElementById("unreadBadge");
//         if (badge && data.stats.unread > 0) {
//           badge.style.display = "inline-block";
//           badge.textContent = data.stats.unread;
//         } else if (badge) {
//           badge.style.display = "none";
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       toast.error("Failed to load messages");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//     // Auto refresh every 30 seconds
//     const interval = setInterval(fetchMessages, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   // Handle view message
//   const handleViewMessage = async (message) => {
//     setSelectedMessage(message);
//     setShowModal(true);
    
//     // Mark as read if unread
//     if (message.status === "unread") {
//       try {
//         await axios.put(`/api/v1/contact/status/${message._id}`, {
//           status: "read",
//         });
//         fetchMessages(); // Refresh list
//       } catch (error) {
//         console.error("Error marking as read:", error);
//       }
//     }
//   };

//   // Handle delete message
//   const handleDeleteMessage = async (id) => {
//     if (window.confirm("Are you sure you want to delete this message?")) {
//       try {
//         await axios.delete(`/api/v1/contact/delete/${id}`);
//         toast.success("Message deleted successfully");
//         fetchMessages();
//       } catch (error) {
//         toast.error("Failed to delete message");
//       }
//     }
//   };

//   // Handle mark as read
//   const handleMarkAsRead = async (id) => {
//     try {
//       await axios.put(`/api/v1/contact/status/${id}`, {
//         status: "read",
//       });
//       toast.success("Marked as read");
//       fetchMessages();
//     } catch (error) {
//       toast.error("Failed to update status");
//     }
//   };

//   // Handle mark as replied
//   const handleMarkAsReplied = async (id) => {
//     try {
//       await axios.put(`/api/v1/contact/status/${id}`, {
//         status: "replied",
//       });
//       toast.success("Marked as replied");
//       fetchMessages();
//     } catch (error) {
//       toast.error("Failed to update status");
//     }
//   };

//   // Filter messages based on search
//   const filteredMessages = messages.filter(
//     (msg) =>
//       msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Get status badge
//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "unread":
//         return <span className="status-badge unread">Unread</span>;
//       case "read":
//         return <span className="status-badge read">Read</span>;
//       case "replied":
//         return <span className="status-badge replied">Replied</span>;
//       default:
//         return <span className="status-badge">{status}</span>;
//     }
//   };

//   // Format date
//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <Layout title={"Contact Messages - Admin Panel"}>
//       <div className="contact-messages-page">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-3">
//               <AdminMenu />
//             </div>
//             <div className="col-md-9">
//               {/* Header */}
//               <div className="messages-header">
//                 <h1 className="messages-title">
//                   <FaEnvelope className="title-icon" />
//                   Contact Messages
//                 </h1>
//                 <p className="messages-subtitle">
//                   Manage and respond to customer inquiries
//                 </p>
//               </div>

//               {/* Stats Cards */}
//               <div className="stats-grid">
//                 <div className="stat-card total">
//                   <div className="stat-icon">
//                     <FaEnvelope />
//                   </div>
//                   <div className="stat-info">
//                     <h3>{stats.total}</h3>
//                     <p>Total Messages</p>
//                   </div>
//                 </div>
//                 <div className="stat-card unread">
//                   <div className="stat-icon">
//                     <FaEnvelopeOpen />
//                   </div>
//                   <div className="stat-info">
//                     <h3>{stats.unread}</h3>
//                     <p>Unread</p>
//                   </div>
//                 </div>
//                 <div className="stat-card read">
//                   <div className="stat-icon">
//                     <FaCheck />
//                   </div>
//                   <div className="stat-info">
//                     <h3>{stats.read}</h3>
//                     <p>Read</p>
//                   </div>
//                 </div>
//                 <div className="stat-card replied">
//                   <div className="stat-icon">
//                     <FaCheckDouble />
//                   </div>
//                   <div className="stat-info">
//                     <h3>{stats.replied}</h3>
//                     <p>Replied</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Search Bar */}
//               <div className="search-section">
//                 <div className="search-wrapper">
//                   <FaSearch className="search-icon" />
//                   <input
//                     type="text"
//                     placeholder="Search by name, email, or subject..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="search-input"
//                   />
//                 </div>
//               </div>

//               {/* Messages Table */}
//               <div className="messages-table-wrapper">
//                 {loading ? (
//                   <div className="loading-spinner">
//                     <div className="spinner"></div>
//                     <p>Loading messages...</p>
//                   </div>
//                 ) : filteredMessages.length === 0 ? (
//                   <div className="empty-state">
//                     <FaEnvelope className="empty-icon" />
//                     <h3>No messages found</h3>
//                     <p>No contact messages available</p>
//                   </div>
//                 ) : (
//                   <div className="table-responsive">
//                     <table className="messages-table">
//                       <thead>
//                         <tr>
//                           <th>Customer</th>
//                           <th>Contact</th>
//                           <th>Subject</th>
//                           <th>Status</th>
//                           <th>Date</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredMessages.map((message) => (
//                           <tr key={message._id} className={`message-row ${message.status}`}>
//                             <td>
//                               <div className="customer-info">
//                                 <div className="customer-avatar">
//                                   {message.name.charAt(0).toUpperCase()}
//                                 </div>
//                                 <div>
//                                   <div className="customer-name">{message.name}</div>
//                                   <div className="customer-phone">{message.phone}</div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td>
//                               <div className="contact-info">
//                                 <div className="contact-email">{message.email}</div>
//                               </div>
//                             </td>
//                             <td>
//                               <div className="message-subject">{message.subject}</div>
//                               <div className="message-preview">
//                                 {message.message.substring(0, 50)}...
//                               </div>
//                             </td>
//                             <td>{getStatusBadge(message.status)}</td>
//                             <td>
//                               <div className="message-date">{formatDate(message.createdAt)}</div>
//                             </td>
//                             <td>
//                               <div className="action-buttons">
//                                 <button
//                                   onClick={() => handleViewMessage(message)}
//                                   className="action-btn view"
//                                   title="View Message"
//                                 >
//                                   <FaEye />
//                                 </button>
//                                 {message.status === "unread" && (
//                                   <button
//                                     onClick={() => handleMarkAsRead(message._id)}
//                                     className="action-btn read"
//                                     title="Mark as Read"
//                                   >
//                                     <FaCheck />
//                                   </button>
//                                 )}
//                                 {message.status !== "replied" && (
//                                   <button
//                                     onClick={() => handleMarkAsReplied(message._id)}
//                                     className="action-btn reply"
//                                     title="Mark as Replied"
//                                   >
//                                     <FaReply />
//                                   </button>
//                                 )}
//                                 <button
//                                   onClick={() => handleDeleteMessage(message._id)}
//                                   className="action-btn delete"
//                                   title="Delete"
//                                 >
//                                   <FaTrash />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Message Detail Modal */}
//       {showModal && selectedMessage && (
//         <div className="modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="message-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3>Message Details</h3>
//               <button className="close-btn" onClick={() => setShowModal(false)}>
//                 ×
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="detail-section">
//                 <label>From:</label>
//                 <div className="detail-value">
//                   <strong>{selectedMessage.name}</strong>
//                   <br />
//                   <small>{selectedMessage.email}</small>
//                   <br />
//                   <small>{selectedMessage.phone}</small>
//                 </div>
//               </div>
//               <div className="detail-section">
//                 <label>Subject:</label>
//                 <div className="detail-value">{selectedMessage.subject}</div>
//               </div>
//               <div className="detail-section">
//                 <label>Message:</label>
//                 <div className="detail-value message-content">
//                   {selectedMessage.message}
//                 </div>
//               </div>
//               <div className="detail-section">
//                 <label>Status:</label>
//                 <div className="detail-value">{getStatusBadge(selectedMessage.status)}</div>
//               </div>
//               <div className="detail-section">
//                 <label>Received:</label>
//                 <div className="detail-value">{formatDate(selectedMessage.createdAt)}</div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 className="modal-btn close"
//                 onClick={() => setShowModal(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// };

// export default ContactMessages;
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaEnvelope,
  FaEye,
  FaTrash,
  FaCheck,
  FaReply,
  FaSearch,
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaEnvelopeOpen,
  FaCheckDouble,
} from "react-icons/fa";
import "../ContactMessages.css";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0,
  });

  // Get admin name from localStorage
  const adminName = JSON.parse(localStorage.getItem("auth"))?.user?.name || "Admin";

  // Fetch all messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/contact/all-messages`);
      if (data.success) {
        setMessages(data.messages);
        setStats({
          total: data.messages.length,
          unread: data.messages.filter(m => m.status === "unread").length,
          read: data.messages.filter(m => m.status === "read").length,
          replied: data.messages.filter(m => m.status === "replied").length,
        });
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle view message
  const handleViewMessage = async (message) => {
    setSelectedMessage(message);
    setShowModal(true);
    
    // Mark as read if unread
    if (message.status === "unread") {
      try {
        await axios.put(`${process.env.REACT_APP_API}/api/v1/contact/status/${message._id}`, {
          status: "read",
        });
        fetchMessages();
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    }
  };

  // Handle reply
  const handleReply = (message) => {
    setSelectedMessage(message);
    setReplyText("");
    setShowReplyModal(true);
  };

  // Send reply
  const sendReply = async () => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    setSendingReply(true);
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/contact/reply/${selectedMessage._id}`, {
        adminReply: replyText,
        repliedBy: adminName,
      });

      if (data.success) {
        toast.success("Reply sent successfully! User has been notified.");
        setShowReplyModal(false);
        setReplyText("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error(error.response?.data?.message || "Failed to send reply");
    } finally {
      setSendingReply(false);
    }
  };

  // Handle delete message
  const handleDeleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API}/api/v1/contact/delete/${id}`);
        toast.success("Message deleted successfully");
        fetchMessages();
      } catch (error) {
        toast.error("Failed to delete message");
      }
    }
  };

  // Filter messages
  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "unread":
        return <span className="status-badge unread">Unread</span>;
      case "read":
        return <span className="status-badge read">Read</span>;
      case "replied":
        return <span className="status-badge replied">Replied</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Layout title={"Contact Messages - Admin Panel"}>
      <div className="contact-messages-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="messages-header">
                <h1 className="messages-title">
                  <FaEnvelope className="title-icon" />
                  Contact Messages
                </h1>
                <p className="messages-subtitle">
                  Manage and respond to customer inquiries
                </p>
              </div>

              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card total">
                  <div className="stat-icon"><FaEnvelope /></div>
                  <div className="stat-info">
                    <h3>{stats.total}</h3>
                    <p>Total Messages</p>
                  </div>
                </div>
                <div className="stat-card unread">
                  <div className="stat-icon"><FaEnvelopeOpen /></div>
                  <div className="stat-info">
                    <h3>{stats.unread}</h3>
                    <p>Unread</p>
                  </div>
                </div>
                <div className="stat-card read">
                  <div className="stat-icon"><FaCheck /></div>
                  <div className="stat-info">
                    <h3>{stats.read}</h3>
                    <p>Read</p>
                  </div>
                </div>
                <div className="stat-card replied">
                  <div className="stat-icon"><FaCheckDouble /></div>
                  <div className="stat-info">
                    <h3>{stats.replied}</h3>
                    <p>Replied</p>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="search-section">
                <div className="search-wrapper">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              {/* Messages Table */}
              <div className="messages-table-wrapper">
                {loading ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading messages...</p>
                  </div>
                ) : filteredMessages.length === 0 ? (
                  <div className="empty-state">
                    <FaEnvelope className="empty-icon" />
                    <h3>No messages found</h3>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="messages-table">
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Subject</th>
                          <th>Message Preview</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMessages.map((message) => (
                          <tr key={message._id} className={`message-row ${message.status}`}>
                            <td>
                              <div className="customer-info">
                                <div className="customer-avatar">
                                  {message.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="customer-name">{message.name}</div>
                                  <div className="customer-email">{message.email}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="message-subject">{message.subject}</div>
                              {message.adminReply && (
                                <div className="reply-preview">
                                  <FaReply className="reply-icon-small" />
                                  Replied: {message.adminReply.substring(0, 40)}...
                                </div>
                              )}
                            </td>
                            <td>
                              <div className="message-preview">{message.message.substring(0, 60)}...</div>
                            </td>
                            <td>{getStatusBadge(message.status)}</td>
                            <td><div className="message-date">{formatDate(message.createdAt)}</div></td>
                            <td>
                              <div className="action-buttons">
                                <button onClick={() => handleViewMessage(message)} className="action-btn view" title="View">
                                  <FaEye />
                                </button>
                                <button onClick={() => handleReply(message)} className="action-btn reply" title="Reply">
                                  <FaReply />
                                </button>
                                <button onClick={() => handleDeleteMessage(message._id)} className="action-btn delete" title="Delete">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Message Modal */}
      {showModal && selectedMessage && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="message-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Message Details</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <label>From:</label>
                <div className="detail-value">
                  <strong>{selectedMessage.name}</strong><br />
                  {selectedMessage.email}<br />
                  {selectedMessage.phone}
                </div>
              </div>
              <div className="detail-section">
                <label>Subject:</label>
                <div className="detail-value">{selectedMessage.subject}</div>
              </div>
              <div className="detail-section">
                <label>Message:</label>
                <div className="detail-value message-content">{selectedMessage.message}</div>
              </div>
              {selectedMessage.adminReply && (
                <div className="detail-section reply-section">
                  <label>Admin Reply:</label>
                  <div className="detail-value reply-content">
                    <FaReply className="reply-icon" />
                    {selectedMessage.adminReply}
                    <div className="reply-meta">
                      Replied by: {selectedMessage.repliedBy} on {formatDate(selectedMessage.repliedAt)}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="modal-btn close" onClick={() => setShowModal(false)}>Close</button>
              {!selectedMessage.adminReply && (
                <button className="modal-btn reply" onClick={() => {
                  setShowModal(false);
                  handleReply(selectedMessage);
                }}>Reply</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="modal-overlay" onClick={() => setShowReplyModal(false)}>
          <div className="reply-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaReply /> Reply to Message</h3>
              <button className="close-btn" onClick={() => setShowReplyModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="reply-info">
                <div className="info-row">
                  <FaUser className="info-icon" />
                  <span><strong>To:</strong> {selectedMessage.name} ({selectedMessage.email})</span>
                </div>
                <div className="info-row">
                  <FaEnvelope className="info-icon" />
                  <span><strong>Subject:</strong> {selectedMessage.subject}</span>
                </div>
              </div>
              
              <div className="original-message">
                <label>Original Message:</label>
                <div className="original-content">{selectedMessage.message}</div>
              </div>

              <div className="reply-input-area">
                <label>Your Reply <span className="required">*</span></label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply here... The user will receive this via email and can view it in their dashboard."
                  rows="6"
                  className="reply-textarea"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn cancel" onClick={() => setShowReplyModal(false)}>
                <FaTimes /> Cancel
              </button>
              <button 
                className="modal-btn send" 
                onClick={sendReply}
                disabled={sendingReply}
              >
                {sendingReply ? (
                  <>Sending...</>
                ) : (
                  <><FaPaperPlane /> Send Reply</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ContactMessages;