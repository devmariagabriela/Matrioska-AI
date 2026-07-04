import { reconstruirCarreira } from './ia.js';

const texto = 'Cuido da casa e dos meus 2 filhos ha 5 anos. Organizo as financas da familia, faco o orcamento mensal e negocio com fornecedores. Tambem ajudo vizinhos a resolver problemas de documentacao no INSS.';

try {
  const resultado = await reconstruirCarreira(texto);
  console.log(JSON.stringify(resultado, null, 2));
} catch (e) {
  console.error('ERRO:', e.message);
}
