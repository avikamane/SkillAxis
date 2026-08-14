import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout";

import TrainerDashboard from "../Pages/Trainer/TrainerDashboard";
import TrainerSessions from "../Pages/Trainer/TrainerSession";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
