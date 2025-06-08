import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import "./UserProfile.css";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [firstName, setFirstName] = useState(currentUser?.displayName?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(currentUser?.displayName?.split(" ")[1] || "");

  const handleSave = async () => {
    if (!currentUser) return;
    const displayName = `${firstName} ${lastName}`.trim();
    await updateProfile(currentUser, { displayName });
    window.location.reload();
  };

  return (
    <div className="user-profile">
      <h2>Мій профіль</h2>

      <div className="avatar-section">
        {currentUser?.photoURL ? (
          <img src={currentUser.photoURL} alt="avatar" className="avatar-img" />
        ) : (
          <div className="avatar-placeholder">
            {currentUser?.email[0].toUpperCase()}
          </div>
        )}
      </div>

      <div className="profile-fields">
        <input
          type="text"
          placeholder="Ім'я"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Прізвище"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <button onClick={handleSave}>Зберегти</button>
    </div>
  );
};

export default UserProfile;
