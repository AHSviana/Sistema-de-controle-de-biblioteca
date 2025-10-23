// src/pages/LivroForm.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

export default function LivroForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: '', autor: '', isbn: '', ano: '', quantidade: 1, descricao: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/biblioteca/${id}`).then(res => setForm({
        titulo: res.data.titulo || '',
        autor: res.data.autor || '',
        isbn: res.data.isbn || '',
        ano: res.data.ano || '',
        quantidade: res.data.quantidade ?? 1,
        descricao: res.data.descricao || ''
      })).catch(err => {
        console.error(err);
        alert('Erro ao buscar livro');
      }).finally(() => setLoading(false));
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!form.titulo || !form.autor) {
        alert('Preencha título e autor.');
        return;
      }
      if (id) {
        await api.put(`/biblioteca/${id}`, {
          ...form,
          ano: form.ano ? Number(form.ano) : null,
          quantidade: Number(form.quantidade)
        });
        alert('Livro atualizado');
      } else {
        await api.post('/biblioteca', {
          ...form,
          ano: form.ano ? Number(form.ano) : null,
          quantidade: Number(form.quantidade)
        });
        alert('Livro criado');
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar livro');
    }
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{id ? 'Editar Livro' : 'Novo Livro'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título *</label><br/>
          <input name="titulo" value={form.titulo} onChange={handleChange} required />
        </div>
        <div>
          <label>Autor *</label><br/>
          <input name="autor" value={form.autor} onChange={handleChange} required />
        </div>
        <div>
          <label>ISBN</label><br/>
          <input name="isbn" value={form.isbn} onChange={handleChange} />
        </div>
        <div>
          <label>Ano</label><br/>
          <input name="ano" value={form.ano} onChange={handleChange} type="number" />
        </div>
        <div>
          <label>Quantidade</label><br/>
          <input name="quantidade" value={form.quantidade} onChange={handleChange} type="number" min="0" />
        </div>
        <div>
          <label>Descrição</label><br/>
          <textarea name="descricao" value={form.descricao} onChange={handleChange}></textarea>
        </div>
        <div style={{marginTop:10}}>
          <button type="submit">{id ? 'Salvar' : 'Criar'}</button>
          <button type="button" onClick={() => navigate('/')} style={{marginLeft:8}}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
