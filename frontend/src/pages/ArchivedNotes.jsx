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
      console.error('Error al obtener notas archivadas', err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error('Error al eliminar nota', err);
    }
  };

  const unarchiveNote = async (id) => {
    try {
      await API.patch(`/notes/${id}/toggle-archive`);
      fetchNotes();
    } catch (err) {
      console.error('Error al desarchivar nota', err);
    }
  };

  return (
    <div>
      <h2>Notas Archivadas</h2>
      {notes.length === 0 ? (
        <p>No hay notas archivadas.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id} style={{ marginBottom: '1rem' }}>
              <h3>{note.title}</h3>
                {note.category && <p><strong>Categoría:</strong> {note.category}</p>}
                <p>{note.content}</p>
              <button onClick={() => navigate(`/edit/${note.id}`)}>Editar</button>
              <button onClick={() => deleteNote(note.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
              <button onClick={() => unarchiveNote(note.id)} style={{ marginLeft: '10px' }}>Desarchivar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
