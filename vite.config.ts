/// <reference types="vitest" />
/// <reference types="vite/client" />

import {resolve} from 'path';
import react from '@vitejs/plugin-react-swc';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, './src/environments');
    const baseAlias = env.VITE_BASE_ALIAS;
    return {
        base: baseAlias,
        plugins: [
            react(),
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
        },
        envDir: './src/environments',
        build: {
            manifest: true,
        },
        server: {
            port: 8080,
            open: baseAlias,
        },
        test: {
            globals: true,
            environment: 'jsdom',
        },
    };
});
