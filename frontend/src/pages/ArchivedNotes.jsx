import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function ArchivedNotes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await API.get('/notes/archived');
      //const res = await API.get('api/notes?archived=true');
      setNotes(res.data);
    } catch (err) {
      console.error('Error getting Archived Notes', err);
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

  const unarchiveNote = async (id) => {
    try {
      await API.patch(`/notes/${id}/toggle-archive`);
      fetchNotes();
    } catch (err) {
      console.error('Error unarchive notes', err);
    }
  };

  return (
    <div>
      <h2>Archived Notes</h2>
      {notes.length === 0 ? (
        <p>There are no archived notes.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id} style={{ marginBottom: '1rem' }}>
              <h3>{note.title}</h3>
                {note.category && <p><strong>Category:</strong> {note.category}</p>}
                <p>{note.content}</p>
              <button onClick={() => navigate(`/edit/${note.id}`)}>Edit</button>
              <button onClick={() => deleteNote(note.id)} style={{ marginLeft: '10px' }}>Delete</button>
              <button onClick={() => unarchiveNote(note.id)} style={{ marginLeft: '10px' }}>Unarchive</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
