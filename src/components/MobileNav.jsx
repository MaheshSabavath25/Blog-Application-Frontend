import { useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiEdit, FiPlusSquare, FiLogOut } from "react-icons/fi";

const MobileNav = ({ logout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="mobile-nav">

      <div
        className={`mobile-item ${isActive("/allposts") || isActive("/posts") ? "active" : ""}`}
        onClick={() => navigate("/allposts")}
      >
        <FiHome size={22} />
      </div>

      <div
        className={`mobile-item ${isActive("/myposts") ? "active" : ""}`}
        onClick={() => navigate("/myposts")}
      >
        <FiEdit size={22} />
      </div>

      <div
        className={`mobile-item ${isActive("/create") ? "active" : ""}`}
        onClick={() => navigate("/create")}
      >
        <FiPlusSquare size={22} />
      </div>

      <div
        className="mobile-item logout"
        onClick={logout}
      >
        <FiLogOut size={22} />
      </div>

    </div>
  );
};

export default MobileNav;
