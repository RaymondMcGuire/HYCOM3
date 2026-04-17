import Vue from 'vue'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.config.productionTip = false

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(globalThis, 'ResizeObserver', {
  value: ResizeObserverMock,
  writable: true
})
