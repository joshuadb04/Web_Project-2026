import { Outlet } from "react-router";
import Header from "./Header.jsx";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
