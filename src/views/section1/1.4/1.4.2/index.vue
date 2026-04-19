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
import { Chapter1 } from '@/hycom_lib/chapter1'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createCalculationState,
  DemoCase,
  FieldSchema,
  ResultSchema
} from '@/shared/calculations'

type StillingBasinResult = {
  raw: string;
  depth: string;
  length: string;
}

const fields: FieldSchema[] = [
  { key: 'Q', latex: 'Q', type: 'number' },
  { key: 'b', latex: 'b', type: 'number' },
  { key: 'H_0', latex: 'H_0', type: 'number' },
  { key: '\\phi', latex: '\\phi', type: 'number' },
  { key: 'h_t', latex: 'h_t', type: 'number' },
  { key: '\\sigma', latex: '\\sigma', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    Q: 2253,
    b: 15,
    H_0: 83.216,
    '\\phi': 0.8,
    h_t: 15.87,
    '\\sigma': 1.05
  },
  description: '同上例,计算消力池长度和池深',
  expectedResult: '求得池深为8.90,池长为137.97'
}

const formulas = {
  0: 'H_0 :以消力池进口底板为基准面的泄水建筑物上游总水头,m',
  1: 'Q :流量,m^3/s',
  2: 'b :消力池入口宽度,m',
  3: '\\sigma :水流淹没度,1.05 \\sim 1.1',
  4: '\\phi :流速系数,0.95',
  5: 'h_t :下游水深,m',
  6: 's :消力池池深,m'
}

const resultSchema: ResultSchema<StillingBasinResult> = {
  summary: [
    { key: 'depth', label: 'depth', latex: 's' },
    { key: 'length', label: 'length', latex: 'L_k' }
  ]
}

export default defineComponent({
  name: 'Section142Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '1.4.2 下挖式消力池的水跃计算',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const result = Chapter1.xwsxlcsyjs(
            Number(input.Q),
            Number(input.b),
            Number(input.H_0),
            Number(input['\\phi']),
            Number(input.h_t),
            Number(input['\\sigma'])
          )

          return {
            raw: `池深:${result.s.toFixed(2)}|池长:${result.Lk.toFixed(2)}`,
            depth: result.s.toFixed(2),
            length: result.Lk.toFixed(2)
          }
        },
        formatResult: (result: StillingBasinResult) => result.raw
      } as CalculationDefinition<Record<string, any>, StillingBasinResult>
    }
  }
})
</script>
