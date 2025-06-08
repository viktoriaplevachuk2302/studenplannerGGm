import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import "./WeeklyTasks.css";

const WeeklyTasks = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchWeekTasks = async () => {
      const now = new Date();
      const start = new Date(now.setDate(now.getDate() - now.getDay()));
      const end = new Date(now.setDate(start.getDate() + 7));

      const q = query(
        collection(db, "tasks"),
        where("uid", "==", currentUser.uid)
      );

      const snap = await getDocs(q);
      const filtered = snap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(t => {
          const due = new Date(t.date);
          return due >= start && due <= end;
        });

      setTasks(filtered);
    };

    fetchWeekTasks();
  }, [currentUser]);

  return (
    <div className="weekly-tasks-box">
      <h3>Цього тижня</h3>
      {tasks.length === 0 ? (
        <p>Немає завдань</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong><br />
              <small>{task.date} о {task.time}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WeeklyTasks;
