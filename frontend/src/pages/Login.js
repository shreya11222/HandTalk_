import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { setTokens } from "../utils/auth";

/* ================= STYLES ================= */

const bg = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#0b1a2b,#102a43,#0b1a2b)",
};

const card = {
  width: 360,
  padding: 28,
  borderRadius: 16,
  background: "rgba(18,38,58,0.95)",
  boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
  backdropFilter: "blur(10px)",
};

const title = {
  color: "#4dabf7",
  marginBottom: 20,
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#1c3d5a",
  color: "#fff",
  fontSize: "14px",
};

const btn = {
  width: "100%",
  padding: "12px",
  borderRadius: "25px",
  border: "none",
  background: "linear-gradient(90deg,#3b82f6,#ec4899)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};

const footer = {
  marginTop: 15,
  fontSize: 13,
  textAlign: "center",
  color: "#94a3b8",
};

const link = {
  color: "#4dabf7",
  fontWeight: "600",
};

const message = {
  fontSize: 13,
  marginBottom: 10,
  textAlign: "center",
};

/* ================= COMPONENT ================= */

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.username || !form.password) {
      setMsg("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/login/", {
        username: form.username,
        password: form.password,
      });

      // ✅ SAVE TOKENS (if backend provides)
      setTokens(res.data);

      // ✅ SAVE USER INFO (IMPORTANT)
      localStorage.setItem("username", res.data.username || form.username);
      localStorage.setItem("email", res.data.email || "");
      localStorage.setItem("token", res.data.token || "");

      setMsg("Login successful!");

      setTimeout(() => {
        navigate("/translate");
      }, 700);

    } catch (error) {
      console.error(error);
      setMsg("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={bg}>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={card}
      >
        <h2 style={title}>Welcome Back 👋</h2>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={form.username}
          onChange={onChange}
          style={input}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={onChange}
          style={input}
        />

        {msg && (
          <p
            style={{
              ...message,
              color: msg.includes("successful") ? "#22c55e" : "#ef4444",
            }}
          >
            {msg}
          </p>
        )}

        <button type="submit" disabled={loading} style={btn}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={footer}>
          Don't have an account?{" "}
          <Link to="/signup" style={link}>
            Sign Up
          </Link>
        </p>
      </motion.form>
    </div>
  );
}