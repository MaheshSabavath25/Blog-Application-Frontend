import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

import "../styles/layout.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />

      <div className="page">
        <Outlet />
      </div>

      <MobileNav />
    </>
  );
};

export default Layout;
