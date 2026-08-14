import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ role, children }) {
  return (
    <div className="app-layout">
      <Navbar role={role} />

      <Sidebar role={role} />

      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
