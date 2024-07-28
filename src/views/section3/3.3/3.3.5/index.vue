<template>
  <menu-card
    title="3.3.5 掺气水深计算"
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
