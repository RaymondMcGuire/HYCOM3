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
      :key="`select-${index}`"
    >
      <el-col :span="2">
        <el-form-item>
          <math-jax :latex="'S_{栅条形状'+(index+1)+'}'" />
        </el-form-item>
        <el-form-item>
          <math-jax :latex="'S_{断面形状'+(index+1)+'}'" />
        </el-form-item>
        <el-form-item>
          <math-jax :latex="'s_'+(index+1)+''" />
        </el-form-item>
        <el-form-item>
          <math-jax :latex="'b_'+(index+1)+''" />
        </el-form-item>
        <el-form-item>
          <math-jax :latex="'\\alpha_'+(index+1)+''" />
        </el-form-item>

        <div v-if="input.shape === 0">
          <el-form-item>
            <math-jax :latex="'B_'+(index+1)+''" />
          </el-form-item>
          <el-form-item>
            <math-jax :latex="'H_'+(index+1)+''" />
          </el-form-item>
        </div>
        <div v-else-if="input.shape === 1">
          <el-form-item>
            <math-jax :latex="'d_'+(index+1)+''" />
          </el-form-item>
        </div>
      </el-col>

      <el-col :span="10">
        <el-form-item>
          <el-select
            v-model="input.beta"
            :placeholder="`${explainText}${index+1}:类型`"
            @change="onParamsDataChange"
          >
            <el-option
              v-for="sp in stShapeOptions"
              :key="sp.id"
              :label="sp.label"
              :value="sp.value"
            >
              <img
                height="100%"

                :src="sp.img"
              >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select
            v-model="input.shape"
            :placeholder="`${explainText}${index+1}:断面形状`"
            @change="onParamsDataChange"
          >
            <el-option
              v-for="sp in shapeOptions"
              :key="sp.value"
              :label="sp.label"
              :value="sp.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="input.s"
            type="text"
            :placeholder="`${explainText}${index+1}:栅条宽度`"
            @change="onParamsDataChange"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="input.b"
            type="text"
            :placeholder="`${explainText}${index+1}:栅条间距`"
            @change="onParamsDataChange"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="input.alpha"
            type="text"
            :placeholder="`${explainText}${index+1}:倾角`"
            @change="onParamsDataChange"
          />
        </el-form-item>

        <div v-if="input.shape === 0">
          <el-form-item>
            <el-input
              v-model="input.B"
              type="text"
              :placeholder="`${explainText}${index+1}:矩形过水断面宽度`"
              @change="onParamsDataChange"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="input.H"
              type="text"
              :placeholder="`${explainText}${index+1}:矩形过水断面高度`"
              @change="onParamsDataChange"
            />
          </el-form-item>
        </div>
        <div v-else-if="input.shape === 1">
          <el-form-item>
            <el-input
              v-model="input.d"
              type="text"
              :placeholder="`${explainText}${index+1}:圆形过水断面直径`"
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
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

import { crossSectionShapeType } from '@/hycom_lib/common'

@Component({
  name: 'DynamicJklwsSelectParams',
  components: {

  }
})

export default class extends Vue {
    @Prop({ default: '' }) explainText!: string;
  @Prop({ default: true }) dynamicBtn!: boolean;

  public params:any= [];

  public addField() {
    this.params.push({ beta: '', s: '', b: '', alpha: '', B: '', H: '', d: '', shape: '' })
  }

  public shapeOptions = [
    {
      id: 0,
      label: '矩形断面',
      value: crossSectionShapeType.RECTANGLE
    },
    {
      id: 1,
      label: '圆形断面',
      value: crossSectionShapeType.CIRCLE
    }
  ];

  public stShapeOptions = [
    {
      id: 1,
      label: '栅条形状1',
      value: 2.42,
      img: require('@/assets/images/graph/412-1.png')
    },
    {
      id: 2,
      label: '栅条形状2',
      value: 1.83,
      img: require('@/assets/images/graph/412-2.png')
    },
    {
      id: 3,
      label: '栅条形状3',
      value: 1.67,
      img: require('@/assets/images/graph/412-3.png')
    },
    {
      id: 4,
      label: '栅条形状4',
      value: 1.035,
      img: require('@/assets/images/graph/412-4.png')
    },
    {
      id: 5,
      label: '栅条形状5',
      value: 0.92,
      img: require('@/assets/images/graph/412-5.png')
    },
    {
      id: 6,
      label: '栅条形状6',
      value: 0.76,
      img: require('@/assets/images/graph/412-6.png')
    },
    {
      id: 7,
      label: '栅条形状7',
      value: 1.79,
      img: require('@/assets/images/graph/412-7.png')
    }

  ];

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
