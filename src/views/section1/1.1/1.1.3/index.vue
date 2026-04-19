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
import { tfyType } from '@/hycom_lib/common'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createCalculationState,
  DemoCase,
  FieldSchema,
  ResultSchema
} from '@/shared/calculations'

type CrestedWeirResult = {
  raw: string;
  m: string;
  Q: string;
}

const fields: FieldSchema[] = [
  { key: '驼峰堰堰型', label: '驼峰堰堰型', type: 'select' },
  { key: 'P_1', latex: 'P_1', type: 'number' },
  { key: 'v_0', latex: 'v_0', type: 'number' },
  { key: 'H', latex: 'H', type: 'number' },
  { key: '\\varepsilon', latex: '\\varepsilon', type: 'number' },
  { key: 'n', latex: 'n', type: 'number' },
  { key: 'b', latex: 'b', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    驼峰堰堰型: tfyType.a,
    P_1: 2.5,
    v_0: 3.5,
    H: 4.525,
    '\\varepsilon': 0.817,
    n: 1,
    b: 25
  },
  description: '南方某水利工程,溢洪道为驼峰堰,堰型为a型,堰高P1=2.5m,H=4.525m,v0 =3.5m/s,n=1,b=25m,epsilon=0.817,计算流量。',
  expectedResult: '求得流量为458.63'
}

const formulas = {
  0: 'Q :流量,m^3/s',
  1: 'n :闸孔数目',
  2: 'b :单孔宽度,m',
  3: '\\varepsilon :侧收缩系数, 取值低堰可取 \\varepsilon=0.80 \\sim 0.90 ,均值0.85',
  4: 'P_1 :上游堰高,m',
  5: 'g :重力加速度,m/s^2,取9.8',
  6: 'H_0 :计入行进流速的堰上水头,m',
  7: 'H :堰上水头,m',
  8: 'm :流量系数'
}

const resultSchema: ResultSchema<CrestedWeirResult> = {
  summary: [
    { key: 'm', label: 'm', latex: 'm' },
    { key: 'Q', label: 'Q', latex: 'Q' }
  ]
}

export default defineComponent({
  name: 'Section113Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '1.1.3 驼峰堰泄流能力',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const result = Chapter1.tfy(
            Number(input.P_1),
            Number(input.v_0),
            Number(input.H),
            Number(input['\\varepsilon']),
            Number(input.n),
            Number(input.b),
            Number(input['驼峰堰堰型'])
          )

          return {
            raw: `流量系数m:${result.m.toFixed(2)}|流量Q:${result.Q.toFixed(2)}`,
            m: result.m.toFixed(2),
            Q: result.Q.toFixed(2)
          }
        },
        formatResult: (result: CrestedWeirResult) => result.raw
      } as CalculationDefinition<Record<string, any>, CrestedWeirResult>
    }
  }
})
</script>
