import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSignOutAlt, FaPenNib } from "react-icons/fa";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* LEFT - LOGO */}
      <div className="nav-logo">
        <FaPenNib className="logo-icon" />
        <span>BlogApp</span>
      </div>

      {/* CENTER - LINKS */}
      <div className="nav-links">
        <Link to="/allposts">All Posts</Link>
        <Link to="/myposts">My Posts</Link>
        <Link to="/create">Create</Link>
      </div>

      {/* RIGHT - ACTIONS */}
      <div className="nav-actions">
        
        <FaSignOutAlt
          className="nav-icon logout"
          title="Logout"
          onClick={logout}
        />
      </div>

    </nav>
  );
};

export default Navbar;
