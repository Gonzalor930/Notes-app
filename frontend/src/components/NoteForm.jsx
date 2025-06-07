import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function NoteForm({ note, onSubmit }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [archived, setArchived] = useState(note?.archived || false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(note?.categories?.map(c => c.id) || []);

  useEffect(() => {
    axios.get('http://localhost:8080/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      archived,
      categories: selectedCategories.map(id => ({ id }))
    });
  };

  const toggleCategory = id => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Contenido" value={content} onChange={e => setContent(e.target.value)} required />
      <label>
        <input type="checkbox" checked={archived} onChange={e => setArchived(e.target.checked)} />
        Archivar
      </label>
      <div>
        <strong>Categorías:</strong><br />
        {categories.map(cat => (
          <label key={cat.id} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.id)}
              onChange={() => toggleCategory(cat.id)}
            />
            {cat.name}
          </label>
        ))}
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
}
