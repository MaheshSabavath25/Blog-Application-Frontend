import { useNavigate, useLocation } from "react-router-dom";

const MobileNav = ({ toggleDarkMode, logout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="mobile-nav">

      <div
        className={`mobile-item ${isActive("/allposts") ? "active" : ""}`}
        onClick={() => navigate("/allposts")}
      >
        🏠
      </div>

      <div
        className={`mobile-item ${isActive("/myposts") ? "active" : ""}`}
        onClick={() => navigate("/myposts")}
      >
        📝
      </div>

      <div
        className={`mobile-item ${isActive("/create") ? "active" : ""}`}
        onClick={() => navigate("/create")}
      >
        ➕
      </div>

      <div
        className="mobile-item"
        onClick={toggleDarkMode}
      >
        🌙
      </div>

      <div
        className="mobile-item logout"
        onClick={logout}
      >
        🔓
      </div>

    </div>
  );
};

export default MobileNav;
