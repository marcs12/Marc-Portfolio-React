import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  plugins: [react(), glsl()],
  // Ensure Vite resolves shader files correctly
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".glsl", ".vert", ".frag"],
  },
  // Optimize dependencies related to Three.js
  optimizeDeps: {
    include: ["three"],
  },
  // Define build-specific configurations
  build: {
    sourcemap: true, // Enable source maps for easier debugging
    chunkSizeWarningLimit: 500, // Increase chunk size warning limit
  },
});
