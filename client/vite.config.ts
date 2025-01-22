import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/user": {
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        changeOrigin: true,
        secure: false,
      },
      "/quote": {
        changeOrigin: true,
        secure: false,
      },
      "/ai": {
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
