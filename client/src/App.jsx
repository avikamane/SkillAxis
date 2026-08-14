import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import FeatureTrainer from "./Pages/Admin/feature-trainer";

function App() {
  return (
    <BrowserRouter>
      <Layout role="Admin">
        <Routes>
          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Trainer Management */}
          <Route
            path="/admin/trainers"
            element={<FeatureTrainer />}
          />

          {/* Default page */}
          <Route
            path="*"
            element={<Navigate to="/admin" replace />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;