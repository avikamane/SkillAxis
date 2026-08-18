import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import FeatureTrainer from "../Pages/Admin/feature-trainer";
import FeatureTrainee from "../Pages/Admin/feature-trainee";
import FeatureAttendance from "../Pages/Admin/feature-attendance";
import FeatureAssesment from "../Pages/Admin/feature-assesment";
import TrainerDashboard from "../Pages/Trainer/TrainerDashboard";
import TrainerSessions from "../Pages/Trainer/TrainerSession";
import TrainerTeams from "../Pages/Trainer/TrainerTeams";
import TrainerTrainees from "../Pages/Trainer/TrainerTrainees";
import TrainerAttendance from "../Pages/Trainer/TrainerAttendance";
import TrainerAssessments from "../Pages/Trainer/TrainerAssessments";
import TrainerResources from "../Pages/Trainer/TrainerResources";
import TrainerAllAssessments from "../Pages/Trainer/TrainerAllAssessments";
import TrainerProgress from "../Pages/Trainer/TrainerProgress";
import TraineeDashboard from "../Pages/Trainee/TraineeDashboard";
import TraineeSessions from "../Pages/Trainee/TraineeSessions";
import TraineeAttendance from "../Pages/Trainee/TraineeAttendance";
import TraineeAssessments from "../Pages/Trainee/TraineeAssessments";
import TraineeTeams from "../Pages/Trainee/TraineeTeams";

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
      <Route
        path="/admin/trainees"
        element={
          <Layout role="Admin">
            <FeatureTrainee />
          </Layout>
        }
      />
      <Route
  path="/admin/attendance"
  element={
    <Layout role="Admin">
      <FeatureAttendance />
    </Layout>
  }
/>
<Route
  path="/admin/assessments"
  element={
    <Layout role="Admin">
      <FeatureAssesment />
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
      <Route
        path="/trainer/teams"
        element={
          <Layout role="Trainer">
            <TrainerTeams />
          </Layout>
        }
      />
      <Route
        path="/trainer/trainees"
        element={
          <Layout role="Trainer">
            <TrainerTrainees />
          </Layout>
        }
      />
      <Route
        path="/trainer/attendance"
        element={
          <Layout role="Trainer">
            <TrainerAttendance />
          </Layout>
        }
      />
      <Route
        path="/trainer/assessments"
        element={
          <Layout role="Trainer">
            <TrainerAssessments />
          </Layout>
        }
      />
      <Route path="/trainer/resources" element={<TrainerResources />} />

      <Route
        path="/trainer/assessments/all"
        element={<TrainerAllAssessments />}
      />
      <Route
        path="/trainer/progress"
        element={
          <Layout role="Trainer">
            <TrainerProgress />
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

      {/* Trainee Assessments Route */}
      <Route
        path="/trainee/assessments"
        element={
          <Layout role="Trainee">
            <TraineeAssessments />
          </Layout>
        }
      />

      <Route
        path="/trainee/teams"
        element={
          <Layout role="Trainee">
            <TraineeTeams />
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
