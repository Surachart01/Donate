import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/",  // ให้ base URL เป็น root
  server: {
    historyApiFallback: true,  // รองรับ SPA Routing
  }
});
