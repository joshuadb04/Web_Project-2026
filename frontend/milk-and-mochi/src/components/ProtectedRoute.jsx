import { Navigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login-register" />;
  }

  return children;
};

export default ProtectedRoute;
