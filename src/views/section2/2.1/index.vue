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
  createAssignmentResultSchema,
  createCalculationState,
  DemoCase,
  FieldSchema
} from '@/shared/calculations'

type SideChannelLengthResult = {
  raw: string;
  length: string;
}

const fields: FieldSchema[] = [
  { key: 'Q', latex: 'Q', type: 'number' },
  { key: 'm', latex: 'm', type: 'number' },
  { key: 'H', latex: 'H', type: 'number' },
  { key: 'v_0', latex: 'v_0', type: 'number' },
  { key: '\\zeta_k', latex: '\\zeta_k', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    Q: 424,
    m: 0.5,
    H: 2.2,
    v_0: 1.02,
    '\\zeta_k': 0.88
  },
  description: '新疆某水库工程,侧槽溢洪道为实用堰的,无闸门堰流,堰高4.0m,堰顶高程1164m,引渠长约19m,底板高程1160.00m,度65.0m~70.0m,校核洪水位1166.2m,下泄流量423.62m^3/s.计算侧槽溢洪道前沿长度.',
  expectedResult: '侧槽溢洪道前沿长=64.36'
}

const formulas = {
  0: 'L :侧槽段溢流前沿总长度,m;侧槽溢洪道一般不设置闸门',
  1: 'Q :溢洪道最大泄流流量,m^3/s',
  2: 'm :流量系数,根据堰型选用;可采用实用堰、宽顶堰河梯形堰等,实际工程以实用堰居多',
  3: '\\zeta_k :侧槽溢流堰侧收缩系数,无闸实用堰,两边侧墙圆角到直角取0.7 \\sim 1.0',
  4: 'H :堰上水头,m,取堰前3H_0 \\sim 6H_0处',
  5: 'v_0 :引渠的行进流速,m/s',
  6: 'H_0 :计入行进流速的堰上水头,m'
}

const resultSchema = createAssignmentResultSchema<SideChannelLengthResult>([
  { key: 'length', label: 'L', latex: 'L' }
])

export default defineComponent({
  name: 'Section21Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, SideChannelLengthResult> = {
      title: '2.1 侧槽溢流前缘的总长度计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const length = Chapter1.cydylqydzcdjs(
          Number(input.Q),
          Number(input.m),
          Number(input.H),
          Number(input.v_0),
          Number(input['\\zeta_k'])
        ).toFixed(2)

        return {
          raw: `侧槽溢洪道前沿长=${length}`,
          length
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
