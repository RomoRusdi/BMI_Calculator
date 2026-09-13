import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      // Icons (favicon, apple-touch, maskable) are generated from public/logo.svg
      // using pwa-assets.config.js and injected into the manifest + <head>.
      pwaAssets: { config: true, overrideManifestIcons: true },
      manifest: {
        name: 'CekBMI — Kalkulator BMI',
        short_name: 'CekBMI',
        description: 'Hitung Indeks Massa Tubuh (BMI) kamu dengan cepat. Bisa dipakai offline.',
        lang: 'id',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        categories: ['health', 'fitness', 'utilities'],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
      },
      devOptions: { enabled: false },
    }),
  ],
})
