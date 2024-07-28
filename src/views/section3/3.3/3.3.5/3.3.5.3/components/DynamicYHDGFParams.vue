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

    <el-row :gutter="24">
      <el-col :span="24">
        <div
          v-for="(input, index) in params"
          :key="`input-${index}`"
        >
          <el-col :span="2">
            <el-form-item>
              <math-jax :latex="'h_'+(index+1)+''" />
            </el-form-item>

            <el-form-item>
              <math-jax :latex="'v_'+(index+1)+''" />
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item>
              <el-input
                v-model="input.hi"
                type="text"
                :placeholder="`${explainText}${index+1}:未掺气水流的水深hi`"
              />
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="input.vi"
                type="text"
                :placeholder="`${explainText}${index+1}:未掺气水流的流速vi`"
              />

              <svg
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
            </el-form-item>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

// 溢洪道规范方法计算隧洞掺气水深
@Component({
  name: 'DynamicYhdgfParams',
  components: {

  }
})

export default class extends Vue {
    @Prop({ default: '' }) explainText!: string;
  @Prop({ default: true }) dynamicBtn!: boolean;

 public params:any= [];

 public addField() {
   this.params.push({ hi: '', vi: '' })
 }

 public addFieldWithData(h:number, v:number) {
   this.params.push({ hi: h, vi: v })
 }
 public removeField(index) {
   this.params.splice(index, 1)
 }

 public removeAllField() {
   let n = this.params.length
   for (let index = 0; index < n; index++) {
     this.params.splice(0, 1)
   }
 }

 public onParamsDataChange() {
   this.$emit('updateParamsData', this.params)
 }
}
</script>
