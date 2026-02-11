import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    if (!name || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await API.post("/api/auth/register", {
        name,
        email,
        password,
        about,
      });

      alert("Registration successful ✅");
      navigate("/login");
    } catch (err) {
      alert("Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="auth-input"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />

        <textarea
          placeholder="About yourself (optional)"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="auth-textarea"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />

        <button
          onClick={registerUser}
          className="auth-button"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
