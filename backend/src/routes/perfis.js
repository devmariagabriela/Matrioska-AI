import express from 'express';
import pool from '../db.js';
import { reconstruirCarreira } from '../ia.js';
import { salvarPerfil } from '../storage.js';

const router = express.Router();

router.post('/reconstruir', async (req, res) => {
  const { relato_id } = req.body;

  const relato = await pool.query('SELECT texto FROM relatos WHERE id = $1', [relato_id]);
  if (relato.rows.length === 0) {
    return res.status(404).json({ erro: 'relato não encontrado' });
  }

  let dadosIa;
  try {
    dadosIa = await reconstruirCarreira(relato.rows[0].texto);
  } catch (err) {
    console.error('Erro ao chamar IA:', err);
    return res.status(502).json({ erro: 'falha ao reconstruir carreira' });
  }

  const { skills, resumo, nivel } = dadosIa;

  const perfil = await pool.query(
    'INSERT INTO perfis (relato_id, resumo, nivel_empregabilidade) VALUES ($1, $2, $3) RETURNING id',
    [relato_id, resumo, nivel]
  );
  const perfilId = perfil.rows[0].id;

  for (const skill of skills) {
    await pool.query(
      'INSERT INTO skills (perfil_id, nome, origem) VALUES ($1, $2, $3)',
      [perfilId, skill.nome, skill.origem]
    );
  }

  try {
    await salvarPerfil(perfilId, { resumo, nivel, skills });
  } catch (err) {
    console.error('Erro ao salvar no storage (não bloqueia a resposta):', err);
  }

  res.json({ perfil_id: perfilId, resumo, nivel, skills });
});

router.get('/:id', async (req, res) => {
  const perfil = await pool.query('SELECT * FROM perfis WHERE id = $1', [req.params.id]);
  if (perfil.rows.length === 0) {
    return res.status(404).json({ erro: 'perfil não encontrado' });
  }
  const skills = await pool.query('SELECT nome, origem FROM skills WHERE perfil_id = $1', [req.params.id]);
  res.json({ ...perfil.rows[0], skills: skills.rows });
});

export default router;
