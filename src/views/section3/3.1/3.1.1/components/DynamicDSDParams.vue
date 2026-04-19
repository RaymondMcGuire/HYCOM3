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
      class="dynamic-field-grid"
      :key="`select-${index}`"
    >
      <div class="dynamic-field-grid__labels">
        <el-form-item>
          <math-jax :latex="'S_{断面形状'+(index+1)+'}'" />
        </el-form-item>
        <el-form-item>
          <math-jax :latex="'l_'+(index+1)+''" />
        </el-form-item>

        <div v-if="input.shape === 0">
          <el-form-item>
            <math-jax :latex="'b_'+(index+1)+''" />
          </el-form-item>
          <el-form-item>
            <math-jax :latex="'h_'+(index+1)+''" />
          </el-form-item>
        </div>
        <div v-else-if="input.shape === 1">
          <el-form-item>
            <math-jax :latex="'d_'+(index+1)+''" />
          </el-form-item>
        </div>
      </div>

      <div class="dynamic-field-grid__inputs">
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
            v-model="input.l"
            type="text"
            :placeholder="`${explainText}${index+1}:洞身段长度`"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  createDynamicParamsComponent,
  crossSectionShapeOptions
} from '@/shared/components/pressurizedHydraulics/factory'

export default createDynamicParamsComponent({
  name: 'DynamicDsdParams',
  createEmptyItem: () => ({ l: '', B: '', H: '', d: '', shape: '' }),
  addFieldKeys: ['l', 'B', 'H', 'd', 'shape'],
  extraData: {
    shapeOptions: crossSectionShapeOptions
  }
})
</script>
