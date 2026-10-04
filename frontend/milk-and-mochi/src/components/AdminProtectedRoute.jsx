import { Navigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx";

const AdminProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtectedRoute;
