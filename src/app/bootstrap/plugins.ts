import type { App } from 'vue'

import MathJax from '@/plugins/mathjax'
import SvgIcon from '@/components/SvgIcon/index.vue'

let pluginsRegistered = false

export function registerAppPlugins(app: App) {
  if (pluginsRegistered) {
    return
  }

  app.use(MathJax)
  app.component('svg-icon', SvgIcon)

  pluginsRegistered = true
}

export function configureVueApp(_app: App) {
}
