import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteJsconfigPaths from 'vite-jsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig(({ command, mode }) => ({
  build: {
    outDir: 'build',
    minify: mode === 'development' ? false : 'terser',
    sourcemap: command === 'serve' ? 'inline' : false,
  },
  plugins: [react(), viteJsconfigPaths(), svgrPlugin()],
  // publicDir: command === 'build' ? false : 'src/assets',
  server: {
    open: true,
    port: 8000,
  },
}))
