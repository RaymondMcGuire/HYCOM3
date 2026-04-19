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
import { Section2 } from '@/hycom_lib/section2'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createCalculationState,
  DemoCase,
  FieldSchema,
  ResultSchema
} from '@/shared/calculations'

type ContractionCoefficientResult = {
  raw: string;
  epsilon: string;
}

const fields: FieldSchema[] = [
  { key: 'v_0', latex: 'v_0', type: 'number' },
  { key: 'H', latex: 'H', type: 'number' },
  { key: 'n', latex: 'n', type: 'number' },
  { key: 'b', latex: 'b', type: 'number' },
  { key: 'B', latex: 'B', type: 'number' },
  { key: 'd', latex: 'd', type: 'number' },
  { key: 'K', latex: 'K', type: 'number' },
  { key: 'P_1', latex: 'P_1', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    v_0: 3,
    H: 4.8,
    n: 2,
    b: 11,
    B: 28,
    d: 1.5,
    K: 0.1,
    P_1: 5.2
  },
  description: '某水利工程水库校核水位615m,溢洪道进水口控制堰为宽顶堰,堰长20.5m,进口底板高程605m,堰顶高程610.2m,进口底坎边缘用半径0.8m 圆弧修圆,2孔,单孔宽度11m,闸墩厚度1.5m,K=0.1,引渠宽度28m,计算控制堰侧收缩系数。',
  expectedResult: '求得侧收缩系数为0.98447'
}

const formulas = {
  1: 'Q :流量,m^3/s',
  2: 'm :流量系数',
  3: '\\varepsilon :侧收缩系数',
  5: 'n :孔数',
  4: 'b :单孔宽度,m',
  6: 'H :堰上水头,m,取堰前3H_{0} \\sim 6H_{0}处',
  7: 'v_0 :行进流速,m/s',
  8: 'g :重力加速度,m/s^2,取9.8',
  9: 'P_1 :上游堰高,m',
  10: 'K :闸墩形状影响系数',
  11: 'd :中墩厚度',
  12: 'B :堰上游距堰3H_{0} \\sim 4H_{0} 处的宽度'
}

const resultSchema: ResultSchema<ContractionCoefficientResult> = {
  summary: [
    { key: 'epsilon', label: 'epsilon', latex: '\\varepsilon' }
  ]
}

export default defineComponent({
  name: 'Section1121Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '1.1.2.1 闸墩侧收缩系数ε计算',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const epsilon = Section2.ddkcssxs(
            Number(input.B),
            Number(input.b),
            Number(input.K),
            Number(input.P_1),
            Number(input.H),
            Number(input.v_0),
            Number(input.d),
            Number(input.n)
          ).toFixed(5)

          return {
            raw: `侧收缩系数 ε :${epsilon}`,
            epsilon
          }
        },
        formatResult: (result: ContractionCoefficientResult) => result.raw
      } as CalculationDefinition<Record<string, any>, ContractionCoefficientResult>
    }
  }
})
</script>
