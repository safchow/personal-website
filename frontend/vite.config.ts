import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tanstackRouter(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@stones': path.resolve(__dirname, '../stones/dist'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'recharts',
      'vaul',
      '@radix-ui/react-toggle',
      '@radix-ui/react-tabs',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-select',
      '@radix-ui/react-toggle-group',
    ],
  },
  css: {
    postcss: './postcss.config.js',
  },
  // Watch for changes in stones dist folder
  server: {
    watch: {
      ignored: ['!**/node_modules/@website/stones/**'],
    },
    fs: {
      allow: ['..'],
    },
  },
});

