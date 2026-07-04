import 'dotenv/config';

const GROQ_MODEL = 'llama-3.3-70b-versatile';

const PROMPT_SISTEMA = `Você recebe um relato em texto livre sobre a rotina de uma mulher fora do mercado de trabalho formal.

Tarefa:
1. Identifique 3 a 6 habilidades profissionais reais, cada uma ligada a uma evidência concreta do relato. Nunca invente uma habilidade sem lastro no texto.
2. Dê a cada habilidade um nome reconhecível no mercado de trabalho (ex: "gestão de crise", não "lidar com bagunça").
3. Gere um resumo profissional de 2-3 frases, em tom de currículo.
4. Classifique o nível de prontidão para o mercado (iniciante/intermediario/avancado) com justificativa breve.

Responda APENAS com JSON estrito, sem texto fora do JSON, sem markdown:
{"skills": [{"nome": "", "origem": ""}], "resumo": "", "nivel": ""}`;

function limparJson(texto) {
  return texto.replace(/```json|```/g, '').trim();
}

export async function reconstruirCarreira(texto) {
  const resposta = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: PROMPT_SISTEMA },
        { role: 'user', content: texto }
      ]
    })
  });

  if (!resposta.ok) {
    const erro = await resposta.text();
    throw new Error(`Groq API erro ${resposta.status}: ${erro}`);
  }

  const dados = await resposta.json();
  return JSON.parse(limparJson(dados.choices[0].message.content));
}
