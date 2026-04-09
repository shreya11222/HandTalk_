import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import heroBg from "../assets/image.png";
import logo from "../assets/signlang.png"; // ✅ LOGO IMAGE

function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="container nav-container">

          {/* LOGO */}
          <div className="logo-box">
            <img src={logo} alt="logo" className="logo-img" />
            <h2 className="logo-text">HandTalk AI</h2>
          </div>

          {/* NAV LINKS */}
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/translate">Translate</Link>
          </nav>

          {/* AUTH BUTTONS */}
          <div className="nav-buttons">
            <Link to="/login" className="btn nav-login">Login</Link>
            <Link to="/signup" className="btn nav-signup">Sign Up</Link>
          </div>

        </div>
      </header>

      {/* ================= HERO ================= */}
      <section
        className="hero"
        style={{
          background: `linear-gradient(rgba(10,20,40,0.75), rgba(10,20,40,0.85)), url(${heroBg})`,
        }}
      >
        <div className="hero-content">
          <h1>Next Generation Sign Language Translation</h1>
          <p>
            Translate speech into sign language using AI. Fast, accurate, and
            accessible communication for everyone.
          </p>

          <div className="hero-buttons">
            <Link to="/translate" className="btn primary">
              Start Translating
            </Link>
            <Link to="/about" className="btn outline">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features reveal">
        <div className="container">
          <h2 className="section-title">Powerful Features</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>⚡ Real-Time Detection</h3>
              <p>Instant gesture recognition powered by AI.</p>
            </div>

            <div className="feature-card">
              <h3>🌍 Multi-Language</h3>
              <p>Translate Hindi ↔ English with ease.</p>
            </div>

            <div className="feature-card">
              <h3>🔒 Secure</h3>
              <p>Your data stays safe and private.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats reveal">
        <div className="container stats-container">
          <div className="stat-box">
            <h2>1000+</h2>
            <p>Users</p>
          </div>

          <div className="stat-box">
            <h2>2+</h2>
            <p>Languages</p>
          </div>

          <div className="stat-box">
            <h2>91%</h2>
            <p>Accuracy</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta reveal">
        <h2>Ready to Break Communication Barriers?</h2>
        <Link to="/signup" className="btn secondary">
          Create Account
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <p>© 2026 HandTalk AI | Developed by Shreya & Tanya</p>
      </footer>

    </div>
  );
}

export default Home;