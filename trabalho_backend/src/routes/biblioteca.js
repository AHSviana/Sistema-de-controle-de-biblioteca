// src/routes/livros.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bibliotecaController');

router.get('/', ctrl.getAll);        // GET /api/livros
router.get('/:id', ctrl.getById);    // GET /api/livros/:id
router.post('/', ctrl.create);       // POST /api/livros
router.put('/:id', ctrl.update);     // PUT /api/livros/:id
router.delete('/:id', ctrl.remove);  // DELETE /api/livros/:id

module.exports = router;
