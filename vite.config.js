import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    port: 9999
  },
  resolve: {  // 路径别名配置
    alias: {
      '@': resolve(__dirname, './src'),
      '@img': resolve(__dirname, './src/assets/images'),
      '@comp': resolve(__dirname, './src/components'),
      '@style': resolve(__dirname, './src/style'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@/style/global.scss';"
      }
    }
  }
})
