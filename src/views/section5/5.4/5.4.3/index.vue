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

type ImpactVelocityResult = {
  raw: string;
  velocity: string;
  angle: string;
}

const fields: FieldSchema[] = [
  { key: 'q', latex: 'q', type: 'number' },
  { key: 'Z', latex: 'Z', type: 'number' },
  { key: 'Z0', latex: 'Z_0', type: 'number' },
  { key: 't_d', latex: 't_d', type: 'number' },
  { key: '\\phi', latex: '\\phi', type: 'number' },
  { key: '\\nabla', latex: '\\nabla', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    q: 101.538,
    Z: 221.68,
    Z0: 188.93,
    t_d: 110.203,
    '\\phi': 0.95,
    '\\nabla': 0
  },
  description: '黄河拉西瓦水电站混凝土拱坝,左、中、右三个表孔,鼻坎为跌流,左表孔鼻坎高程2436.18m,中表孔鼻坎高程2434.62m,右表孔鼻坎高程2436.18m,河床高程2214.5m,校核情况下单孔泄量均为1320m3/s,左、中、右表孔过流宽度均为13m,。左、中、右表孔上下游水位差分别为188.93m、184.58m、187.37m,计算冲击流速以及水舌入射角。',
  expectedResult: '冲击流速=17.4870, 水舌入射角=113.2671'
}

const formulas = {
  0: 'Z_0:水舌落水点上、下游水位差,m',
  1: 'Z :鼻坎至河床高差,m',
  2: 'q :鼻坎末端断面单宽流量,m3/(s.m)',
  3: '\\beta:水舌入射角',
  4: 'h_0:水舌落至水面时的厚度, m',
  5: 'v_0:水舌落至水面时的平均流速,m/s',
  6: 't_d:水舌落水点上游水垫深度, m',
  7: '\\phi:流速系数,取0.95',
  8: 'v_1:水舌对护坦的冲击流速,m/s,水舌落点上、下游有水位差或者水舌落点上、下游无明显水位差。'
}

const resultSchema = createAssignmentResultSchema<ImpactVelocityResult>([
  { key: 'velocity', label: 'v_1', latex: 'v_1' },
  { key: 'angle', label: '\\beta', latex: '\\beta' }
])

export default defineComponent({
  name: 'Section543Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '5.4.3 护坦的冲击流速',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const value = Chapter6.htcjls(
            Number(input.q),
            Number(input.Z),
            Number(input.Z0),
            Number(input['\\phi']),
            Number(input.t_d),
            Number(input['\\nabla'])
          )

          return {
            raw: `冲击流速=${value.v1.toFixed(4)}, 水舌入射角=${value.beta.toFixed(4)}`,
            velocity: value.v1.toFixed(4),
            angle: value.beta.toFixed(4)
          }
        },
        formatResult: (result: ImpactVelocityResult) => result.raw
      } as CalculationDefinition<Record<string, any>, ImpactVelocityResult>
    }
  }
})
</script>
