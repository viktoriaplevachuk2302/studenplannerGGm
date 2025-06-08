import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import NoteCard from "../components/notes/NoteCard";
import "./NotesPage.css";

const NotesPage = () => {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const fetchNotes = async () => {
    if (!currentUser) return;
    const q = query(collection(db, "notes"), where("uid", "==", currentUser.uid));
    const snap = await getDocs(q);
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setNotes(data);
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    const note = {
      uid: currentUser.uid,
      text: newNote,
      color: randomColor(),
      created: Date.now(), // виправлено: мілісекунди, коректно парситься
    };
    await addDoc(collection(db, "notes"), note);
    setNewNote("");
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    fetchNotes();
  };

  const randomColor = () => {
    const colors = ["#fffa9e", "#ffd6d6", "#d6ffdc", "#d6e9ff"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    fetchNotes();
  }, [currentUser]);

  return (
    <div className="notes-page">
      <h2>Нотатки</h2>
      <div className="add-note">
        <textarea
          placeholder="Нова нотатка..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        ></textarea>
        <button onClick={handleAddNote}>Додати</button>
      </div>
      <div className="notes-wall">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
