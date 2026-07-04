import { readFileSync } from 'fs';
import pool from './db.js';

const sql = readFileSync(new URL('../schema.sql', import.meta.url), 'utf-8');

pool.query(sql)
  .then(() => {
    console.log('Schema aplicado com sucesso.');
    return pool.end();
  })
  .catch(err => {
    console.error('Erro ao aplicar schema:', err);
    process.exit(1);
  });
