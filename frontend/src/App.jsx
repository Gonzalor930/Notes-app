import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ActiveNotes from './pages/ActiveNotes';
import ArchivedNotes from './pages/ArchivedNotes';
import EditNote from './pages/EditNote';

export default function App() {
  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        <h1>Notas App</h1>
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Notes Active</Link>
          <Link to="/archived" style={{ marginRight: '10px' }}>Notes Archived</Link>
          <Link to="/new">New Note</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ActiveNotes />} />
          <Route path="/archived" element={<ArchivedNotes />} />
          <Route path="/new" element={<EditNote />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
      </div>
    </Router>
  );
}
