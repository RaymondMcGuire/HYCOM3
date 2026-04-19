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

type ScourPitDepthResult = {
  raw: string;
  depth: string;
}

const fields: FieldSchema[] = [
  { key: 'q', latex: 'q', type: 'number' },
  { key: 'Z', latex: 'Z', type: 'number' },
  { key: 'K', latex: 'K', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    q: 101.538,
    Z: 221.68,
    K: 1.1
  },
  description: '黄河拉西瓦水电站混凝土拱坝,左、中、右三个表孔,鼻坎为跌流,左表孔鼻坎高程2436.18m,中表孔鼻坎高程2434.62m,右表孔鼻坎高程2436.18m,河床高程2214.5m,校核情况下单孔泄量均为1320m3/s,左、中、右表孔过流宽度均为13m,计算自下游水面至坑底最大水垫深度。',
  expectedResult: '自下游水面至坑底最大水垫深度=42.77'
}

const formulas = {
  0: 't_d :自下游水面至坑底最大水垫深度,m',
  1: 'Z :鼻坎至河床高差,m',
  2: 'q :鼻坎末端断面单宽流量,m3/(s.m)'
}

const resultSchema = createAssignmentResultSchema<ScourPitDepthResult>([
  { key: 'depth', label: 't_d', latex: 't_d' }
])

export default defineComponent({
  name: 'Section545Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '5.4.5 下游无护坦的最大冲坑水垫深度',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const value = Chapter6.xywhtzdcksdsd(
            Number(input.K),
            Number(input.q),
            Number(input.Z)
          ).toFixed(2)

          return {
            raw: `自下游水面至坑底最大水垫深度=${value}`,
            depth: value
          }
        },
        formatResult: (result: ScourPitDepthResult) => result.raw
      } as CalculationDefinition<Record<string, any>, ScourPitDepthResult>
    }
  }
})
</script>
