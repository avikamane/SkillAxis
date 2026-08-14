import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaCalendarAlt,
  FaUserCheck,
  FaClipboardList,
  FaChartLine,
  FaUserCircle,
  FaSignOutAlt,
  FaBook,
  FaUsers,
  FaFolderOpen,
} from "react-icons/fa";

const menuItems = {
  Admin: [
    { label: "Dashboard", icon: FaHome },
    { label: "Trainers", icon: FaChalkboardTeacher },
    { label: "Trainees", icon: FaUserGraduate },
    { label: "Attendance", icon: FaUserCheck },
    { label: "Assessments", icon: FaClipboardList },
    { label: "Sessions", icon: FaCalendarAlt },
    { label: "Progress", icon: FaChartLine },
    { label: "Reports", icon: FaBook },
    { label: "Profile", icon: FaUserCircle },
  ],

  Trainer: [
    {
      label: "Dashboard",
      icon: FaHome,
      path: "/trainer/dashboard",
    },
    {
      label: "Sessions",
      icon: FaCalendarAlt,
      path: "/trainer/sessions",
    },
    {
      label: "Teams",
      icon: FaUsers,
      path: "/trainer/teams",
    },
    {
      label: "Trainees",
      icon: FaUserGraduate,
      path: "/trainer/trainees",
    },
    {
      label: "Attendance",
      icon: FaUserCheck,
      path: "/trainer/attendance",
    },
    {
      label: "Assessments",
      icon: FaClipboardList,
      path: "/trainer/assessments",
    },
    {
      label: "Progress",
      icon: FaChartLine,
      path: "/trainer/progress",
    },
    {
      label: "Profile",
      icon: FaUserCircle,
      path: "/trainer/profile",
    },
  ],

  Trainee: [
    { label: "Dashboard", icon: FaHome },
    { label: "My Sessions", icon: FaCalendarAlt },
    { label: "Attendance", icon: FaUserCheck },
    { label: "Assessments", icon: FaClipboardList },
    { label: "Teams", icon: FaUsers },
    { label: "Resources", icon: FaFolderOpen },
    { label: "Profile", icon: FaUserCircle },
  ],
};

/* ==========================================
   ROLE-WISE ROUTES
   ========================================== */

const routes = {
  Admin: {
    Dashboard: "/admin",
    Trainers: "/admin/trainers",
    Trainees: "/admin/trainees",
    Attendance: "/admin/attendance",
    Assessments: "/admin/assessments",
    Sessions: "/admin/sessions",
    Progress: "/admin/progress",
    Reports: "/admin/reports",
    Profile: "/admin/profile",
  },

  Trainer: {
    Dashboard: "/trainer/dashboard",
    Sessions: "/trainer/sessions",
    Trainees: "/trainer/trainees",
    Attendance: "/trainer/attendance",
    Assessments: "/trainer/assessments",
    Progress: "/trainer/progress",
    Profile: "/trainer/profile",
  },

  Trainee: {
    Dashboard: "/trainee/dashboard",
    "My Sessions": "/trainee/sessions",
    Attendance: "/trainee/attendance",
    Assessments: "/trainee/assessments",
    Teams: "/trainee/teams",
    Resources: "/trainee/resources",
    Profile: "/trainee/profile",
  },
};

function Sidebar({ role = "Admin" }) {
  const location = useLocation();

  const items = menuItems[role] || menuItems.Admin;
  const roleRoutes = routes[role] || routes.Admin;

  return (
    <aside className="sidebar">
      {/* ===============================
          MENU
          =============================== */}

      <nav className="sidebar-menu">
        {items.map((item) => {
          const Icon = item.icon;
          const path = roleRoutes[item.label];

          const isActive =
            location.pathname === path ||
            (item.label === "Dashboard" &&
              location.pathname === `/${role.toLowerCase()}`);

          return (
            <Link
              to={path || "#"}
              className={`sidebar-item ${isActive ? "active" : ""}`}
              key={item.label}
            >
              <Icon className="sidebar-icon" />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ===============================
          DIVIDER
          =============================== */}

      <div className="sidebar-divider"></div>

      {/* ===============================
          LOGOUT
          =============================== */}

      <button
        className="logout-button"
        onClick={() => {
          console.log("Logout clicked");
        }}
      >
        <FaSignOutAlt className="sidebar-icon" />

        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;
