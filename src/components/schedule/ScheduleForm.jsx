import { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import "./ScheduleForm.css";

const ScheduleForm = ({ slot, onClose }) => {
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("lecture");
  const { currentUser } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setError("Користувач не авторизований");
      return;
    }

    try {
      await addDoc(collection(db, "schedule"), {
        uid: currentUser.uid,
        subject,
        type,
        day: slot.day,
        time: slot.time,
        created: Date.now()
      });
      onClose();
    } catch (err) {
      console.error("🔥 Firestore error:", err);
      setError("Помилка збереження в Firestore");
    }
  };

  return (
    <div className="modal-bg">
      <form className="modal" onSubmit={handleSubmit}>
        <h3>Додати пару</h3>
        <p>{slot.day} – {slot.time}</p>
        {error && <p className="error-msg">{error}</p>}
        <input
          type="text"
          placeholder="Назва предмету"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="lecture">Лекція</option>
          <option value="practice">Практична</option>
          <option value="lab">Лабораторна</option>
        </select>
        <div className="buttons">
          <button type="submit" className="btn save">Зберегти</button>
          <button type="button" className="btn cancel" onClick={onClose}>Скасувати</button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;
