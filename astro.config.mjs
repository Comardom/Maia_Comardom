// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind'; // <-- 1. 导入 tailwind

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
    output: 'server',
    server: {
        host: true,
        port: 4321
    },
    integrations: [
        vue(),
        tailwind() // <-- 2. 添加 tailwind 集成
    ],
    adapter: node({ mode: 'standalone' }),
    vite: {
        plugins: [
        ],
        server: {
            fs: {
                strict: true,
                allow: ['src/', 'node_modules/']
            }
        },
        resolve: {
            alias: {
                '@': '/src', // <-- 3. 添加 alias
            },
        },
    }
});