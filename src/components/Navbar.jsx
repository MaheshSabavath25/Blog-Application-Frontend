import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/navbar.css";


const Navbar = () => {
  const navigate = useNavigate();
  const { dark, setDark } = useContext(ThemeContext);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <button onClick={() => navigate("/posts")}>All Posts</button>
        <button onClick={() => navigate("/myposts")}>My Posts</button>
        <button onClick={() => navigate("/create")}>Create</button>
        
      </div>

      <div className="nav-right">
        <button onClick={() => setDark(!dark)}>
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
