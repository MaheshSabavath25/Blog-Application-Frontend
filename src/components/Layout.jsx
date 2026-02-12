import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/layout.css";

const Layout = () => {

  const { dark, setDark } = useContext(ThemeContext);

  const toggleDarkMode = () => {
    setDark(!dark);
  };

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

      <MobileNav 
        toggleDarkMode={toggleDarkMode}
        logout={logout}
      />
    </>
  );
};

export default Layout;
