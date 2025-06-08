import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function ActiveNotes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await API.get('http://localhost:8080/api/notes/active');
      setNotes(res.data);
    } catch (err) {
      console.error('Error getting active notes', err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error('Error deleting Note', err);
    }
  };

  const archiveNote = async (id) => {
    try {
      await API.patch(`/notes/${id}/toggle-archive`);
      fetchNotes();
    } catch (err) {
      console.error('Error archiving note', err);
    }
  };

  return (
    <div>
      <h2>Active Notes</h2>
      {notes.length === 0 ? (
        <p>There are no active notes.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id} style={{ marginBottom: '1rem' }}>
              <h3>{note.title}</h3>
                {note.category && <p><strong>Category:</strong> {note.category}</p>}
                <p>{note.content}</p>
              <button onClick={() => navigate(`/edit/${note.id}`)}>Edit</button>
              <button onClick={() => deleteNote(note.id)} style={{ marginLeft: '10px' }}>Delete</button>
              <button onClick={() => archiveNote(note.id)} style={{ marginLeft: '10px' }}>File</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
