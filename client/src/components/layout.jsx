import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ role, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      <Navbar
        role={role}
        sidebarOpen={sidebarOpen}
        onMenuClick={toggleSidebar}
      />

      <Sidebar role={role} sidebarOpen={sidebarOpen} onClose={closeSidebar} />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
