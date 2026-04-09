import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("username");
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Translate", path: "/translate" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <motion.div
        className="logo"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        HandTalk AI
      </motion.div>

      <div className="nav-links">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`nav-item ${
              location.pathname === link.path ? "active" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}

        {isLoggedIn ? (
          <>
            <Link to="/profile" className="nav-item">
              Profile
            </Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-item">
              Login
            </Link>

            <Link to="/signup" className="nav-item">
              Signup
            </Link>
          </>
        )}
      </div>

      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="mobile-link"
              >
                {link.name}
              </Link>
            ))}

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="mobile-link"
                >
                  Profile
                </Link>

                <button onClick={handleLogout} className="mobile-link">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="mobile-link"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="mobile-link"
                >
                  Signup
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}