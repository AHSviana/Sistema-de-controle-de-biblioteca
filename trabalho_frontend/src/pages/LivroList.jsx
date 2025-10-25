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
      console.error('Erro ao buscar Livro',err);
      if(err.response && err.response.status !== 200)
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
    <div>
      <h2>Livros</h2>
      {livros.length === 0 ? <p>Nenhum livro cadastrado.</p> :
        <table border="1" cellPadding="8" style={{borderCollapse:'collapse', width:'100%'}}>
          <thead>
            <tr>
              <th>Título</th><th>Autor</th><th>Ano</th><th>Qtd</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map(l => (
              <tr key={l.id}>
                <td><Link to={`/biblioteca/${l.id}`}>{l.titulo}</Link></td>
                <td>{l.autor}</td>
                <td>{l.ano ?? '-'}</td>
                <td>{l.quantidade}</td>
                <td>
                  <button onClick={() => navigate(`/editar/${l.id}`)}>Editar</button>
                  <button onClick={() => handleDelete(l.id)} style={{marginLeft:8}}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}
