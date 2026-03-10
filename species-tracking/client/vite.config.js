import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/sightings": "http://localhost:3000",
      "/species": "http://localhost:3000",
      "/individuals": "http://localhost:3000",
    },
  },
});
