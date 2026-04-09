import React from "react";
import { motion } from "framer-motion";
import "./About.css";

export default function About() {
  const features = [
    {
      icon: "🎤",
      title: "Speech-to-Gloss",
      text: "Convert spoken words into structured sign language gloss using intelligent speech recognition.",
    },
    {
      icon: "✋",
      title: "Gloss-to-Text",
      text: "Transform sign language gloss into meaningful, readable English instantly.",
    },
    {
      icon: "💡",
      title: "AI Innovation",
      text: "Solving real-world accessibility challenges with modern AI solutions.",
    },
    {
      icon: "🚀",
      title: "Tech Stack",
      text: "Built with React, Django, MySQL, Speech Recognition & AI Models.",
    },
  ];

  return (
    <div className="about-container">
      
      {/* Floating Background Blobs */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      {/* Title */}
      <motion.h1
        className="about-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About HandTalk AI ✨
      </motion.h1>

      {/* Intro */}
      <motion.p
        className="about-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        HandTalk AI bridges communication gaps between the hearing and
        speech-impaired community and non-signers. It converts 
        <strong> speech into sign-language gloss </strong> 
        and transforms gloss back into readable English text —
        creating a more inclusive world.
      </motion.p>

      {/* Feature Cards */}
      <div className="feature-section">
        {features.map((item, i) => (
          <motion.div
            key={i}
            className="feature-card"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="feature-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission Section */}
      <motion.div
        className="mission-card"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2>🎯 Our Mission</h2>
        <p>
          Our mission is to build AI-powered inclusive technology that enables
          seamless communication across communities. We strive to reduce
          accessibility barriers and empower the deaf and hard-of-hearing
          community worldwide.
        </p>
      </motion.div>

    </div>
  );
}