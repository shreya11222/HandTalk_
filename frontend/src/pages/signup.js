import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate?.bind?.(null) ?? (() => {});
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const passwordStrength = (pw) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const validate = () => {
    if (!form.username.trim()) return "Please enter your name.";
    if (!form.email.includes("@")) return "Enter valid email.";
    if (form.password.length < 6) return "Password must be 6+ chars.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    const err = validate();
    if (err) return setMsg({ type: "error", text: err });

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg({
          type: "error",
          text: data?.error || "Signup failed",
        });
      } else {
        setMsg({ type: "success", text: "Account created!" });
        setTimeout(() => navigate("/translate"), 900);
      }
    } catch {
      setMsg({ type: "error", text: "Backend not reachable" });
    } finally {
      setLoading(false);
    }
  };

  const strength = passwordStrength(form.password);
  const strengthText = ["Weak", "Fair", "Good", "Strong"][strength];

  return (
    <div style={containerStyle}>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={cardStyle}
      >
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 15 }}>
          <h2 style={titleStyle}>Create Account</h2>
          <p style={subtitleStyle}>
            Join HandTalk AI to start translating
          </p>
        </div>

        {/* NAME */}
        <label style={label}>
          Name
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            style={input}
            placeholder="Enter name"
          />
        </label>

        {/* EMAIL */}
        <label style={label}>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            style={input}
            placeholder="Enter email"
          />
        </label>

        {/* PASSWORD */}
        <label style={label}>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            style={input}
            placeholder="Enter password"
          />
        </label>

        {/* STRENGTH BAR */}
        <div style={strengthBar}>
          <div
            style={{
              ...strengthFill,
              width: `${(strength / 3) * 100}%`,
            }}
          />
        </div>
        <small style={{ color: "#94a3b8" }}>{strengthText}</small>

        {/* MESSAGE */}
        {msg.text && (
          <div
            style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 8,
              fontSize: 14,
              background:
                msg.type === "success"
                  ? "rgba(34,197,94,0.15)"
                  : "rgba(239,68,68,0.15)",
              color:
                msg.type === "success" ? "#22c55e" : "#ef4444",
            }}
          >
            {msg.text}
          </div>
        )}

        {/* BUTTON */}
        <button style={btn} disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* FOOTER */}
        <p style={footerText}>
          Already have an account?{" "}
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

/* ================= STYLES ================= */

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(135deg,#0b1a2b,#102a43,#0b1a2b)",
};

const cardStyle = {
  width: "380px",
  padding: "25px",
  borderRadius: "16px",
  background: "rgba(18,38,58,0.95)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
};

const titleStyle = {
  color: "#4dabf7",
  marginBottom: 5,
};

const subtitleStyle = {
  fontSize: 14,
  color: "#94a3b8",
};

const label = {
  fontSize: 13,
  marginTop: 10,
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  marginTop: 5,
  background: "#1c3d5a",
  color: "white",
};

const strengthBar = {
  width: "100%",
  height: 6,
  background: "#1e293b",
  borderRadius: 6,
  marginTop: 8,
};

const strengthFill = {
  height: "100%",
  background: "linear-gradient(90deg,#3b82f6,#ec4899)",
};

const btn = {
  width: "100%",
  padding: "12px",
  marginTop: 15,
  borderRadius: "20px",
  border: "none",
  background: "linear-gradient(90deg,#3b82f6,#ec4899)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

const footerText = {
  marginTop: 15,
  textAlign: "center",
  fontSize: 13,
  color: "#94a3b8",
};

const linkStyle = {
  color: "#4dabf7",
  fontWeight: "600",
};