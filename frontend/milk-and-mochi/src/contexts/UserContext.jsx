import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuthentication, useUser } from "../hooks/apiHooks.js";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { postLogin } = useAuthentication();
  const { getUserByToken } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials) => {
    try {
      const result = await postLogin(credentials);

      localStorage.setItem("token", result.token);
      setUser(result.user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login-register");
  };

  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = token ? await getUserByToken(token) : null;

      result ? setUser(result.user) : null;
      result ? navigate(location.pathname) : null;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, handleLogin, handleLogout, handleAutoLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
