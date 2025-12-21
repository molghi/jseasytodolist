import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/tasks": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      "/users": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      "/logout": "http://localhost:8000",
      "/login": "http://localhost:8000",
    },
  },
});
