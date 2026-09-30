import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Header from "./Header.jsx";

const Layout = () => {
  const location = useLocation();

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
    </>
  );
};

export default Layout;
