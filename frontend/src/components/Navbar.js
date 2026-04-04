// frontend/src/components/Navbar.js
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <div className="logo">Maerose's Portfolio</div>
      <nav>
        <ul>
          <li><Link to="/home" className={location.pathname === "/home" ? "active" : ""}>HOME</Link></li>
          <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}>ABOUT</Link></li>
           <li><Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>CONTACT</Link></li>
          <li><Link to="/game" className={location.pathname === "/game" ? "active" : ""}>GAME</Link></li>
          
          {/* Conditional Rendering based on Authentication */}
          {!user ? (
            <>
              <li><Link to="/login" className={location.pathname === "/login" ? "active" : ""}>LOGIN</Link></li>
              <li><Link to="/register" className={location.pathname === "/register" ? "active" : ""}>REGISTER</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/create-post" className={location.pathname === "/create-post" ? "active" : ""}>WRITE</Link></li>
              <li><Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>PROFILE</Link></li>
              {user.role === 'admin' && <li><Link to="/admin" className={location.pathname === "/admin" ? "active" : ""}>ADMIN</Link></li>}
              <li><button onClick={handleLogout} style={{background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: 'var(--primary-color)'}}>LOGOUT</button></li>
            </>
          )}

          <li className="theme-switch-wrapper">
            <button id="theme-toggle" onClick={toggleTheme} title="Toggle Dark Mode">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;