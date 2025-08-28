import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const BACKEND = "https://localhost:44351";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api": {
        target: BACKEND,
        changeOrigin: true,
        secure: false, // backend https con certificado local
      },
    },
  },
});
