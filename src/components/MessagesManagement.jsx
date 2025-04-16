import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaReply,
  FaTrash,
  FaStar,
  FaSearch,
  FaFilter,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowLeft,
  FaPaperPlane,
  FaClock,
  FaUser,
  FaAt,
} from "react-icons/fa";
import {
  getMessages,
  markAsRead,
  addReply,
  deleteMessage,
} from "../data/contactMessages";
import "./AdminDashboard.css";

const MessagesManagement = () => {
  const { darkMode } = useContext(ThemeContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [adminName, setAdminName] = useState("Service Support");

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Erreur lors du chargement des messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMessage = async (message) => {
    setSelectedMessage(message);

    if (!message.isRead) {
      try {
        const updatedMessage = await markAsRead(message.id);
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === message.id ? { ...msg, isRead: true } : msg
          )
        );
      } catch (error) {
        console.error("Erreur lors du marquage comme lu:", error);
      }
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();

    if (!replyText.trim() || !selectedMessage) {
      return;
    }

    try {
      const reply = {
        adminName: adminName,
        message: replyText,
      };

      const updatedMessage = await addReply(selectedMessage.id, reply);

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === selectedMessage.id
            ? { ...msg, isReplied: true, replies: [...msg.replies, reply] }
            : msg
        )
      );

      setSelectedMessage({
        ...selectedMessage,
        isReplied: true,
        replies: [...selectedMessage.replies, reply],
      });

      setReplyText("");
    } catch (error) {
      console.error("Erreur lors de l'envoi de la réponse:", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      try {
        await deleteMessage(messageId);
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== messageId)
        );

        if (selectedMessage && selectedMessage.id === messageId) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error("Erreur lors de la suppression du message:", error);
      }
    }
  };

  const handleBackToList = () => {
    setSelectedMessage(null);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMessages = messages.filter((message) => {
    // Appliquer le filtre
    if (filter === "unread" && message.isRead) return false;
    if (filter === "replied" && !message.isReplied) return false;
    if (filter === "unreplied" && message.isReplied) return false;
    if (filter === "high" && message.priority !== "high") return false;

    // Appliquer la recherche
    const searchLower = searchQuery.toLowerCase();
    return (
      message.name.toLowerCase().includes(searchLower) ||
      message.email.toLowerCase().includes(searchLower) ||
      message.subject.toLowerCase().includes(searchLower) ||
      message.message.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const getMessagePreview = (message, maxLength = 100) => {
    return message.length > maxLength
      ? `${message.substring(0, maxLength).replace(/\n/g, " ")}...`
      : message.replace(/\n/g, " ");
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des messages...</p>
      </div>
    );
  }

  return (
    <div className={`messages-management ${darkMode ? "dark-mode" : ""}`}>
      {!selectedMessage ? (
        // Liste des messages
        <>
          <div className="management-header">
            <h2>Gestion des messages</h2>
            <div className="message-filters">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Rechercher un message..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="filter-group">
                <FaFilter />
                <select value={filter} onChange={handleFilterChange}>
                  <option value="all">Tous les messages</option>
                  <option value="unread">Non lus</option>
                  <option value="replied">Répondus</option>
                  <option value="unreplied">Non répondus</option>
                  <option value="high">Priorité haute</option>
                </select>
              </div>
            </div>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="empty-messages">
              <FaEnvelope />
              <p>Aucun message ne correspond à vos critères.</p>
            </div>
          ) : (
            <div className="messages-list">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`message-item ${!message.isRead ? "unread" : ""}`}
                  onClick={() => handleSelectMessage(message)}
                >
                  <div className="message-icon">
                    {!message.isRead ? <FaEnvelope /> : <FaEnvelopeOpen />}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <h3>{message.subject}</h3>
                      <div className={`message-priority ${message.priority}`}>
                        {message.priority === "high" && (
                          <FaExclamationTriangle />
                        )}
                        {message.priority === "medium" && <FaStar />}
                        {message.priority === "low" && <FaCheckCircle />}
                      </div>
                    </div>
                    <div className="message-sender">
                      <span>
                        <FaUser /> {message.name}
                      </span>
                      <span>
                        <FaAt /> {message.email}
                      </span>
                    </div>
                    <p className="message-preview">
                      {getMessagePreview(message.message)}
                    </p>
                    <div className="message-footer">
                      <span className="message-date">
                        <FaClock /> {formatDate(message.date)}
                      </span>
                      <div className="message-status">
                        {message.isReplied && (
                          <span className="replied">
                            <FaReply /> Répondu
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        // Détail d'un message
        <div className="message-detail">
          <div className="detail-header">
            <button className="back-button" onClick={handleBackToList}>
              <FaArrowLeft /> Retour à la liste
            </button>
            <button
              className="delete-button"
              onClick={() => handleDeleteMessage(selectedMessage.id)}
            >
              <FaTrash /> Supprimer
            </button>
          </div>

          <div className="message-card">
            <h2 className="message-subject">{selectedMessage.subject}</h2>
            <div className="message-info">
              <div className="sender-info">
                <p>
                  <strong>De:</strong> {selectedMessage.name} (
                  {selectedMessage.email})
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(selectedMessage.date)}
                </p>
              </div>
              <div
                className={`message-priority-badge ${selectedMessage.priority}`}
              >
                {selectedMessage.priority === "high" && "Priorité haute"}
                {selectedMessage.priority === "medium" && "Priorité moyenne"}
                {selectedMessage.priority === "low" && "Priorité basse"}
              </div>
            </div>

            <div className="message-body">
              {selectedMessage.message.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            {selectedMessage.replies.length > 0 && (
              <div className="message-replies">
                <h3>Réponses précédentes</h3>
                {selectedMessage.replies.map((reply) => (
                  <div key={reply.id} className="reply-item">
                    <div className="reply-header">
                      <p>
                        <strong>{reply.adminName}</strong>
                      </p>
                      <p>{formatDate(reply.date)}</p>
                    </div>
                    <div className="reply-body">
                      {reply.message.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="reply-form">
              <h3>Répondre</h3>
              <div className="admin-name-input">
                <label>Nom / Service:</label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="Votre nom ou service"
                />
              </div>
              <form onSubmit={handleReply}>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Rédigez votre réponse ici..."
                  rows={6}
                  required
                ></textarea>
                <button type="submit" className="submit-button">
                  <FaPaperPlane /> Envoyer la réponse
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesManagement;
