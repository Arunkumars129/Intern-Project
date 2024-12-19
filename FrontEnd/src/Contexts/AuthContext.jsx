import { useContext, useState, createContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

 
  const verifyAuth = async () => {
    try {
      const response = await axios.get("/protected", { withCredentials: true });

     const statusCode = response.status
      const token = localStorage.getItem("accessToken"); //get the token from localstorage

      if (statusCode === 200 && token) {
        setIsAuthenticated(true); //user authenticated
        // console.log(isAuthenticated);
      } else {
        setIsAuthenticated(false); //unauthenticated
        // console.log(isAuthenticated);
      }
    } catch (error) {
      setIsAuthenticated(false); //unauthenticated
      console.log(error);
    } finally {
      setLoading(true);
    }
  };
  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, verifyAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
