import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    server: {
        hmr: {
            /**
             * Handle the issue of resources failing to load due to
             * an invalid address when using Vite development server
             * within Windows (WSL2).
             * 
             * @see https://github.com/laravel/vite-plugin/issues/28
             */
            host: 'localhost'
        },
    },
    plugins: [
        laravel({
            input: ['resources/js/main.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
