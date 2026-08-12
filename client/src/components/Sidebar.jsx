import {
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaCalendarAlt,
  FaClipboardCheck,
  FaTasks,
  FaChartLine,
  FaUserCircle,
  FaSignOutAlt,
  FaBook,
} from "react-icons/fa";

const menuItems = {
  Admin: [
    { label: "Dashboard", icon: FaTachometerAlt },
    { label: "Trainers", icon: FaChalkboardTeacher },
    { label: "Trainees", icon: FaUserGraduate },
    { label: "Attendance", icon: FaClipboardCheck },
    { label: "Assessments", icon: FaTasks },
    { label: "Sessions", icon: FaCalendarAlt },
    { label: "Progress", icon: FaChartLine },
    { label: "Reports", icon: FaBook },
    { label: "Profile", icon: FaUserCircle },
  ],

  Trainer: [
    { label: "Dashboard", icon: FaTachometerAlt },
    { label: "Sessions", icon: FaCalendarAlt },
    { label: "Trainees", icon: FaUserGraduate },
    { label: "Attendance", icon: FaClipboardCheck },
    { label: "Assessments", icon: FaTasks },
    { label: "Progress", icon: FaChartLine },
    { label: "Profile", icon: FaUserCircle },
  ],

  Trainee: [
    { label: "Dashboard", icon: FaTachometerAlt },
    { label: "My Sessions", icon: FaCalendarAlt },
    { label: "Attendance", icon: FaClipboardCheck },
    { label: "Assessments", icon: FaTasks },
    { label: "Progress", icon: FaChartLine },
    { label: "Profile", icon: FaUserCircle },
  ],
};

function Sidebar({ role = "Admin" }) {
  const items = menuItems[role] || menuItems.Admin;

  return (
    <aside className="sidebar">
      <nav className="sidebar-menu">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <a
              href="#"
              className="sidebar-item"
              key={item.label}
            >
              <Icon className="sidebar-icon" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="sidebar-divider"></div>

      <button className="logout-button">
        <FaSignOutAlt className="sidebar-icon" />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;

