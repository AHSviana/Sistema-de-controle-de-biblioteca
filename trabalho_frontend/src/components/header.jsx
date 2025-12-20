// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem 0' }}>
      <h1>Biblioteca Escolar</h1>
      <nav>
        <Link to="/novo">Adicionar Livro</Link>
      </nav>
      <hr />
    </header>
  );
}