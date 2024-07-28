<template>
  <i :class="iconClass" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MenuIcon extends Vue {
  @Prop({ required: true }) level!: number
  @Prop({ required: true }) type!: string

  get iconClass(): string {
    const prefix = 'el-icon-'
    const iconMap = {
      1: {
        default: 'menu',
        calculation: 'data-analysis',
        settings: 'setting',
        report: 'document',
        dashboard: 'odometer',
        user: 'user'
      },
      2: {
        default: 'notebook-2',
        calculation: 'data-line',
        settings: 'set-up',
        report: 'reading',
        flow: 'wind-power',
        structure: 'office-building'
      },
      3: {
        default: 'tickets',
        calculation: 'histogram',
        settings: 'operation',
        report: 'document-copy',
        specific: 'aim',
        detail: 'view'
      }
    }

    const levelKey = this.level as keyof typeof iconMap
    const typeKey = this.type as keyof (typeof iconMap)[typeof levelKey]

    return `${prefix}${iconMap[levelKey][typeKey] || iconMap[levelKey].default}`
  }
}
</script>

<style scoped>
i {
  font-size: 24px;
  margin-right: 10px;
}

.el-menu-item i,
.el-submenu__title i {
  font-size: 20px;
}

.el-menu--inline .el-menu-item i {
  font-size: 18px;
}
</style>
