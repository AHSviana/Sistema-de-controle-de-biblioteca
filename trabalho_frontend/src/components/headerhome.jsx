// src/components/Header.jsx
import React from 'react';
import { Link,useLocation } from 'react-router-dom';

export default function Headerhome() {
  const location = useLocation();
  return (
    <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem 0' }}>
      <h1>Biblioteca Escolar</h1>
      <nav>
        {location.pathname !== "/" &&(
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>)}
        <Link to="/novo">Adicionar Livro</Link>
      </nav>
      <hr />
    </header>
  );
}
