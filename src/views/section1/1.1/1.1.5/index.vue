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

type FlatGateResult = {
  raw: string;
  Q: string;
}

const fields: FieldSchema[] = [
  { key: 'H', latex: 'H', type: 'number' },
  { key: 'v_0', latex: 'v_0', type: 'number' },
  { key: 'b', latex: 'b', type: 'number' },
  { key: 'n', latex: 'n', type: 'number' },
  { key: '\\mu', latex: '\\mu', type: 'number' },
  { key: 'D', latex: 'D', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    H: 20.65,
    v_0: 1.6,
    b: 10,
    n: 1,
    '\\mu': 0.9,
    D: 10
  },
  description: '某水利工程,进水闸孔口高度10m,单孔净宽10m,堰前行近流速为1.6m,设计洪水下堰上水头20.65m,孔口自由出流流量系数0.9,计算下泄流量.',
  expectedResult: '求得下泄流量为1308.25'
}

const formulas = {
  12: 'Q :流量,m^3/s',
  0: 'B :孔口总净宽,m',
  1: 'b :单孔宽度,m',
  2: 'n :孔数数目',
  3: 'D :孔口高度,m',
  7: 'H :堰上水头,m',
  5: 'v_0 :堰前3H_0\\sim 6H_0处断面的平均流速,m/s',
  4: 'g :重力加速度,m/s^2,取9.8',
  6: 'H_0 :自闸底算起的的堰上水头(包括行近流速水头),m',
  9: '\\mu :流量系数,圆滑孔口的流量系数在设计时可取0.90'
}

const resultSchema: ResultSchema<FlatGateResult> = {
  summary: [
    { key: 'Q', label: 'Q', latex: 'Q' }
  ]
}

export default defineComponent({
  name: 'Section115Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '1.1.5 平底带胸墙孔口式闸',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const Q = Chapter1.dxqpdzxljs(
            Number(input.H),
            Number(input.v_0),
            Number(input.b),
            Number(input.n),
            Number(input['\\mu']),
            Number(input.D)
          ).toFixed(2)

          return {
            raw: `泄流量Q=${Q}`,
            Q
          }
        },
        formatResult: (result: FlatGateResult) => result.raw
      } as CalculationDefinition<Record<string, any>, FlatGateResult>
    }
  }
})
</script>
