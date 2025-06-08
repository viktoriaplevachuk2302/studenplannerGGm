import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import TaskTimer from "./TaskTimer";
import "./TasksBoard.css";

const TasksBoard = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", time: "", subject: "" });
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    const q = query(collection(db, "tasks"), where("uid", "==", currentUser.uid));
    const snap = await getDocs(q);
    const all = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTasks(all);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        uid: currentUser.uid,
        ...form,
        done: false,
      });
      setForm({ title: "", date: "", time: "", subject: "" });
      fetchTasks();
    } catch (err) {
      console.error("Помилка додавання завдання:", err);
    }
  };

  const markDone = async (id) => {
    await updateDoc(doc(db, "tasks", id), { done: true });
    fetchTasks();
  };

  const filtered = tasks.filter(task => {
    const now = new Date();
    const taskDate = new Date(task.date);
    switch (filter) {
      case "tomorrow":
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return taskDate.toDateString() === tomorrow.toDateString();
      case "week":
        const weekFromNow = new Date(now);
        weekFromNow.setDate(weekFromNow.getDate() + 7);
        return taskDate >= now && taskDate <= weekFromNow;
      case "done":
        return task.done;
      default:
        return true;
    }
  });

  return (
    <div className="tasks-box">
      <h2>Завдання</h2>

      <form onSubmit={handleAdd} className="task-form">
        <input
          type="text"
          placeholder="Назва"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Предмет"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />
        <button type="submit">Додати</button>
      </form>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>Усі</button>
        <button onClick={() => setFilter("tomorrow")}>Завтра</button>
        <button onClick={() => setFilter("week")}>Тиждень</button>
        <button onClick={() => setFilter("done")}>Виконані</button>
      </div>

      <div className="task-grid">
        {filtered.length === 0 ? (
          <p>Немає завдань</p>
        ) : (
          filtered.map(task => (
            <div key={task.id} className={`task-card ${task.done ? "done" : ""}`}>
              <h3>{task.title}</h3>
              <h4>{task.subject}</h4>
              <p>{task.date} о {task.time}</p>
              <TaskTimer deadline={`${task.date}T${task.time}`} />
              {!task.done && (
                <button className="mark-btn" onClick={() => markDone(task.id)}>
                  Виконано
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksBoard;
