import { useState } from 'react';
import Home from './pages/Home.jsx';
import Resultado from './pages/Resultado.jsx';

export default function App() {
  const [dados, setDados] = useState(null);

  return dados
    ? <Resultado perfil={dados.perfil} vagas={dados.vagas} onVoltar={() => setDados(null)} />
    : <Home onResultado={setDados} />;
}
