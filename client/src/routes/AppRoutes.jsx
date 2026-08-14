import { Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "../Pages/AdminDashboard";
import FeatureTrainer from "../Pages/Admin/feature-trainer";
import TrainerDashboard from "../Pages/Trainer/TrainerDashboard";
import TrainerSessions from "../Pages/Trainer/TrainerSession";

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
      {/* Trainer */}
        <Route
          path="/trainer/dashboard"
          element={
            <Layout role="Trainer">
              <TrainerDashboard />
            </Layout>
          }
        />

        <Route
          path="/trainer/sessions"
          element={
            <Layout role="Trainer">
              <TrainerSessions />
            </Layout>
          }
        />
        <Layout role="Trainee">
        <Routes>
          <Route path="/trainee/dashboard" element={<TraineeDashboard />} />
        </Routes>
      </Layout> 

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