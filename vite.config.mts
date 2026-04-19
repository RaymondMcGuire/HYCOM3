import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

function resolveManualChunk(id: string): string | undefined {
  const normalizedId = id.replace(/\\/g, '/')

  if (!normalizedId.includes('/node_modules/')) {
    return undefined
  }

  if (
    normalizedId.includes('/vue-router/') ||
    normalizedId.includes('/pinia/') ||
    normalizedId.includes('/@vue/') ||
    normalizedId.includes('/vue/')
  ) {
    return 'vue-core'
  }

  if (normalizedId.includes('/chart.js/') || normalizedId.includes('/vue-chartjs/')) {
    return 'charts'
  }

  if (normalizedId.includes('/leancloud-storage/') || normalizedId.includes('/emailjs-com/') || normalizedId.includes('/axios/')) {
    return 'integrations'
  }

  if (normalizedId.includes('/ndarray/') || normalizedId.includes('/ndarray-show/')) {
    return 'math'
  }

  if (
    normalizedId.includes('/js-cookie/') ||
    normalizedId.includes('/nprogress/') ||
    normalizedId.includes('/normalize.css/') ||
    normalizedId.includes('/path-to-regexp/')
  ) {
    return 'shared'
  }

  return undefined
}

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    Components({
      dts: 'types/components.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: 'css'
        })
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: [
          'import',
          'global-builtin',
          'color-functions',
          'slash-div',
          'function-units'
        ]
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src')
    }
  },
  server: {
    host: '127.0.0.1',
    port: 5173
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          return resolveManualChunk(id)
        }
      }
    }
  }
})
