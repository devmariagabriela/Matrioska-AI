import MatrioskaReveal from '../components/MatrioskaReveal.jsx';
import VagaCard from '../components/VagaCard.jsx';

export default function Resultado({ perfil, vagas, onVoltar }) {
  return (
    <div className="resultado">
      <h2>Seu perfil reconstruído</h2>
      <p>{perfil.resumo}</p>
      <p className="nivel">Nível: {perfil.nivel}</p>

      <MatrioskaReveal skills={perfil.skills} />

      <h2>Vagas compatíveis</h2>
      {vagas.map(v => <VagaCard key={v.id} vaga={v} />)}

      <button className="voltar" onClick={onVoltar}>Fazer outro relato</button>
    </div>
  );
}
