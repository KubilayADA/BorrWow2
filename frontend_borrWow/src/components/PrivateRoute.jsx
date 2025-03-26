import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(SessionContext);

  /*   console.log("Loading:", isLoading); // Debugging line
  console.log("Authenticated:", isAuthenticated); // Debugging line gerekirse kullan  comment bırak
 */
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login...");
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
