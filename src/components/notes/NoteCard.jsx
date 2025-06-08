import { useEffect, useState } from "react";
import "./NoteCard.css";

const NoteCard = ({ note, onDelete }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (!note.created) return;
    const date = new Date(note.created);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    setFormattedDate(`${day}.${month}, ${hours}:${minutes}`);
  }, [note.created]);

  return (
    <div className="note-card" style={{ backgroundColor: note.color || "#fffa9e" }}>
      <button className="delete" onClick={() => onDelete(note.id)}>×</button>
      <p>{note.text}</p>
      <div className="note-footer">
        <small>{formattedDate}</small>
      </div>
    </div>
  );
};

export default NoteCard;
