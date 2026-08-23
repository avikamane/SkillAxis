import { Link } from "react-router-dom";
import logo from "../assets/logo/skillAxis-logo.png";
import "./LandingNavbar.css";

function LandingNavbar() {
  return (
    <nav className="landing-navbar">
      <div className="landing-logo">
        <img src={logo} alt="SkillAxis" />
      </div>

      <div className="landing-nav-links">
        <Link to="/" className="landing-nav-link active">
          Home
        </Link>

        <a href="#features" className="landing-nav-link">
          Features
        </a>

        <a href="#about" className="landing-nav-link">
          About Us
        </a>

        <a href="#pricing" className="landing-nav-link">
          Pricing
        </a>

        <a href="#contact" className="landing-nav-link">
          Contact
        </a>
      </div>

      <div className="landing-nav-buttons">
        <Link to="/login" className="landing-login-btn">
          Log In
        </Link>

        <Link to="/login" className="landing-get-started-btn">
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default LandingNavbar;