import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/quickbasket-grocery/',
  plugins: [react()],
  build: {
    outDir: 'docs'
  }
});
