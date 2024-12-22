import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../provider/AuthProvider";

// eslint-disable-next-line react/prop-types
const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoutes;
