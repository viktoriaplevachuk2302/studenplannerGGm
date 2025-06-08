import { useNavigate } from "react-router-dom";
import "./CourseCard.css";

const CourseCard = ({ course, onDelete }) => {
  const navigate = useNavigate();

  const completed = course.labsStatus?.filter(Boolean).length || 0;
  const total = course.labsTotal || 0;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="course-card">
      <h3>{course.name}</h3>
      <p>{course.teacher}</p>
      <p>Лабораторні: {total}</p>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-percent">{progress}% виконано</p>

      <div className="card-buttons">
        <button onClick={() => navigate(`/courses/${course.id}`)}>Переглянути</button>
        <button onClick={() => onDelete(course.id)} className="delete-btn">×</button>
      </div>
    </div>
  );
};

export default CourseCard;
