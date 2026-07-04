import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/match/:perfil_id', async (req, res) => {
  const skills = await pool.query('SELECT nome FROM skills WHERE perfil_id = $1', [req.params.perfil_id]);
  const nomesSkills = skills.rows.map(s => s.nome.toLowerCase());

  const vagas = await pool.query('SELECT * FROM vagas');

  const ranqueadas = vagas.rows
    .map(vaga => {
      const tags = vaga.tags.map(t => t.toLowerCase());
      const coincidencias = tags.filter(t => nomesSkills.includes(t)).length;
      const compatibilidade = Math.round((coincidencias / tags.length) * 100);
      return { ...vaga, compatibilidade };
    })
    .sort((a, b) => b.compatibilidade - a.compatibilidade);

  res.json(ranqueadas.slice(0, 5));
});

export default router;
