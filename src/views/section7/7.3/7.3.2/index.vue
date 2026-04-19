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

type PipeCharacteristicResult = {
  raw: string;
  coefficient: string;
}

const fields: FieldSchema[] = [
  { key: 'C', latex: 'C', type: 'number' },
  { key: 'v_{max}', latex: 'v_{max}', type: 'number' },
  { key: 'H_0', latex: 'H_0', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    C: 619.05,
    'v_{max}': 5.584,
    H_0: 73.4
  },
  description: '某水电站单机最大流量为579.76m^3/s,管道直径11.5m,最大工作水头73.4m,求管道的特征系数.',
  expectedResult: '管道特征系数=2.4028'
}

const formulas = {
  0: '\\rho :管道特征系数',
  1: 'v_{max} :管道中水流的最大流速,m/s',
  3: 'H_0 :静水头,m',
  4: 'C :水锤波速,m/s'
}

const resultSchema = createAssignmentResultSchema<PipeCharacteristicResult>([
  { key: 'coefficient', label: '\\rho', latex: '\\rho' }
])

export default defineComponent({
  name: 'Section732Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, PipeCharacteristicResult> = {
      title: '7.3.2 管道的特征系数计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const coefficient = Chapter6.gdtzxs(
          Number(input.C),
          Number(input['v_{max}']),
          Number(input.H_0)
        ).toFixed(4)

        return {
          raw: `管道特征系数=${coefficient}`,
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
