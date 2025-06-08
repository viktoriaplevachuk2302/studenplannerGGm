import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import "./CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const docRef = doc(db, "courses", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setCourse({ id: snap.id, ...snap.data() });
      }
    };
    fetchCourse();
  }, [id]);

  const toggleLab = async (index) => {
    if (!course) return;
    const updated = [...course.labsStatus];
    updated[index] = !updated[index];

    await updateDoc(doc(db, "courses", course.id), {
      labsStatus: updated,
    });

    setCourse({ ...course, labsStatus: updated });
  };

  if (!course) return <p>Завантаження...</p>;

  return (
    <div className="course-details">
      <h2>{course.name} — Лабораторні</h2>
      <ul className="labs-list">
        {course.labsStatus.map((done, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={done}
                onChange={() => toggleLab(index)}
              />
              Лабораторна {index + 1}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;
