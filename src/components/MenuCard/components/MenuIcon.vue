<template>
  <component
    :is="iconComponent"
    class="menu-icon"
  />
</template>

<script lang="ts">
import {
  Aim,
  Collection,
  DataAnalysis,
  DataLine,
  Document,
  DocumentCopy,
  Histogram,
  Menu,
  Notebook,
  Odometer,
  OfficeBuilding,
  Operation,
  Reading,
  Setting,
  Tickets,
  User,
  View,
  WindPower
} from '@element-plus/icons-vue'
import { computed, defineComponent } from 'vue'

const iconMap = {
  1: {
    default: Menu,
    calculation: DataAnalysis,
    settings: Setting,
    report: Document,
    dashboard: Odometer,
    user: User
  },
  2: {
    default: Notebook,
    calculation: DataLine,
    settings: Setting,
    report: Reading,
    flow: WindPower,
    structure: OfficeBuilding
  },
  3: {
    default: Tickets,
    calculation: Histogram,
    settings: Operation,
    report: DocumentCopy,
    specific: Aim,
    detail: View
  }
} as const

export default defineComponent({
  name: 'MenuIcon',
  props: {
    level: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const iconComponent = computed(() => {
      const levelKey = props.level as keyof typeof iconMap
      const levelIcons = iconMap[levelKey] || iconMap[1]
      const typeKey = props.type as keyof typeof levelIcons

      return levelIcons[typeKey] || levelIcons.default || Collection
    })

    return {
      iconComponent
    }
  }
})
</script>

<style scoped>
.menu-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
  margin-right: 8px;
  flex: 0 0 18px;
  vertical-align: middle;
}
</style>
