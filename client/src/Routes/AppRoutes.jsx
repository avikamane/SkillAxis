import { Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "../Pages/Admin/AdminDashboard";
import FeatureTrainer from "../Pages/Admin/feature-trainer";

function AppRoutes() {
  return (
    <Routes>
      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />

      <Route
        path="/admin/trainers"
        element={<FeatureTrainer />}
      />

      {/* Default */}
      <Route
        path="*"
        element={<Navigate to="/admin" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;