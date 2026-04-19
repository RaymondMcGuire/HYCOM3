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

type DynamicPressureResult = {
  raw: string;
  pressure: string;
}

const fields: FieldSchema[] = [
  { key: 'v_1', latex: 'v_1', type: 'number' },
  { key: '\\gamma', latex: '\\gamma', type: 'number' },
  { key: '\\beta', latex: '\\beta', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    v_1: 17.476,
    '\\gamma': 9.8,
    '\\beta': 113.291
  },
  description: '黄河拉西瓦水电站混凝土拱坝,左、中、右三个表孔,鼻坎为跌流,左表孔鼻坎高程2436.18m,中表孔鼻坎高程2434.62m,右表孔鼻坎高程2436.18m,河床高程2214.5m,校核情况下单孔泄量均为1320m3/s,左、中、右表孔过流宽度均为13m,计算左表孔射流跌落冲击底板动水压力。',
  expectedResult: '左表孔射流跌落冲击底板动水压力=128.83'
}

const formulas = {
  0: '\\gamma :水的重度,kN/m^3',
  1: 'v_1 :水舌对护坦的冲击流速，m/s',
  2: '\\beta :水舌入射角',
  3: 'P_d:动水压力强度,kN/m^2'
}

const resultSchema = createAssignmentResultSchema<DynamicPressureResult>([
  { key: 'pressure', label: 'P_d', latex: 'P_d' }
])

export default defineComponent({
  name: 'Section544Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '5.4.4 护坦上的动水压力',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const value = Chapter6.htsdsyl(
            Number(input['\\gamma']),
            Number(input.v_1),
            Number(input['\\beta'])
          ).toFixed(2)

          return {
            raw: `左表孔射流跌落冲击底板动水压力=${value}`,
            pressure: value
          }
        },
        formatResult: (result: DynamicPressureResult) => result.raw
      } as CalculationDefinition<Record<string, any>, DynamicPressureResult>
    }
  }
})
</script>
