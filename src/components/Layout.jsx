import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import { Outlet } from "react-router-dom";
import "../styles/layout.css";

const Layout = () => {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar />

      <div className="page">
        <Outlet />
      </div>

      <MobileNav logout={logout} />
    </>
  );
};

export default Layout;
