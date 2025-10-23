// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LivroList from './pages/LivroList';
import LivroForm from './pages/LivroForm';
import LivroDetails from './pages/LivroDetalhes';
import Header from './components/Header';

export default function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<LivroList />} />
        <Route path="/novo" element={<LivroForm />} />
        <Route path="/editar/:id" element={<LivroForm />} />
        <Route path="/livro/:id" element={<LivroDetails />} />
      </Routes>
    </div>
  );
}
