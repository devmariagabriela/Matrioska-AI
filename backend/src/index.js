import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import relatosRouter from './routes/relatos.js';
import perfisRouter from './routes/perfis.js';
import vagasRouter from './routes/vagas.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use('/relatos', relatosRouter);
app.use('/perfis', perfisRouter);
app.use('/vagas', vagasRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Matrioska AI backend no ar na porta ${process.env.PORT || 3000}`);
});
