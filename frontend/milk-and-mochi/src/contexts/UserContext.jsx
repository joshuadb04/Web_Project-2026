import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthentication } from "../hooks/apiHooks.js";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { postLogin } = useAuthentication();
  const navigate = useNavigate();

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

  return (
    <UserContext.Provider value={{ user, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
