import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineFundProjectionScreen, AiOutlineUser } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { useTranslation } from 'react-i18next';
import { FaCog } from 'react-icons/fa';
import { FiSun, FiMoon } from "react-icons/fi";
import { Button } from "react-bootstrap";
import CustomDropdown from "./CustomDropdown"; 
import logo from "../Assets/logo.png";
import Particle from "./Particle"; // Importieren der Partikel-Komponente

function NavBar({ toggleTheme, darkMode, toggleParticles, particlesEnabled }) {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Sprache aus localStorage laden, falls vorhanden
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang); // Sprache in localStorage speichern
  };

  const handleThemeChange = () => {
    toggleTheme();
  };

  
  const handleParticleChange = () => {
    toggleParticles();
  };


  return (
    <div>
      <Navbar
        expanded={expand}
        fixed="top"
        expand="md"
        className={navColour ? "sticky" : "navbar"}
      >
        <Container>
          <Navbar.Brand href="/" className="d-flex">
            <img src={logo} className="img-fluid logo" alt="brand" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => {
              updateExpanded(expand ? false : "expanded");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto" defaultActiveKey="#home">
              <Nav.Item>
                <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> {t('home')}
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/about"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineUser style={{ marginBottom: "2px" }} /> {t('about')}
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/project"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} /> {t('projects_nav')}
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/documents"
                  onClick={() => updateExpanded(false)}
                >
                  <CgFileDocument style={{ marginBottom: "2px" }} /> {t('documents')}
                </Nav.Link>
              </Nav.Item>

              {/* Einstellungen-Button */}
              <Nav.Item>
                <Nav.Link href="#" onClick={handleShow}>
                  <FaCog style={{ marginBottom: "2px" }} />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal für Einstellungen */}
      <Modal show={showModal} onHide={handleClose} className="settings-modal">
        <Modal.Body>
          <div className="modal-content">
            <CustomDropdown
              options={[t('english'), t('german')]}
              onSelect={(option) => handleLanguageChange(option === t('english') ? 'en' : 'de')}
              selectedOption={i18n.language === 'en' ? t('english') : t('german')}
            />
            <div className="theme-toggle">
              <button
                className="btn b2"
                onClick={handleThemeChange}
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </div>
            {/* Button zum Umschalten der Partikel */}
            <div className="toggle-particles">
              <button
                className="btn b2"
                onClick={handleParticleChange}
              >
                {particlesEnabled ? t('disable_particles') : t('enable_particles')}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Partikel nur anzeigen, wenn der Zustand aktiviert ist */}
      {particlesEnabled && <Particle />}
    </div>
  );
}

export default NavBar;
