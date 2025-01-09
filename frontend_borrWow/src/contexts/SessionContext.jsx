import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const removeToken = () => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userId");
  };

  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${tokenToVerify}`,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log("Verify Token Response:", data); // Log the response
        setToken(tokenToVerify);
        setUserId(data.userId);
        setIsAuthenticated(true);
      } else {
        removeToken();
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error in verifyToken:", error);
      removeToken();
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const localToken = window.localStorage.getItem("authToken");
    if (localToken) {
      verifyToken(localToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("authToken", token);
      verifyToken(token);
      //the response of verifyToken(token) will give me the userId
    }
  }, [token]);

  const handleLogout = () => {
    removeToken();
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        token,
        userId,
        setToken,
        handleLogout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
