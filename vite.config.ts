import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// BASE_PATH задаётся в CI (GitHub Actions) для деплоя на GitHub Pages
const base = process.env.BASE_PATH ?? "/mvvm/";

export default defineConfig({
  base: base.endsWith("/") ? base : base + "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
});
