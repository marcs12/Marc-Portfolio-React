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
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/three|@react-three/.test(id)) return "three";
          if (/framer-motion/.test(id)) return "framer";
          if (/gsap/.test(id)) return "gsap";
          if (/react-dom|react-router|scheduler|\/react\//.test(id))
            return "react-vendor";
        },
      },
    },
  },
});
