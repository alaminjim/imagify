import { useAuth } from "../context/AppContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { setShowLogin, token } = useAuth();

  useEffect(() => {
    if (!token) {
      setShowLogin(true);
    }
  }, [token, setShowLogin]);

  if (!token) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
