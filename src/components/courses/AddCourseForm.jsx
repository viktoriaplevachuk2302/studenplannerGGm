import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import "./AddCourseForm.css";

const AddCourseForm = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [labsTotal, setLabsTotal] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !teacher.trim() || labsTotal <= 0) {
      setError("Усі поля обов'язкові. Лабораторних має бути хоча б 1.");
      return;
    }

    try {
      const labsStatus = Array.from({ length: Number(labsTotal) }, () => false);

      await addDoc(collection(db, "courses"), {
        uid: currentUser.uid,
        name,
        teacher,
        labsTotal: Number(labsTotal),
        labsStatus,
        created: Date.now(),
      });

      onClose();
    } catch (err) {
      setError("Помилка збереження.");
      console.error(err);
    }
  };

  return (
    <form className="course-form" onSubmit={handleSubmit}>
      <h3>Додати курс</h3>
      {error && <p className="form-error">{error}</p>}
      <input type="text" placeholder="Назва курсу" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Викладач" value={teacher} onChange={(e) => setTeacher(e.target.value)} required />
      <input type="number" placeholder="Кількість лабораторних" value={labsTotal} onChange={(e) => setLabsTotal(e.target.value)} min={1} required />
      <div className="form-buttons">
        <button type="submit" className="btn save">Зберегти</button>
        <button type="button" className="btn cancel" onClick={onClose}>Скасувати</button>
      </div>
    </form>
  );
};

export default AddCourseForm;
