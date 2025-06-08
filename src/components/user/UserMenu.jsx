import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import "./UserMenu.css";

const UserMenu = () => {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="user-menu">
      <div className="avatar" onClick={toggleMenu}>
        {currentUser?.photoURL ? (
          <img src={currentUser.photoURL} alt="user" className="avatar-img" />
        ) : (
          <div className="avatar-initial">
            {currentUser?.email[0].toUpperCase()}
          </div>
        )}
      </div>

      {open && (
        <div className="menu-dropdown">
          <button onClick={() => navigate("/profile")}>Профіль</button>
          <button onClick={handleLogout}>Вийти</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
