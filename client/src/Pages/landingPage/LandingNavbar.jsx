import { Link } from "react-router-dom";
import logo from "../../assets/logo/skillAxis-logo.png";
import "./LandingNavbar.css";

function LandingNavbar() {
  return (
    <header className="landing-navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <Link to="/LandingPage" className="landing-logo">
          <img src={logo} alt="SkillAxis Logo" />
        </Link>

        {/* NAVIGATION */}
        <nav className="landing-nav">

          <a href="#home" className="active">
            Home
          </a>

          <a href="#features">
            Features
          </a>

          <a href="#about">
            About Us
          </a>

          <a href="#pricing">
            Pricing
          </a>

          <a href="#contact">
            Contact
          </a>

        </nav>

        {/* BUTTONS */}
        <div className="navbar-buttons">

          <Link to="/login" className="login-btn">
            Log In
          </Link>

          <Link to="/login" className="get-started-btn">
            Get Started
          </Link>

        </div>

      </div>

    </header>
  );
}

export default LandingNavbar;