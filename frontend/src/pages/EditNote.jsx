import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');


  useEffect(() => {
    if (isEditing) {
      API.get(`/notes/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setContent(res.data.content);
          setCategory(res.data.category || '');
        })
        .catch(err => console.error('Error loading Note', err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await API.put(`/notes/${id}`, { title, content, category });
      } else {
        await API.post('/notes', { title, content, category });
      }
      navigate('/');
    } catch (err) {
      console.error('Error saving Note ', err);
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Edit Note' : 'New Note'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label><br />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label>Category</label><br />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', marginBottom: '1rem' }}
            />
        </div>

        <div>
          <label>Content:</label><br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
          {isEditing ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}
