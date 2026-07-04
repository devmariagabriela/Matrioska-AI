import { salvarPerfil } from './storage.js';

try {
  await salvarPerfil('teste-123', { skills: ['teste'], resumo: 'teste de conexao' });
  console.log('OK: objeto salvo no bucket com sucesso.');
} catch (e) {
  console.error('ERRO:', e.message);
}
