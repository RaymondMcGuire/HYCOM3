<template>
  <span
    v-if="renderedSvg"
    class="svg-icon svg-fill"
    :style="iconStyle"
    v-html="renderedSvg"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import exampleIcon from '@/icons/svg/example.svg?raw'
import eyeOffIcon from '@/icons/svg/eye-off.svg?raw'
import eyeOnIcon from '@/icons/svg/eye-on.svg?raw'
import formIcon from '@/icons/svg/form.svg?raw'
import hamburgerIcon from '@/icons/svg/hamburger.svg?raw'
import linkIcon from '@/icons/svg/link.svg?raw'
import nestedIcon from '@/icons/svg/nested.svg?raw'
import passwordIcon from '@/icons/svg/password.svg?raw'
import tableIcon from '@/icons/svg/table.svg?raw'
import treeIcon from '@/icons/svg/tree.svg?raw'
import userIcon from '@/icons/svg/user.svg?raw'

const icons: Record<string, string> = {
  example: exampleIcon,
  'eye-off': eyeOffIcon,
  'eye-on': eyeOnIcon,
  form: formIcon,
  hamburger: hamburgerIcon,
  link: linkIcon,
  nested: nestedIcon,
  password: passwordIcon,
  table: tableIcon,
  tree: treeIcon,
  user: userIcon
}

function normalizeDimension(value: string | number) {
  return typeof value === 'number' ? `${value}px` : value
}

function normalizeViewBoxDimension(value: string) {
  return value.trim().replace(/px$/i, '')
}

function renderSvgMarkup(svg: string) {
  const widthMatch = svg.match(/\bwidth="([^"]+)"/i)
  const heightMatch = svg.match(/\bheight="([^"]+)"/i)

  return svg.replace(/<svg\b([^>]*)>/i, (_match, attrs) => {
    let nextAttrs = attrs
      .replace(/\s(?:width|height|class|aria-hidden|focusable)="[^"]*"/gi, '')

    if (!/\bviewBox=/i.test(nextAttrs) && widthMatch && heightMatch) {
      const width = normalizeViewBoxDimension(widthMatch[1])
      const height = normalizeViewBoxDimension(heightMatch[1])
      nextAttrs += ` viewBox="0 0 ${width} ${height}"`
    }

    nextAttrs += ' width="100%" height="100%" class="svg-icon__inner" aria-hidden="true" focusable="false"'
    return `<svg${nextAttrs}>`
  })
}

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: [String, Number],
      default: '1em'
    },
    height: {
      type: [String, Number],
      default: '1em'
    }
  },
  computed: {
    iconStyle(): Record<string, string> {
      return {
        width: normalizeDimension(this.width),
        height: normalizeDimension(this.height)
      }
    },
    renderedSvg(): string {
      const icon = icons[this.name]

      if (!icon) {
        if (import.meta.env.DEV) {
          console.warn(`[SvgIcon] Missing icon: ${this.name}`)
        }

        return ''
      }

      return renderSvgMarkup(icon)
    }
  }
})
</script>
