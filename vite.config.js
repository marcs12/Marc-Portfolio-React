import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";

// Custom domain (marcgsapa.com) on GitHub Pages -> served from root.
export default defineConfig({
  base: "/",
  plugins: [react(), glsl()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".glsl", ".vert", ".frag"],
  },
  optimizeDeps: {
    include: ["three"],
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1200,
  },
});
