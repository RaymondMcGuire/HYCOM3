import { defineComponent, h, type App } from 'vue'

type PlainObject = Record<string, unknown>

type MathJaxRuntime = {
  startup?: {
    promise?: Promise<unknown>
  }
  typesetClear?: (elements?: Element[]) => void
  typesetPromise?: (elements?: Element[]) => Promise<void>
}

declare global {
  interface Window {
    MathJax?: PlainObject & MathJaxRuntime
  }
}

const DEFAULT_URLS = [
  'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js',
  'https://unpkg.com/mathjax@3/es5/tex-chtml.js',
  'https://cdn.bootcdn.net/ajax/libs/mathjax/3.2.0/es5/tex-chtml.js'
]

const DEFAULT_CONFIG: PlainObject = {
  tex: {
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']],
    processEnvironments: true,
    processRefs: true
  },
  options: {
    skipHtmlTags: ['noscript', 'style', 'textarea', 'pre', 'code'],
    ignoreHtmlClass: 'tex2jax_ignore'
  },
  startup: {
    typeset: false
  },
  svg: {
    fontCache: 'global'
  }
}

let mathJaxReadyPromise: Promise<void> | null = null
let configuredUrls = [...DEFAULT_URLS]

function isPlainObject(value: unknown): value is PlainObject {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function mergeConfig(base: PlainObject, override: PlainObject): PlainObject {
  const merged: PlainObject = { ...base }

  Object.keys(override).forEach((key) => {
    const baseValue = merged[key]
    const overrideValue = override[key]

    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      merged[key] = mergeConfig(baseValue, overrideValue)
      return
    }

    merged[key] = overrideValue
  })

  return merged
}

function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-mathjax-source="${url}"]`)

    if (existing) {
      if (window.MathJax?.typesetPromise) {
        resolve()
        return
      }

      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error(`Failed to load MathJax from ${url}`)), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = url
    script.async = true
    script.dataset.mathjaxSource = url
    script.addEventListener('load', () => resolve(), { once: true })
    script.addEventListener('error', () => reject(new Error(`Failed to load MathJax from ${url}`)), { once: true })
    document.head.appendChild(script)
  })
}

async function ensureMathJaxLoaded(): Promise<void> {
  if (window.MathJax?.typesetPromise) {
    return
  }

  const errors: Error[] = []

  for (const url of configuredUrls) {
    try {
      await loadScript(url)
      await window.MathJax?.startup?.promise

      if (window.MathJax?.typesetPromise) {
        return
      }
    } catch (error) {
      errors.push(error instanceof Error ? error : new Error(String(error)))
    }
  }

  const details = errors.map((error) => error.message).join('; ')
  throw new Error(`MathJax failed to load. ${details}`)
}

export function initMathJax(config: PlainObject = {}, onReady?: () => void) {
  const { urls, ...mathJaxConfig } = config as PlainObject & { urls?: string[] }

  if (Array.isArray(urls) && urls.length > 0) {
    configuredUrls = [...urls]
  }

  if (!window.MathJax?.typesetPromise) {
    window.MathJax = mergeConfig(DEFAULT_CONFIG, mathJaxConfig) as PlainObject & MathJaxRuntime
  }

  if (!mathJaxReadyPromise) {
    mathJaxReadyPromise = ensureMathJaxLoaded()
  }

  if (onReady) {
    void mathJaxReadyPromise.then(() => onReady())
  }

  return mathJaxReadyPromise
}

export function renderByMathjax(element?: Element | null) {
  return initMathJax().then(async () => {
    const runtime = window.MathJax

    if (!runtime?.typesetPromise) {
      throw new Error('MathJax typesetPromise is not available.')
    }

    const elements = element ? [element] : undefined
    runtime.typesetClear?.(elements)
    await runtime.typesetPromise(elements)
  })
}

export const MathJax = defineComponent({
  name: 'MathJax',
  props: {
    latex: {
      type: String,
      default: ''
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    latex() {
      void this.renderMathJax()
    },
    block() {
      void this.renderMathJax()
    }
  },
  mounted() {
    void this.renderMathJax()
  },
  methods: {
    async renderMathJax() {
      const host = this.$el as HTMLElement | undefined

      if (!host) {
        return
      }

      host.textContent = this.block ? `$$ ${this.latex} $$` : `$ ${this.latex} $`

      try {
        await renderByMathjax(host)
      } catch (error) {
        console.warn('[MathJax]', error)
      }
    }
  },
  render() {
    return h('span')
  }
})

export default {
  version: '1.0.0',
  install(app: App) {
    app.component('MathJax', MathJax)
  }
}
