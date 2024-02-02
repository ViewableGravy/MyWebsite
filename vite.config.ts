import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

export default defineConfig({
    base: '',
    plugins: [
        react(), 
        viteTsconfigPaths(), 
        TanStackRouterVite()
    ],
    server: {    
        open: true,
        port: 3000, 
    }
})