// src/pages/LivroDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function LivroDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState(null);

  useEffect(() => {
    api.get(`/biblioteca/${id}`).then(res => setLivro(res.data)).catch(err => {
      console.error(err);
      alert('Erro ao buscar livro');
    });
  }, [id]);

  if (!livro) return <p>Carregando...</p>;

  return (
    <div>
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
