import { initMathJax, renderByMathjax } from '@/plugins/mathjax'

let mathJaxInitialized = false

function onMathJaxReady() {
  const el = document.getElementById('app')
  void renderByMathjax(el)
}

export function initializeAppMathJax() {
  if (mathJaxInitialized) {
    return
  }

  initMathJax(
    {
      options: {
        enableMenu: false
      }
    },
    onMathJaxReady
  )

  mathJaxInitialized = true
}
