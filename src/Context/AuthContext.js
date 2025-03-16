import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          console.log("Token expired, logging out...");
          logout();
        } else {
          setUser(decoded);
        }
      } catch (error) {
        console.error("❌ Invalid token, logging out...");
        logout();
      }
    } else {
      console.log("❌ No token found, user is not logged in.");
    }

    setLoading(false);
  }, []);

  const login = (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("token", token); // ✅ Persistent storage
    } else {
      sessionStorage.setItem("token", token); // ✅ Clears on browser close
    }

    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading,token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
