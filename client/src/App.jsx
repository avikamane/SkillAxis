import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./Pages/AdminDashboard";

function App() {
  return (
    <div className="app">
      <Navbar role={role} />

      <div className="main-layout">
        <Sidebar role={role} />

        <main className="main-content">
          <AdminDashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
