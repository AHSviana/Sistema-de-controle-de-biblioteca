// src/pages/LivroDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function LivroDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState(null);

  useEffect(() => {
    api.get(`/${id}`).then(res => setLivro(res.data)).catch(err => {
      console.error(err);
      alert('Erro ao buscar livro');
    });
  }, [id]);

  if (!livro) return <p>Carregando...</p>;

  return (
    <div className="page">
      <style>{`
        .page {
          background: #fff;
          padding: 20px;
          border-radius: 6px;
          max-width: 700px;
          margin: auto;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          font-family: Arial;
        }
        button {
          padding: 8px 14px;
          border-radius: 4px;
          border: none;
          color: white;
          background: #007bff;
          cursor: pointer;
        }
        button:hover {
          opacity: .85;
        }
      `}</style>

      <h2>{livro.titulo}</h2>
      <p><strong>Autor:</strong> {livro.autor}</p>
      <p><strong>ISBN:</strong> {livro.isbn ?? '-'}</p>
      <p><strong>Ano:</strong> {livro.ano ?? '-'}</p>
      <p><strong>Quantidade:</strong> {livro.quantidade}</p>
      <p><strong>Descrição:</strong> {livro.descricao ?? '-'}</p>

      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}
