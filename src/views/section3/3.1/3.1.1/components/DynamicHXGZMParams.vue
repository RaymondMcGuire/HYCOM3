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
      <el-col :span="2">
        <el-form-item>
          <math-jax :latex="'S_{弧门情况'+(index+1)+'}'" />
        </el-form-item>

        <div v-if="input.doorStatus === 1">
          <el-form-item>
            <math-jax :latex="'R_'+(index+1)+''" />
          </el-form-item>
          <el-form-item>
            <math-jax :latex="'a_'+(index+1)+''" />
          </el-form-item>
          <el-form-item>
            <math-jax :latex="'e_'+(index+1)+''" />
          </el-form-item>
          <el-form-item>
            <math-jax :latex="'c_'+(index+1)+''" />
          </el-form-item>
        </div>
      </el-col>

      <el-col :span="10">
        <el-form-item>
          <el-select
            v-model="input.doorStatus"
            :placeholder="`${explainText}${index+1}:弧门情况`"
            @change="onParamsDataChange"
          >
            <el-option
              v-for="sp in doorStatusOptions"
              :key="sp.value"
              :label="sp.label"
              :value="sp.value"
            />
          </el-select>
        </el-form-item>

        <div v-if="input.doorStatus === 1">
          <el-form-item>
            <el-input
              v-model="input.R"
              type="text"
              :placeholder="`${explainText}${index+1}:弧门支铰中心半径`"
              @change="onParamsDataChange"
            />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="input.a"
              type="text"
              :placeholder="`${explainText}${index+1}:弧门全开深度`"
              @change="onParamsDataChange"
            />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="input.e"
              type="text"
              :placeholder="`${explainText}${index+1}:弧门局开开度`"
              @change="onParamsDataChange"
            />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="input.c"
              type="text"
              :placeholder="`${explainText}${index+1}:弧门支铰中心距底板高度`"
              @change="onParamsDataChange"
            />
          </el-form-item>
        </div>

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

import { curveDoorStatusType } from '@/hycom_lib/common'
//
@Component({
  name: 'DynamicHxgzmParams',
  components: {

  }
})

export default class extends Vue {
    @Prop({ default: '' }) explainText!: string;
  @Prop({ default: true }) dynamicBtn!: boolean;

 public params:any= [];

 public doorStatusOptions = [
   {
     id: 0,
     label: '弧门全开',
     value: curveDoorStatusType.AOPEN
   },
   {
     id: 1,
     label: '弧门局开',
     value: curveDoorStatusType.POPEN
   }
 ];

 public addField() {
   this.params.push({ R: '', a: '', e: '', c: '', doorStatus: '' })
 }

 public addFieldWithData(r:number, a:number, e:number, c:number, status:number) {
   this.params.push({ R: r, a: a, e: e, c: c, doorStatus: status })
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
