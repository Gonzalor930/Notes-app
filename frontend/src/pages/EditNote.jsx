import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isEditing) {
      API.get(`/notes/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch(err => console.error('Error al cargar nota', err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await API.put(`/notes/${id}`, { title, content });
      } else {
        await API.post('/notes', { title, content });
      }
      navigate('/');
    } catch (err) {
      console.error('Error al guardar nota', err);
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Editar Nota' : 'Nueva Nota'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label><br />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label>Contenido:</label><br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
          {isEditing ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
}
