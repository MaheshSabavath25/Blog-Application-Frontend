import Navbar from "./Navbar";

import "../styles/layout.css";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="page">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
