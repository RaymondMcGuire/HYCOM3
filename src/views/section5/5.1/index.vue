<template>
  <menu-card
    title="5.1 泄流能力计算公式"
    :level="2"
    icon-type="calculation"
  >
    <router-view />
  </menu-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MenuCard from '@/components/MenuCard/index.vue'

@Component({
  components: {
    MenuCard
  }
})
export default class DischargeCapacityCalculation extends Vue {}
</script>
