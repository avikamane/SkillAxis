import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import FeatureTrainer from "../Pages/Admin/feature-trainer";
import TrainerDashboard from "../Pages/Trainer/TrainerDashboard";
import TrainerSessions from "../Pages/Trainer/TrainerSession";
import TraineeDashboard from "../Pages/Trainee/TraineeDashboard";
import TraineeSessions from "../Pages/Trainee/TraineeSessions";
import TraineeAttendance from "../Pages/Trainee/TraineeAttendance"; // <-- IMPORT HERE

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <Layout role="Admin">
            <AdminDashboard />
          </Layout>
        }
      />

      <Route
        path="/admin/trainers"
        element={
          <Layout role="Admin">
            <FeatureTrainer />
          </Layout>
        }
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
      
      {/* =========================
          TRAINEE ROUTES
          ========================= */}

      <Route
        path="/trainee/dashboard"
        element={
          <Layout role="Trainee">
            <TraineeDashboard />
          </Layout>
        }
      />

      <Route
        path="/trainee/sessions"
        element={
          <Layout role="Trainee">
            <TraineeSessions />
          </Layout>
        }
      />

      {/* Trainee Attendance Route */}
      <Route
        path="/trainee/attendance"
        element={
          <Layout role="Trainee">
            <TraineeAttendance />
          </Layout>
        }
      />

      {/* =========================
          DEFAULT ROUTE
          ========================= */}

      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default AppRoutes;