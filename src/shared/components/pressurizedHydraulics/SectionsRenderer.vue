<template>
  <app-stack gap="24px">
    <div
      v-for="section in sections"
      :key="section.title"
      class="pressurized-section"
    >
      <h3>{{ section.title }}</h3>
      <app-stack gap="20px">
        <div
          v-for="item in section.items"
          :key="item.refName"
          class="pressurized-section__item"
        >
          <h4>{{ item.title }}</h4>
          <component
            :is="item.component"
            :ref="item.refName"
            :explain-text="explainText"
            v-bind="item.props"
            @updateParamsData="emitUpdate(item.refName, $event)"
          />
        </div>
      </app-stack>
    </div>
  </app-stack>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { PressurizedHydraulicSectionSchema } from './sections'
import AppStack from '@/shared/components/layout/AppStack.vue'

export default defineComponent({
  name: 'PressurizedHydraulicSections',
  components: {
    AppStack
  },
  props: {
    sections: {
      type: Array as PropType<PressurizedHydraulicSectionSchema[]>,
      required: true
    },
    explainText: {
      type: String,
      required: true
    }
  },
  methods: {
    emitUpdate(refName: string, paramData: any[]) {
      this.$emit('update-params', refName, paramData)
    }
  }
})
</script>

<style scoped>
.pressurized-section__item h4 {
  margin: 0 0 12px;
}
</style>
