import { Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "../Pages/Admin/AdminDashboard";
import FeatureTrainer from "../Pages/Admin/feature-trainer";
import FeatureTrainee from "../Pages/Admin/feature-trainee";

function AppRoutes() {
  return (
    <Routes>

      {/* =========================
          ADMIN ROUTES
          ========================= */}

      {/* Admin Dashboard */}
      <Route
        path="/admin"
        element={<AdminDashboard />}
      />

      {/* Trainer Management */}
      <Route
        path="/admin/trainers"
        element={<FeatureTrainer />}
      />

      {/* Trainee Management */}
      <Route
        path="/admin/trainees"
        element={<FeatureTrainee />}
      />

      {/* =========================
          DEFAULT ROUTE
          ========================= */}

      <Route
        path="*"
        element={<Navigate to="/admin" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;