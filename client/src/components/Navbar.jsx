import logo from "../assets/logo/skillaxis-logo.png";

import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

function Navbar({ role = "Admin", sidebarOpen = false, onMenuClick }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="navbar-logo">
          <img src={logo} alt="SkillAxis" className="skillaxis-logo" />
        </div>
      </div>

      <div className="navbar-user">
        <span className="user-role">{role}</span>

        <button className="profile-button" aria-label="Profile">
          <FaUserCircle />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
