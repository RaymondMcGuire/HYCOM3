<template>
  <div>
    <h3>参数说明:</h3>
    <br>
    <vue-paramaters :formulas="formulas" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import VueParamaters from '@/components/VueParamaters/index.vue'

export default defineComponent({
  name: 'ParamExplain',
  components: {
    VueParamaters
  },
  props: {
    formulas: {
      type: Object as PropType<Record<string, any>>,
      required: true
    }
  }
})
</script>
