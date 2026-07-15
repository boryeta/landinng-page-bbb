import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // El sitio se sirve desde https://<usuario>.github.io/landinng-page-bbb/
  // en GitHub Pages, por eso la base es el nombre del repositorio.
  base: '/landinng-page-bbb/',
  plugins: [react(), tailwindcss()],
})
