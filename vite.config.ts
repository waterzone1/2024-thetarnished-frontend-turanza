import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Escuchar en todas las interfaces de red
    port: 5173,      // Puerto en el que corre tu aplicación
    strictPort: true // Asegura que el puerto se mantenga
  }
});
