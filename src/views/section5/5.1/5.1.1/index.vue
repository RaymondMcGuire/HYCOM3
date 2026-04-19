<template>
  <div>
    <hycom-form
      :definition="definition"
      :state="formState"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Chapter4 } from '@/hycom_lib/chapter4'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createAssignmentResultSchema,
  createCalculationState,
  DemoCase,
  FieldSchema
} from '@/shared/calculations'

type DischargeResult = {
  raw: string;
  discharge: string;
}

const fields: FieldSchema[] = [
  { key: 'C', latex: 'C', type: 'number' },
  { key: 'm', latex: 'm', type: 'number' },
  { key: '\\varepsilon', latex: '\\varepsilon', type: 'number' },
  { key: '\\sigma_m', latex: '\\sigma_m', type: 'number' },
  { key: 'n', latex: 'n', type: 'number' },
  { key: 'B', latex: 'B', type: 'number' },
  { key: 'H_w', latex: 'H_w', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    C: 1.0,
    m: 0.463,
    '\\varepsilon': 0.95,
    '\\sigma_m': 1.0,
    n: 3,
    B: 13,
    H_w: 14
  },
  description: '国内某大型水电站,正常蓄水位2452m,总库容10.79 亿m3,最大坝高250m,水库校核洪水位2457m,表孔溢流堰3 孔等宽布置,每孔净宽13m,堰面曲线为WES 曲线,堰顶高程2443m.流量系数为0.463,侧收缩系数0.95,求校核情况下表孔的泄量.',
  expectedResult: '泄量=3978.22'
}

const formulas = {
  0: 'Q :流量,m^3/s',
  1: 'B :总净宽,m',
  2: 'b :单孔宽度,m',
  3: 'n :闸孔数目',
  4: 'H_w :堰顶以上作用水头,m',
  5: 'm :流量系数',
  6: '\\varepsilon :侧收缩系数,根据闸墩厚度及墩头形状,可取0.90~0.95',
  7: 'C :上游面坡度修正系数,上游面为铅直面时取1.0',
  8: '\\sigma_m :淹没系数,不淹没时取1.0'
}

const resultSchema = createAssignmentResultSchema<DischargeResult>([
  { key: 'discharge', label: 'Q', latex: 'Q' }
])

export default defineComponent({
  name: 'Section511Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '5.1.1 开敞式溢流堰的泄量计算',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const value = Chapter4.kcsylydxl(
            Number(input.C),
            Number(input.m),
            Number(input['\\varepsilon']),
            Number(input['\\sigma_m']),
            Number(input.n),
            Number(input.B),
            Number(input.H_w)
          ).toFixed(2)

          return {
            raw: `泄量=${value}`,
            discharge: value
          }
        },
        formatResult: (result: DischargeResult) => result.raw
      } as CalculationDefinition<Record<string, any>, DischargeResult>
    }
  }
})
</script>
