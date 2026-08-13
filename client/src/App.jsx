<<<<<<< Updated upstream
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
=======
import Layout from "./components/layout.jsx";
import TraineeDashboard from "./Pages/Trainee/TraineeDashboard.jsx";
>>>>>>> Stashed changes

function App() {
  const role = "Admin";

  return (
<<<<<<< Updated upstream
    <div className="app">
      <Navbar role={role} />
      <Sidebar role={role} />
    </div>
=======
    <Layout role="Trainee">
      <TraineeDashboard />
    </Layout>
>>>>>>> Stashed changes
  );
}

export default App;