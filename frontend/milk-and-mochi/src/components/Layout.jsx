import { Outlet, useLocation } from "react-router";
import { useEffect, useContext } from "react";
import Header from "./Header.jsx";
import { UserContext } from "../contexts/UserContext.jsx";
import Footer from "../components/Footer";

const Layout = () => {
  const { handleAutoLogin } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  useEffect(() => {
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
      <Footer />
    </>
  );
};

export default Layout;
