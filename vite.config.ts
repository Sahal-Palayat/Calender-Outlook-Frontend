import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { config } from "dotenv"
config()


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: process.env.VITE_APP_BASEURL || "",
        changeOrigin: true,
      }
    }
  },
  preview: {
    port: 5000
  }
})
