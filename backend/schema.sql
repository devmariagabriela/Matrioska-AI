CREATE TABLE IF NOT EXISTS usuarias (
  id SERIAL PRIMARY KEY,
  nome TEXT,
  criado_em TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS relatos (
  id SERIAL PRIMARY KEY,
  usuaria_id INTEGER REFERENCES usuarias(id),
  texto TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS perfis (
  id SERIAL PRIMARY KEY,
  relato_id INTEGER REFERENCES relatos(id),
  resumo TEXT,
  nivel_empregabilidade TEXT,
  criado_em TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  perfil_id INTEGER REFERENCES perfis(id),
  nome TEXT NOT NULL,
  origem TEXT
);

CREATE TABLE IF NOT EXISTS vagas (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  tags TEXT[]
);

CREATE TABLE IF NOT EXISTS matches (
  id SERIAL PRIMARY KEY,
  perfil_id INTEGER REFERENCES perfis(id),
  vaga_id INTEGER REFERENCES vagas(id),
  compatibilidade INTEGER
);

INSERT INTO vagas (titulo, descricao, tags) VALUES
('Coordenadora de operações', 'Gestão de rotinas e equipes', ARRAY['gestão de crise','planejamento','multitarefa']),
('Assistente de projetos', 'Apoio a cronogramas e entregas', ARRAY['planejamento','organização','comunicação']),
('Analista administrativo', 'Rotinas financeiras e logísticas', ARRAY['planejamento orçamentário','organização']),
('Atendimento ao cliente', 'Resolução de problemas em tempo real', ARRAY['gestão de crise','comunicação']),
('Auxiliar de RH', 'Apoio em processos de pessoas', ARRAY['comunicação','organização','multitarefa'])
ON CONFLICT DO NOTHING;
