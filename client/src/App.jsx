import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const role = "Admin";

  return (
    <div className="app">
      <Navbar role={role} />
      <Sidebar role={role} />
    </div>
  );
}

export default App;