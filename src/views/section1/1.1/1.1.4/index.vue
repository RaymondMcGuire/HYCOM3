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

type ChestWallDischargeResult = {
  raw: string;
  Q: string;
  mu: string;
}

const fields: FieldSchema[] = [
  { key: 'H', latex: 'H', type: 'number' },
  { key: 'v_0', latex: 'v_0', type: 'number' },
  { key: 'b', latex: 'b', type: 'number' },
  { key: 'n', latex: 'n', type: 'number' },
  { key: 'P_1', latex: 'P_1', type: 'number' },
  { key: 'H_d', latex: 'H_d', type: 'number' },
  { key: 'D', latex: 'D', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    H: 23,
    v_0: 3,
    b: 10,
    n: 3,
    P_1: 15,
    H_d: 17.7,
    D: 8.5
  },
  description: '某国内(刘家峡)水电站工程,溢洪道为实用堰,平板闸门控制,3孔闸,孔口高度8.5m,单孔净宽10m,堰前行近流速为3m/s,校核洪水位1738m,堰顶高程1715m,上游堰高15m,计算闸门全开时的泄流量.',
  expectedResult: '求得闸门全开时的泄流量为4213.54'
}

const formulas = {
  12: 'Q :流量,m^3/s',
  0: 'B :孔口总净宽,m',
  1: 'b :单孔宽度,m',
  2: 'n :孔数目',
  3: 'D :孔口高度,m',
  4: 'g :重力加速度,m/s^2,取9.8',
  5: 'v_0 :堰前3H_0\\sim 6H_0处断面的平均流速,m/s',
  6: 'H_0 :计入行进流速的孔口堰上水头,m',
  7: 'H_{max} :水库校核水位时堰顶以上最大水头,m',
  8: 'H_d :定型设计水头,m,可按堰顶以上最大水头H_{max}的H_d=56\\%\\sim 77\\%',
  9: '\\mu :孔口流量系数',
  10: 'H :堰上水头,m',
  11: 'P_1 :上游堰高,m'
}

const resultSchema: ResultSchema<ChestWallDischargeResult> = {
  summary: [
    { key: 'Q', label: 'Q', latex: 'Q' },
    { key: 'mu', label: 'mu', latex: '\\mu' }
  ]
}

export default defineComponent({
  name: 'Section114Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '1.1.4 带胸墙孔口泄流能力（非淹没流、闸门全开）',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const result = Chapter1.dxqsyy(
            Number(input.H),
            Number(input.v_0),
            Number(input.b),
            Number(input.n),
            Number(input.P_1),
            Number(input.H_d),
            Number(input.D)
          )

          return {
            raw: `泄流量Q=${result.Q.toFixed(2)}; 孔口自由出流流量系数μ=${result.mu.toFixed(3)}`,
            Q: result.Q.toFixed(2),
            mu: result.mu.toFixed(3)
          }
        },
        formatResult: (result: ChestWallDischargeResult) => result.raw
      } as CalculationDefinition<Record<string, any>, ChestWallDischargeResult>
    }
  }
})
</script>
