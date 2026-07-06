import path from "path";
import {
  defineConfig
  // loadEnv
} from "vite";
import type { ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";

// Read version and copyrightYear from package.json
const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));

export default defineConfig(({ mode }: ConfigEnv) => {
  // * Load env file based on `mode` in the current working directory.
  // * Set the third parameter to "" to load all env regardless of the
  // * `VITE_` prefix.
  // const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "./",
    plugins: [react()],
    publicDir: "public",
    server: {
      port: 3001,
      strictPort: false
    },
    build: {
      outDir: "build",
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        input: {
          main: "index.html"
        },
        output: {
          entryFileNames: "static/[name].[hash].js",
          assetFileNames: "static/[name].[hash].[ext]"
        }
      }
    },
    css: {
      postcss: "./postcss.config.js"
    },
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "./src") // * Allows imports from "src" using "@/path/to/file" and must match the "paths" alias in tsconfig.json -- 02/18/2026 JW
      }
    },
    define: {
      __APP_VERSION__: JSON.stringify(packageJson.version),
      __COPYRIGHT_YEAR__: JSON.stringify(packageJson.copyrightYear)
    }
  };
});
