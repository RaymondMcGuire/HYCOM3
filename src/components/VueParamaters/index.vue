<!--
 * @Author: Xu.WANG
 * @Date: 2020-08-26 19:35:46
 * @LastEditTime: 2021-05-22 02:39:33
 * @LastEditors: Xu.WANG
 * @Description:
 * @FilePath: \hycom_app\src\components\VueParamaters\index.vue
-->
<template>
  <el-row :gutter="20">
    <div
      v-for="(item, index) in formulas"
      :key="index"
    >
      <el-col :span="24">
        <math-jax
          class="smathjax"
          :latex="formulas[index]"
          :block="true"
        />
        <br>
      </el-col>
    </div>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {

  }
})
export default class VueParamaters extends Vue {
  @Prop() formulas!: Object;
}
</script>

<style lang="scss" scoped>
.smathjax {
  float: left;
}
</style>
