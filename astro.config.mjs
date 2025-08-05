// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import node from '@astrojs/node';

export default defineConfig({
    output: "server",
    server: {
        host: true, // 或 '0.0.0.0'
        port: 4321
    },
    integrations: [vue()], // 启用 Vue 集成
    adapter: node({mode: 'standalone' }),
    vite: {
        server: {
            fs: {
                strict: true, // 限制访问文件路径
                allow: ['src/', 'node_modules/']
            }
        }
    }
});