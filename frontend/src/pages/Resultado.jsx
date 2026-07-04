import MatrioskaReveal from '../components/MatrioskaReveal.jsx';
import VagaCard from '../components/VagaCard.jsx';

export default function Resultado({ perfil, vagas, onVoltar }) {
  return (
    <div className="resultado">
      <div className="steps">
        <span className="step">1. Seu relato</span>
        <span className="step active">2. Perfil revelado</span>
        <span className="step">3. Vagas pra você</span>
      </div>

      <h2>Seu perfil reconstruído</h2>
      <p>{perfil.resumo}</p>
      <span className="nivel">Nível: {perfil.nivel}</span>

      <MatrioskaReveal skills={perfil.skills} />

      <h2>Vagas compatíveis</h2>
      {vagas.map(v => <VagaCard key={v.id} vaga={v} />)}

      <button className="voltar" onClick={onVoltar}>Fazer outro relato</button>
    </div>
  );
}
