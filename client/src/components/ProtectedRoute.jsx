import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../utils/Auth";

function ProtectedRoute({ allowedRole }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    if (user.role === "Admin") {
      return <Navigate to="/admin" replace />;
    }

    if (user.role === "Trainer") {
      return <Navigate to="/trainer/dashboard" replace />;
    }

    if (user.role === "Trainee") {
      return <Navigate to="/trainee/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
