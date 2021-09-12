import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    lib: !process.env.BUILD_APP ? {
      entry: path.resolve(__dirname, 'lib/main.js'),
      name: 'DatePicker',
      fileName: format => `date-picker.${format}.js`
    } : undefined,
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'      
    }
  },
});
