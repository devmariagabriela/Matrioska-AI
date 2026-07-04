import { useEffect, useState } from 'react';

const CORES = [
  { bg: '#D9683B', mark: '#F2C572' },
  { bg: '#5C2A4D', mark: '#E8A93B' },
  { bg: '#7C9473', mark: '#FBF1E1' },
  { bg: '#B84F29', mark: '#FBF1E1' },
  { bg: '#E8A93B', mark: '#5C2A4D' },
  { bg: '#3E1B34', mark: '#D9683B' }
];

export default function MatrioskaReveal({ skills }) {
  const [visiveis, setVisiveis] = useState(0);

  useEffect(() => {
    if (visiveis < skills.length) {
      const t = setTimeout(() => setVisiveis(v => v + 1), 600);
      return () => clearTimeout(t);
    }
  }, [visiveis, skills.length]);

  return (
    <div className="matrioska-reveal">
      {skills.slice(0, visiveis).map((s, i) => {
        const cor = CORES[i % CORES.length];
        return (
          <div key={i} className="skill-card" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="skill-avatar" style={{ background: cor.bg, color: cor.mark }}>
              {s.nome.trim().charAt(0).toUpperCase()}
            </div>
            <div>
              <strong>{s.nome}</strong>
              <p>{s.origem}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
