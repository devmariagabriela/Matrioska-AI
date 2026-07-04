import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { usuaria_id, texto } = req.body;

  if (!texto || !texto.trim()) {
    return res.status(400).json({ erro: 'texto é obrigatório' });
  }

  const result = await pool.query(
    'INSERT INTO relatos (usuaria_id, texto) VALUES ($1, $2) RETURNING id',
    [usuaria_id ?? null, texto]
  );
  res.json({ relato_id: result.rows[0].id });
});

export default router;
