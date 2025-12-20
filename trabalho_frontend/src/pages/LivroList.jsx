// src/pages/LivroList.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

export default function LivroList() {
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();

  async function fetchLivros() {
    try {
      const res = await api.get('/');
      setLivros(res.data);
    } catch (err) {
      console.error('Erro ao buscar Livro', err);
      if (err.response && err.response.status !== 200)
        alert('Erro ao carregar livros');
    }
  }

  useEffect(() => { fetchLivros(); }, []);

  async function handleDelete(id) {
    if (!confirm('Deseja remover este livro?')) return;
    try {
      await api.delete(`/${id}`);
      setLivros(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao remover livro');
    }
  }

  return (
    <div className="page">
      <style>{`
        .page {
          background: #fff;
          padding: 20px;
          border-radius: 6px;
          max-width: 900px;
          margin: auto;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          font-family: Arial;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
        }
        th, td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        th {
          background: #eee;
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        button {
          padding: 6px 12px;
          border-radius: 4px;
          border: none;
          color: white;
          cursor: pointer;
          background: #007bff;
        }
        button:hover {
          opacity: .85;
        }
        .btn-secondary {
          background: #777;
        }
        .actions button {
          margin-right: 6px;
        }
      `}</style>

      <h2>Livros</h2>

      {livros.length === 0 ? (
        <p>Nenhum livro cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Ano</th>
              <th>Qtd</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map(l => (
              <tr key={l.id}>
                <td><Link to={`livro/${l.id}`}>{l.titulo}</Link></td>
                <td>{l.autor}</td>
                <td>{l.ano ?? '-'}</td>
                <td>{l.quantidade}</td>
                <td className="actions">
                  <button onClick={() => navigate(`/editar/${l.id}`)}>Editar</button>
                  <button onClick={() => handleDelete(l.id)} className="btn-secondary">Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
