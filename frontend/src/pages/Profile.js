import React, { useEffect, useState } from "react";

export default function Profile() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        <h2>👤 User Profile</h2>

        <div className="profile-info">
          <p><strong>Username:</strong> {username || "Guest"}</p>
          <p><strong>Email:</strong> {email || "Not available"}</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </div>
  );
}