import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Translate from "./pages/Translate";
import Signup from "./pages/signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/translate" element={<Translate />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
