export default function VagaCard({ vaga }) {
  return (
    <div className="vaga-card">
      <div className="vaga-card-header">
        <strong>{vaga.titulo}</strong>
        <span>{vaga.compatibilidade}% compatível</span>
      </div>
      <p>{vaga.descricao}</p>
    </div>
  );
}
