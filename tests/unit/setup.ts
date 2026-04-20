import { config } from '@vue/test-utils'
import { vi } from 'vitest'

config.global.components = {
  MathJax: { template: '<span />' },
  'math-jax': { template: '<span />' }
}

vi.stubEnv('VITE_LC_APP_ID', 'test-app-id')
vi.stubEnv('VITE_LC_APP_KEY', 'test-app-key')
vi.stubEnv('VITE_EMAILJS_ENABLED', 'false')

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(globalThis, 'ResizeObserver', {
  value: ResizeObserverMock,
  writable: true
})
