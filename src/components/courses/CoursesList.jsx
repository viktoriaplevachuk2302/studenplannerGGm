import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  collection, query, where, getDocs, addDoc, deleteDoc, doc
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import CourseCard from "./CourseCard"; // не забудь створити цей файл
import "./CoursesList.css";

const CoursesList = () => {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", teacher: "", labsTotal: 0 });

  const fetchCourses = async () => {
    const q = query(collection(db, "courses"), where("uid", "==", currentUser.uid));
    const snap = await getDocs(q);
    setCourses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const labsTotal = parseInt(form.labsTotal, 10);
    const labsStatus = Array.from({ length: labsTotal }, () => false);

    try {
      await addDoc(collection(db, "courses"), {
        uid: currentUser.uid,
        name: form.name,
        teacher: form.teacher,
        labsTotal,
        labsStatus,
        created: Date.now(),
      });

      setForm({ name: "", teacher: "", labsTotal: 0 });
      setShowForm(false);
      fetchCourses();
    } catch (err) {
      console.error("Помилка додавання курсу:", err);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "courses", id));
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="courses-box">
      <h2>Мої курси</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Скасувати" : "Додати курс"}
      </button>

      {showForm && (
        <form className="course-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Назва курсу"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Викладач"
            value={form.teacher}
            onChange={(e) => setForm({ ...form, teacher: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="К-сть лабораторних"
            value={form.labsTotal}
            onChange={(e) => setForm({ ...form, labsTotal: e.target.value })}
            required
          />
          <div className="buttons">
            <button type="submit">Зберегти</button>
            <button type="button" onClick={() => setShowForm(false)}>Скасувати</button>
          </div>
        </form>
      )}

      <div className="courses-grid">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
