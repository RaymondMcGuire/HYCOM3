import { config } from '@vue/test-utils'

config.global.components = {
  MathJax: { template: '<span />' },
  'math-jax': { template: '<span />' }
}

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(globalThis, 'ResizeObserver', {
  value: ResizeObserverMock,
  writable: true
})
