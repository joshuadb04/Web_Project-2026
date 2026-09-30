import { Outlet, useLocation } from "react-router";
import { useEffect, useContext } from "react";
import Header from "./Header.jsx";
import { UserContext } from "../contexts/UserContext.jsx";

const Layout = () => {
  const { handleAutoLogin } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    handleAutoLogin();
    if (location.hash) {
      const section = document.getElementById(location.hash.substring(1));

      if (section) {
        section.scrollIntoView();
      }
    }
  }, [location]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
