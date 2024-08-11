import React, { useState, useEffect } from "react";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Documents from "./components/Documents/Documents";
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";

function App() {
  const [load, updateLoad] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [particlesEnabled, setParticlesEnabled] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedParticles = localStorage.getItem('particles');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
    if (savedParticles) {
      setParticlesEnabled(savedParticles === 'enabled');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('particles', particlesEnabled ? 'enabled' : 'disabled');
  }, [particlesEnabled]);

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const toggleParticles = () => {
    setParticlesEnabled(prevState => !prevState);
  };

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar 
          toggleTheme={toggleTheme} 
          darkMode={darkMode} 
          toggleParticles={toggleParticles} 
          particlesEnabled={particlesEnabled} 
        />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
