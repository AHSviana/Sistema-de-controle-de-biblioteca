// src/controllers/bibliotecaController.js
const pool = require('../db');

async function getAll(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM livro ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM livro WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar livro' });
  }
}

async function create(req, res) {
  try {
    const { titulo, autor, isbn, ano, quantidade, descricao } = req.body;
    const [result] = await pool.query(
      'INSERT INTO livro (titulo, autor, isbn, ano, quantidade, descricao) VALUES (?, ?, ?, ?, ?, ?)',
      [titulo, autor, isbn || null, ano || null, quantidade ?? 1, descricao || null]
    );
    const insertedId = result.insertId;
    const [rows] = await pool.query('SELECT * FROM livro WHERE id = ?', [insertedId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar livro' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { titulo, autor, isbn, ano, quantidade, descricao } = req.body;
    const [result] = await pool.query(
      `UPDATE livro SET titulo = ?, autor = ?, isbn = ?, ano = ?, quantidade = ?, descricao = ? WHERE id = ?`,
      [titulo, autor, isbn || null, ano || null, quantidade ?? 1, descricao || null, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Livro não encontrado' });
    const [rows] = await pool.query('SELECT * FROM livro WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar livro' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM livro WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json({ message: 'Livro removido com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao remover livro' });
  }
}

module.exports = { getAll, getById, create, update, remove };
