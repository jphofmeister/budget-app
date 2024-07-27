import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssImport from "postcss-import";
import postcssPresetEnv from "postcss-preset-env";
import postcssNested from "postcss-nested";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react()
  ],
  server: {
    open: true,
    proxy: {
      '/api': `http://localhost:3001`,
      // '/api': {
      //   target: 'http://localhost:3001',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      // },
    }
  },
  css: {
    postcss: {
      plugins: [
        postcssImport,
        postcssNested,
        autoprefixer,
        postcssPresetEnv({ stage: 1 })
      ]
    }
  },
  build: {
    outDir: "build",
    emptyOutDir: true
  }
});
