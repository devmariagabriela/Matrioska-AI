import { useState } from 'react';

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
      <h1>Conta pra gente como é a sua rotina</h1>
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
