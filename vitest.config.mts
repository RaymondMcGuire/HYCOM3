import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.mts'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/unit/**/*.vitest.spec.ts'],
    setupFiles: ['tests/unit/setup.ts'],
    server: {
      deps: {
        inline: ['element-plus', '@element-plus/icons-vue']
      }
    }
  }
}))
