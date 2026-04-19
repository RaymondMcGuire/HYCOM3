<template>
  <div>
    <hycom-form
      :definition="definition"
      :state="formState"
      @beforeOnDemo="beforeOnDemo"
      @beforeOnReset="beforeOnReset"
    >
      <template #equ_explain_anchor>
        <pressurized-hydraulic-sections
          ref="paramSections"
          :sections="sections"
          :explain-text="explainText"
          @update-params="updateDynamicParams"
        />
      </template>
    </hycom-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import HycomForm from '@/components/HycomForm/index.vue'
import PressurizedHydraulicSections from '@/shared/components/pressurizedHydraulics/SectionsRenderer.vue'
import { shortPipeSections } from '@/shared/components/pressurizedHydraulics/sections'
import {
  CalculationDefinition,
  calculateShortPipeCoefficient,
  createDynamicParamController,
  createCalculationState,
  DemoCase,
  FieldSchema,
  shortPipeDemoSteps,
  shortPipeRefNames
} from '@/shared/calculations'

const fields: FieldSchema[] = [
  { key: 'B', latex: 'B', type: 'number' },
  { key: 'a', latex: 'a', type: 'number' },
  { key: 'l_a', latex: 'l_a', type: 'number' },
  { key: '\\phi', latex: '\\phi', type: 'number' },
  { key: '\\varepsilon', latex: '\\varepsilon', type: 'number' },
  { key: 'n_z', latex: 'n_z', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    B: 8,
    a: 11,
    l_a: 20.35,
    '\\phi': 0.97,
    '\\varepsilon': 0.914,
    n_z: 0.014
  },
  description: '国内某水电站,水库校核水位1860.4m,正常蓄水位1856m,汛限水位1854m,中孔泄洪洞进水口为有压短管,长度20.35m,有压短管出口底板高程1804m,进口顶部高程1821.118m,检修门槽尺寸8m x 13.6m,工作闸门尺寸8m x 11m,垂直收缩系数ε=0.914,求校核洪水时中孔泄洪洞的泄量系数及泄量。',
  expectedResult: '估算流量系数0.886, 求得流量系数0.84'
}

const formulas = {
  0: '\\mu :流量系数',
  1: '\\varepsilon :有压短管出口顶部无倾斜压板工作闸门垂直收缩系数',
  2: 'e :闸孔开启高度,m',
  3: 'B :水流收缩断面处的底宽,m',
  4: 'A_c :收缩断面面积,m^2',
  5: '\\zeta_i :自进口上游渐变流断面至有压短管出流后的收缩断面之间的任一局部能量损失系数',
  6: 'b_i :\\zeta_i相应的过水断面宽度,m',
  7: 'h_i :\\zeta_i相应的过水断面宽度,m',
  8: 'A_i :\\zeta_i相应的过水断面面积,m^2',
  9: 'l_a :有压短管长度',
  10: 'A_a :有压短管平均过水断面面积,m^2',
  11: 'R_a :有压短管平均过水断面相应的水力半径,m',
  12: 'C_a :有压短管平均过水断面相应的谢才系数',
  13: '\\phi :流速系数, 一般取 0.97'
}

export default defineComponent({
  name: 'Section331Calculator',
  components: {
    HycomForm,
    PressurizedHydraulicSections
  },
  data() {
    return {
      explainText: '参数',
      sections: shortPipeSections,
      formState: createCalculationState(fields),
      dynamicParams: createDynamicParamController(
        shortPipeRefNames,
        shortPipeDemoSteps
      ),
      definition: {
        title: '3.3.1 有压短管流量系数计算',
        fields,
        formulas,
        demoCase,
        execute: () => this.calculateResult()
      } as CalculationDefinition
    }
  },
  methods: {
    getDynamicSectionRefs() {
      return ((this.$refs.paramSections as any)?.$refs ?? {}) as Record<string, any>
    },
    beforeOnReset() {
      this.dynamicParams.reset(this.getDynamicSectionRefs())
    },
    beforeOnDemo() {
      this.dynamicParams.applyDemo(this.getDynamicSectionRefs())
    },
    updateDynamicParams(refName: string, paramData: any[]) {
      this.dynamicParams.update(refName, paramData)
    },
    calculateResult() {
      return calculateShortPipeCoefficient({
        input: this.formState,
        params: this.dynamicParams.data
      })
    }
  }
})
</script>
