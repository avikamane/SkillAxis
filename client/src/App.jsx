import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./Pages/Admin/AdminDashboard";

function App() {
  const role = "Admin";

  return (
    <div className="app">
      <Navbar role={role} />
      <Sidebar role={role} />

      <main className="main-content">
        <AdminDashboard />
      </main>
    </div>
  );
}

export default App;