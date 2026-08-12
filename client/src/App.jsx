import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Navbar role="Admin" />

      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <h1>Welcome to SkillAxis</h1>
        </main>
      </div>
    </>
  );
}

export default App;