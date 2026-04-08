// vite.config.ts
import { defineConfig } from "vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
    server: {
        host: "0.0.0.0",
        port: 3000,
    },
    resolve: {
        tsconfigPaths: true,
    },
    plugins: [tanstackStart(), viteReact(), tailwindcss()],
})
