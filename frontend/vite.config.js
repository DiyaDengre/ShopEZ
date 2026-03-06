import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://shopez-backend-hvtz.onrender.com",
      "/uploads/": "https://shopez-backend-hvtz.onrender.com",
    },
  },
});
