<template>
  <menu-card
    title="1.1.2 宽顶堰泄流能力"
    :level="3"
    icon-type="default"
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
