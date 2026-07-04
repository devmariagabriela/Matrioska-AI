import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/relatos': 'http://localhost:4000',
      '/perfis': 'http://localhost:4000',
      '/vagas': 'http://localhost:4000'
    }
  }
});
