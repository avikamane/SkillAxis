import {
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaCalendarAlt,
  FaClipboardCheck,
  FaTasks,
  FaChartLine,
  FaFileAlt,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">

      <nav className="sidebar-menu">

        <a href="#" className="sidebar-item active">
          <FaTachometerAlt />
          <span>Dashboard</span>
        </a>

        <a href="#" className="sidebar-item">
          <FaChalkboardTeacher />
          <span>Trainers</span>
        </a>

        <a href="#" className="sidebar-item">
          <FaUserGraduate />
          <span>Trainees</span>
        </a>

        <a href="#" className="sidebar-item">
          <FaCalendarAlt />
          <span>Sessions</span>
        </a>

        <a href="#" className="sidebar-item">
          <FaClipboardCheck />
          <span>Attendance</span>
        </a>

        <a href="#" className="sidebar-item">
          <FaTasks />
          <span>Assessments</span>
        </a>

        <a href="#" className="sidebar-item">
          <FaChartLine />
          <span>Progress</span>
        </a>

        <a href="#" className="sidebar-item">
          <FaFileAlt />
          <span>Reports</span>
        </a>

        <a href="#" className="sidebar-item">
          <FaUserCircle />
          <span>Profile</span>
        </a>

      </nav>
        <div className="sidebar-divider"></div>
      <button className="logout-button">
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

    </aside>
  );
}

export default Sidebar;