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

type HydraulicJumpLengthResult = {
  raw: string;
  length: string;
}

const fields: FieldSchema[] = [
  { key: 'Q', latex: 'Q', type: 'number' },
  { key: 'b', latex: 'b', type: 'number' },
  { key: 'H_0', latex: 'H_0', type: 'number' },
  { key: '\\phi', latex: '\\phi', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    Q: 2253,
    b: 15,
    H_0: 83.216,
    '\\phi': 0.8
  },
  description: '某泄水建筑物,水流沿泄槽扩散进入消力池,消力池进口宽15m,底板高程1778m,水库校核水位为1860.4m,泄量为2253m3/s,下游水位1793.87m,计算水跃长度.',
  expectedResult: '求得水跃长度为172.46'
}

const formulas = {
  0: 'E_0 :以下游收缩断面处为基准面的泄水建筑物上游的总能头(计入上游水流行进流速v_0),m',
  1: 'E :以下游收缩断面处为基准面的泄水建筑物上游的水头(不计入上游水流行进流速v_0),m',
  2: 'Q :流量,m^3/s',
  3: 'b :消力池进口宽度,m',
  4: 'H_0 :以消力池进口底板为基准面的泄水建筑物上游总水头,m',
  5: '\\phi :流速系数; 低坝 : 实用堰 (\\phi=0.9 \\sim 0.95); 实用堰闸孔 (\\phi=0.85 \\sim 0.95); 宽顶堰 (\\phi=0.8 \\sim 0.9); 宽顶堰闸孔 (\\phi=0.75 \\sim 0.85)',
  6: '高坝 : \\phi=\\sqrt{1-0.1 \\frac{E^{1/2}}{(Q/b)^{1/3}} } '
}

const resultSchema: ResultSchema<HydraulicJumpLengthResult> = {
  summary: [
    { key: 'length', label: 'length', latex: 'L' }
  ]
}

export default defineComponent({
  name: 'Section141Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '1.4.1 水平光面护坦上的水跃计算',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const length = Section2.spghhtsdsyjs(
            Number(input.Q),
            Number(input.b),
            Number(input.H_0),
            Number(input['\\phi'])
          ).toFixed(2)

          return {
            raw: `水跃长度=${length}`,
            length
          }
        },
        formatResult: (result: HydraulicJumpLengthResult) => result.raw
      } as CalculationDefinition<Record<string, any>, HydraulicJumpLengthResult>
    }
  }
})
</script>
