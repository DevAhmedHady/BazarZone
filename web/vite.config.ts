import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// ABP API URL
const ABP_API_URL = process.env.VITE_API_URL || "https://localhost:44321";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Proxy API requests to ABP backend
    proxy: {
      "/api": {
        target: ABP_API_URL,
        changeOrigin: true,
        secure: false, // Allow self-signed certificates in development
      },
      "/.well-known": {
        target: ABP_API_URL,
        changeOrigin: true,
        secure: false,
      },
      "/connect": {
        target: ABP_API_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
