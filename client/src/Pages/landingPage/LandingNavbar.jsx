import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo/skillAxis-logo.png";

import "./LandingNavbar.css";

function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="landing-navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <Link to="/LandingPage" className="landing-logo">
          <img src={logo} alt="SkillAxis Logo" />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="landing-nav">
          <a href="#home" className="active">
            Home
          </a>

          <a href="#features">Features</a>

          <a href="#about">About Us</a>

          <a href="#pricing">Pricing</a>

          <a href="#contact">Contact</a>
        </nav>

        {/* DESKTOP BUTTONS */}
        <div className="navbar-buttons">
          <Link to="/login" className="login-btn">
            Log In
          </Link>

          <Link to="/login" className="get-started-btn">
            Get Started
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="landing-mobile-menu"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="landing-mobile-menu-panel">
          <a href="#home" onClick={closeMenu}>
            Home
          </a>

          <a href="#features" onClick={closeMenu}>
            Features
          </a>

          <a href="#about" onClick={closeMenu}>
            About Us
          </a>

          <a href="#pricing" onClick={closeMenu}>
            Pricing
          </a>

          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>

          <div className="landing-mobile-menu-buttons">
            <Link to="/login" className="login-btn" onClick={closeMenu}>
              Log In
            </Link>

            <Link to="/login" className="get-started-btn" onClick={closeMenu}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default LandingNavbar;
