import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    accountType: "free",
    joinDate: "",
  });

  useEffect(() => {
    // Load user data from localStorage or context
    const loadUserData = () => {
      try {
        // This is a placeholder. In a real app, you might get this from an API or context
        const userData = JSON.parse(localStorage.getItem("currentUser")) || {};
        setUserInfo({
          name: userData.name || "Utilisateur",
          email: userData.email || "exemple@email.com",
          accountType: userData.accountType || "free",
          joinDate: userData.joinDate || new Date().toLocaleDateString(),
        });
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={`profile-container ${theme === "dark" ? "dark" : ""}`}>
      <h1>Mon Profil</h1>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {userInfo.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-title">
            <h2>{userInfo.name}</h2>
            <span className={`account-type ${userInfo.accountType}`}>
              {userInfo.accountType === "premium" ? "Premium" : "Gratuit"}
            </span>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-group">
            <label>Email</label>
            <p>{userInfo.email}</p>
          </div>
          <div className="detail-group">
            <label>Date d'inscription</label>
            <p>{userInfo.joinDate}</p>
          </div>
          <div className="detail-group">
            <label>Type de compte</label>
            <p className={userInfo.accountType}>
              {userInfo.accountType === "premium" ? "Premium" : "Gratuit"}
            </p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="edit-profile-btn">Modifier le profil</button>
          {userInfo.accountType !== "premium" && (
            <button className="upgrade-btn">Passer à Premium</button>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
