import { useEffect, useState } from 'react';

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
      {skills.slice(0, visiveis).map((s, i) => (
        <div key={i} className="skill-card">
          <strong>{s.nome}</strong>
          <p>{s.origem}</p>
        </div>
      ))}
    </div>
  );
}
