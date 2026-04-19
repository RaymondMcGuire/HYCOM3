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

type WaterCushionDepthResult = {
  raw: string;
  depth: string;
}

const fields: FieldSchema[] = [
  { key: 'q', latex: 'q', type: 'number' },
  { key: 'Z', latex: 'Z', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    q: 101.538,
    Z: 221.68
  },
  description: '黄河拉西瓦水电站混凝土拱坝,左、中、右三个表孔,鼻坎为跌流,左表孔鼻坎高程2436.18m,中表孔鼻坎高程2434.62m,右表孔鼻坎高程2436.18m,河床高程2214.5m,校核情况下单孔泄量均为1320m3/s,左、中、右表孔过流宽度均为13m,计算水垫深度。',
  expectedResult: '水垫深度=28.75'
}

const formulas = {
  0: 't_d :水舌落水点上游水垫深度,m',
  1: 'Z :鼻坎至河床高差,m',
  2: 'q :鼻坎末端断面单宽流量,m3/(s.m)'
}

const resultSchema = createAssignmentResultSchema<WaterCushionDepthResult>([
  { key: 'depth', label: 't_d', latex: 't_d' }
])

export default defineComponent({
  name: 'Section542Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '5.4.2 水舌落水点上游水垫深度估算',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const value = Chapter6.sslsdsysdsd(
            Number(input.q),
            Number(input.Z)
          ).toFixed(2)

          return {
            raw: `水垫深度=${value}`,
            depth: value
          }
        },
        formatResult: (result: WaterCushionDepthResult) => result.raw
      } as CalculationDefinition<Record<string, any>, WaterCushionDepthResult>
    }
  }
})
</script>
