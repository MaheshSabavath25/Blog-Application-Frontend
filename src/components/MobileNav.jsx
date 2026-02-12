import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiPlusCircle } from "react-icons/fi";
import "../styles/mobile-nav.css";

const MobileNav = () => {
  return (
    <div className="mobile-nav">
      <NavLink to="/posts" className="nav-item">
        <FiHome />
      </NavLink>

      <NavLink to="/myposts" className="nav-item">
        <FiUser />
      </NavLink>

      <NavLink to="/create" className="nav-item">
        <FiPlusCircle />
      </NavLink>
    </div>
  );
};

export default MobileNav;
