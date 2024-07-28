<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-07-16 22:00:43
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-07-16 23:33:08
 * @FilePath: \hycom_app\src\views\chapter2\4.3\4.3.2.1\index.vue
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
-->
<template>
  <div>
    <svg
      v-if="dynamicBtn"

      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      class="ml-2 cursor-pointer"
      @click="addField()"
    >
      <path
        fill="none"
        d="M0 0h24v24H0z"
      />
      <path
        fill="green"
        d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
      />
    </svg>

    <div
      v-for="(input, index) in params"
      :key="`input-${index}`"
    >
      <el-col :span="4">
        <el-input
          v-model="input.value"
          type="number"
          :min="minValue"
          :max="maxValue"
          :step="stepValue"
          :placeholder="`${explainText}${index+1}`"
          @change="onParamsDataChange"
        />

        <svg
          v-if="dynamicBtn"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          class="ml-2 cursor-pointer"
          @click="removeField(index)"
        >
          <path
            fill="none"
            d="M0 0h24v24H0z"
          />
          <path
            fill="#EC4899"
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
          />
        </svg>
      </el-col>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'DynamicRangeParams'
})

export default class extends Vue {
    @Prop({ default: '' }) explainText!: string;
  @Prop({ default: true }) dynamicBtn!: boolean;
  @Prop({ default: 1 }) maxValue!: number;
  @Prop({ default: 0 }) minValue!: number;
  @Prop({ default: 0.1 }) stepValue!: number;

  public params:any= [];

  public addField() {
    this.params.push({ value: '' })
  }

  public removeField(index) {
    this.params.splice(index, 1)
  }

  public onParamsDataChange() {
    this.$emit('updateParamsData', this.params)
  }
  public removeAllField() {
    let n = this.params.length
    for (let index = 0; index < n; index++) {
      this.params.splice(0, 1)
    }
  }

  public updateValue(event) {
    const value = event.target.value
    if (value > event.target.max) {
      // event.target.value = event.target.max
    }
    this.$forceUpdate()
  }
}
</script>

<style lang="scss">
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {

   opacity: 1;

}
</style>
