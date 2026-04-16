import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaReply, FaUser, FaCalendar, FaCheckCircle } from "react-icons/fa";
import "./SupportMessages.css";

const SupportMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/v1/contact/my-messages");
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status, hasReply) => {
    if (hasReply) {
      return <span className="status-badge replied">✓ Replied</span>;
    }
    switch (status) {
      case "unread":
        return <span className="status-badge unread">Pending</span>;
      case "read":
        return <span className="status-badge read">Read</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <Layout title={"My Support Messages"}>
      <div className="support-messages-page">
        <div className="container">
          <div className="support-header">
            <h1 className="support-title">
              <FaReply className="title-icon" />
              My Support Messages
            </h1>
            <p className="support-subtitle">
              Track and manage all your support conversations with our team
            </p>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading your messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="empty-state">
              <FaReply className="empty-icon" />
              <h3>No Support Messages</h3>
              <p>You haven't sent any support messages yet.</p>
              <a href="/contact" className="contact-link">Contact Support</a>
            </div>
          ) : (
            <div className="messages-container">
              {messages.map((message) => (
                <div key={message._id} className={`message-card ${message.adminReply ? 'has-reply' : ''}`}>
                  <div className="message-header">
                    <div className="message-subject">{message.subject}</div>
                    {getStatusBadge(message.status, message.adminReply)}
                  </div>
                  
                  <div className="message-body">
                    <div className="user-message">
                      <div className="message-label">
                        <FaUser className="label-icon" />
                        Your Message:
                      </div>
                      <div className="message-content">{message.message}</div>
                      <div className="message-meta">
                        <FaCalendar className="meta-icon" />
                        Sent: {formatDate(message.createdAt)}
                      </div>
                    </div>

                    {message.adminReply && (
                      <div className="admin-reply">
                        <div className="reply-label">
                          <FaReply className="label-icon" />
                          Admin Response:
                        </div>
                        <div className="reply-content">{message.adminReply}</div>
                        <div className="reply-meta">
                          <FaCheckCircle className="meta-icon" />
                          Replied by: {message.repliedBy} on {formatDate(message.repliedAt)}
                        </div>
                      </div>
                    )}
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

export default SupportMessages;