import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig(({ command }) => ({
  define:
    command === "build"
      ? { "process.env.NODE_ENV": JSON.stringify("production") }
      : {},
  plugins: [vue()],
  resolve: {
    alias: {
      "@at-shared": resolve(__dirname, "../web_shared"),
    },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.spec.ts"],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "AtCheckpoints",
      fileName: "at-checkpoints",
      formats: ["es"],
    },
    outDir: resolve(__dirname, "../../js/dist"),
    emptyOutDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
}));
