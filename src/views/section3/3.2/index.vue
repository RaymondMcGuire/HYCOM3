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
import { pressureLineSections } from '@/shared/components/pressurizedHydraulics/sections'
import {
  CalculationDefinition,
  calculatePressureLine,
  createDynamicParamController,
  createCalculationState,
  DemoCase,
  FieldSchema,
  pressureLineDemoSteps,
  pressureLineRefNames
} from '@/shared/calculations'

const fields: FieldSchema[] = [
  { key: 'T_0', latex: 'T_0', type: 'number' },
  { key: 'n_z', latex: 'n_z', type: 'number' },
  { key: 'Q', latex: 'Q', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    T_0: 66.9,
    n_z: 0.014,
    Q: 1445
  },
  description: '国内某水电站泄洪排沙底孔为有压洞,校核水位1860.4m,进口分为两孔,底坎高程1795.0m,各设事故检修门孔口尺寸为2-4.8 x 8.0m,进口两侧均喇叭口,顶部为椭圆形曲线。检修闸门后设置2 根直径内径1.2m 钢管埋在混凝土中用来通气补气,通气管后设置2 根0.5m 钢管埋在混凝土中用来充水。进水口长度13.5m（中墩末端两孔合一）、渐变段长20 m（由矩形12.4 x 8m 渐变圆形Φ9m）、Φ9m 有压隧洞段331.2m ,底坡i=0.00453,在平面布置上需两个弯道,两个弯道半径均为R=50m,θ=22°,渐变段末距第一个弯道末34.2m,第一及第二个弯道末相距163.73m,第二个弯道末距出口渐变段开始133.27m 出口渐变段 22 m 由Φ 9m 的圆形有压隧洞渐变为 8 x 6.8m的矩形断面与工作闸室相连。工作闸门室位于隧洞出口 长 27 .20m底板高程 1793.5m ,底板厚度 3m ,内设弧型工作闸门一扇,闸门孔口尺寸为 8 x 6.8m 。计算泄洪排沙有压管道的沿程压坡线。',
  expectedResult: 'P1~P6均大于2m水头'
}

const formulas = {
  0: 'Q :泄流流量m^3/s',
  1: 'T_0 :上游水面与隧洞出口底板高程差及上游行近流速水头之和,m',
  2: 'P_i :有压管道沿程i断面压强t/m^2或水柱高m',
  3: 'l_i :有压短管第i段长',
  4: '\\zeta_i :自进口上游渐变流断面至有压管道出流后的收缩断面之间某一局部能量损失系数',
  5: 'n_z: 糙率'
}

export default defineComponent({
  name: 'Section32Calculator',
  components: {
    HycomForm,
    PressurizedHydraulicSections
  },
  data() {
    return {
      explainText: '参数',
      sections: pressureLineSections,
      formState: createCalculationState(fields),
      dynamicParams: createDynamicParamController(
        pressureLineRefNames,
        pressureLineDemoSteps
      ),
      definition: {
        title: '3.2 压坡线计算',
        fields,
        formulas,
        demoCase,
        execute: () => this.calculateResult()
      } as CalculationDefinition
    }
  },
  mounted() {
    this.beforeOnDemo()
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
      return calculatePressureLine({
        input: this.formState,
        params: this.dynamicParams.data
      })
    }
  }
})
</script>
