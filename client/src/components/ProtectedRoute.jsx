import { Navigate } from "react-router-dom";

// read auth from context

export default function ProtectedRoute({ isAuth, children }) {
  return isAuth ? children : <Navigate to="/login" />;
}
