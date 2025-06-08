import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "./Header.css";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
<nav className="nav">
  <Link to="/" className={isActive("/") ? "active" : ""}>Основна</Link>
  <Link to="/courses" className={isActive("/courses") ? "active" : ""}>Курси</Link>
  <Link to="/tasks" className={isActive("/tasks") ? "active" : ""}>Завдання</Link>
  <Link to="/notes" className={isActive("/notes") ? "active" : ""}>Нотатки</Link> {/* ← додано */}
</nav>


      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "🌞"}
        </button>

        <Link to="/profile" className="user-icon">
          {currentUser?.photoURL ? (
            <img src={currentUser.photoURL} alt="User" />
          ) : (
            <div className="icon-placeholder">
              {currentUser?.displayName?.charAt(0).toUpperCase() || "?"}
            </div>
          )}
        </Link>

        <button className="logout-btn" onClick={logout}>Вийти</button>
      </div>
    </header>
  );
};

export default Header;
