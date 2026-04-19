<!--
 * @Author: Xu.WANG
 * @Date: 2020-08-26 19:35:46
 * @LastEditTime: 2021-05-22 02:39:33
 * @LastEditors: Xu.WANG
 * @Description:
 * @FilePath: \hycom_app\src\components\VueParamaters\index.vue
-->
<template>
  <app-stack gap="12px">
    <div
      v-for="(item, index) in formulas"
      :key="index"
    >
      <math-jax
        class="smathjax"
        :latex="formulas[index]"
        :block="true"
      />
      <br>
    </div>
  </app-stack>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppStack from '@/shared/components/layout/AppStack.vue'

export default defineComponent({
  name: 'VueParamaters',
  components: {
    AppStack
  },
  props: {
    formulas: {
      type: Object as PropType<Record<string, any>>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.smathjax {
  float: left;
}
</style>
