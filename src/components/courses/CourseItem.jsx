import "./CourseItem.css";

const CourseItem = ({ course, onEdit, onDelete }) => {
  return (
    <div className="course-item">
      <div className="course-name">{course.name}</div>
      <div className="course-teacher">{course.teacher}</div>
      <div className="course-actions">
        <button onClick={() => onEdit(course)}>✏️</button>
        <button onClick={() => onDelete(course.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default CourseItem;
