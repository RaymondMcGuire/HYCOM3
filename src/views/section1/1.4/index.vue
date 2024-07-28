
<template>
  <menu-card
    title="1.4 底流消能（等宽矩形断面)"
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
