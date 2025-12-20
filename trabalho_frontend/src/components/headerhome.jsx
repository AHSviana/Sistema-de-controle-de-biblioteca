
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  
  const isPaginaCadastro = location.pathname === '/novo';

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 2rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Biblioteca Escolar</h1>
      
      <nav>
        {}
        {!isPaginaCadastro && (
          <Link 
            to="/novo" 
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '0.9rem'
            }}
          >
            Adicionar Livro
          </Link>
        )}
      </nav>
    </header>
  );
}