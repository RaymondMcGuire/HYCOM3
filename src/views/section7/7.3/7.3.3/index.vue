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
import { Chapter6 } from '@/hycom_lib/chapter6'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createAssignmentResultSchema,
  createCalculationState,
  DemoCase,
  FieldSchema
} from '@/shared/calculations'

type WaterHammerCharacteristicResult = {
  raw: string;
  coefficient: string;
}

const fields: FieldSchema[] = [
  { key: 'L', latex: 'L', type: 'number' },
  { key: 'v_{max}', latex: 'v_{max}', type: 'number' },
  { key: 'T_s', latex: 'T_s', type: 'number' },
  { key: 'H_0', latex: 'H_0', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    L: 309.9,
    'v_{max}': 5.584,
    T_s: 11,
    H_0: 73.4
  },
  description: '同上,进水口长度46.8m,最长的1#管道长度263.1m,水轮机有效关闭时间11s,单机最大过流量579.76m^3/s,求水锤特征系数.',
  expectedResult: '水锤特征系数=0.2187'
}

const formulas = {
  0: '\\sigma :水锤的特性参数',
  1: 'L :管道长度,m',
  2: 'v_{max} :管道中水流的最大流速,m/s',
  3: 'H_0 :静水头,m',
  4: 'T_s :有效开阀时间'
}

const resultSchema = createAssignmentResultSchema<WaterHammerCharacteristicResult>([
  { key: 'coefficient', label: '\\sigma', latex: '\\sigma' }
])

export default defineComponent({
  name: 'Section733Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, WaterHammerCharacteristicResult> = {
      title: '7.3.3 水锤的特性参数计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const coefficient = Chapter6.sctxcs(
          Number(input.L),
          Number(input['v_{max}']),
          Number(input.T_s),
          Number(input.H_0)
        ).toFixed(4)

        return {
          raw: `水锤特征系数=${coefficient}`,
          coefficient
        }
      },
      formatResult: (result) => result.raw
    }

    return {
      formState,
      definition
    }
  }
})
</script>
