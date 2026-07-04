import { useState } from 'react';
import DollTrio from '../components/DollIllustration.jsx';

export default function Home({ onResultado }) {
  const [texto, setTexto] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  async function enviar() {
    setErro(null);
    setCarregando(true);
    try {
      const relatoRes = await fetch('/relatos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto })
      });
      if (!relatoRes.ok) throw new Error('Falha ao salvar relato');
      const { relato_id } = await relatoRes.json();

      const perfilRes = await fetch('/perfis/reconstruir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ relato_id })
      });
      if (!perfilRes.ok) throw new Error('Falha ao reconstruir perfil');
      const perfil = await perfilRes.json();

      const vagasRes = await fetch(`/vagas/match/${perfil.perfil_id}`);
      if (!vagasRes.ok) throw new Error('Falha ao buscar vagas');
      const vagas = await vagasRes.json();

      onResultado({ perfil, vagas });
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="home">
      <div className="hero">
        <DollTrio />
        <span className="eyebrow">Matrioska AI · Magalu Cloud</span>
        <h1>Toda mãe carrega competências que o mercado ainda não viu</h1>
        <p className="lead">
          Conta pra gente sua rotina. A IA revela, camada por camada, as habilidades
          profissionais escondidas nela e te conecta a vagas de verdade.
        </p>
      </div>

      <div className="steps">
        <span className="step active">1. Seu relato</span>
        <span className="step">2. Perfil revelado</span>
        <span className="step">3. Vagas pra você</span>
      </div>

      <textarea
        value={texto}
        onChange={e => setTexto(e.target.value)}
        rows={8}
        placeholder="O que você faz no seu dia, do que cuida, que decisões toma sem perceber..."
      />
      <button onClick={enviar} disabled={carregando || !texto.trim()}>
        {carregando ? 'Abrindo a boneca...' : 'Revelar meu perfil'}
      </button>
      {erro && <p className="erro">{erro}</p>}
    </div>
  );
}
