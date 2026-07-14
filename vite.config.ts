import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.tsx',
            ],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),

        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),

        tailwindcss(),

        wayfinder({
            formVariants: true,
        }),
    ],

    esbuild: {
        jsx: 'automatic',
    },

    server: {
        host: process.env.VITE_HOST || '0.0.0.0',
        port: Number(process.env.VITE_PORT || 5173),
        strictPort: true,

        hmr: {
            host: 'localhost',
            port: 5173,
        },

        watch: {
            usePolling: true,
        },
    },
});