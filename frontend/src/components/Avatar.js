import React from "react";
import "./Avatar.css";

export default function Avatar({ glossText }) {
  return (
    <div className="avatar-container">
      <h2 className="avatar-title">🤖 Sign Avatar</h2>

      <div className="avatar-box">
        {glossText ? (
          <p className="gloss-text">{glossText}</p>
        ) : (
          <p className="placeholder-text">No sign yet...</p>
        )}
      </div>
    </div>
  );
}