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

type AeratedDepthResult = {
  raw: string;
  depth: string;
}

const fields: FieldSchema[] = [
  { key: 'h', latex: 'h', type: 'number' },
  { key: '\\varsigma', latex: '\\varsigma', type: 'number' },
  { key: 'v', latex: 'v', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    h: 14,
    '\\varsigma': 1.1,
    v: 21.875
  },
  description: '同5.1算例,求溢流面计算断面的掺气水深',
  expectedResult: '掺气水深=17.3688'
}

const formulas = {
  0: 'h :溢流面计算断面的水深,m',
  1: 'h_b :溢流面计算断面的掺气水深,m',
  2: 'v :不掺气情况下计算断面的流速,m/s',
  3: '\\varsigma :修正系数,取1~1.4s/m.'
}

const resultSchema = createAssignmentResultSchema<AeratedDepthResult>([
  { key: 'depth', label: 'h_b', latex: 'h_b' }
])

export default defineComponent({
  name: 'Section52Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '5.2 溢流坝面或泄槽水面波动及掺气水深',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const value = Chapter4.smbdjsqjs(
            Number(input.h),
            Number(input['\\varsigma']),
            Number(input.v)
          ).toFixed(4)

          return {
            raw: `掺气水深=${value}`,
            depth: value
          }
        },
        formatResult: (result: AeratedDepthResult) => result.raw
      } as CalculationDefinition<Record<string, any>, AeratedDepthResult>
    }
  }
})
</script>
