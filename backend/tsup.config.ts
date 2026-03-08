import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"],
  target: "es2022",
  outDir: "dist",
  clean: true,
  sourcemap: true,
  external: ["@website/core", "express", "cors", "dotenv", "zod"],
  esbuildOptions(options) {
    options.alias = { "@": "./src" };
  },
});
