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
import { Chapter4 } from '@/hycom_lib/chapter4'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createAssignmentResultSchema,
  createCalculationState,
  DemoCase,
  FieldSchema
} from '@/shared/calculations'

type ShortPipeDischargeResult = {
  raw: string;
  discharge: string;
  velocity: string;
}

const fields: FieldSchema[] = [
  { key: '\\mu', latex: '\\mu', type: 'number' },
  { key: 'B', latex: 'B', type: 'number' },
  { key: 'e', latex: 'e', type: 'number' },
  { key: 'H', latex: 'H', type: 'number' },
  { key: '\\varepsilon', latex: '\\varepsilon', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    '\\mu': 0.84,
    B: 8,
    e: 11,
    H: 56.4,
    '\\varepsilon': 0.914
  },
  description: '国内某水电站,水库校核水位1860.4m,正常蓄水位1856m,汛限水位1854m,中孔泄洪洞进水口为有压短管,长度20.35m,有压短管出口底板高程1804m,进口顶部高程1821.118m,检修门槽尺寸8m x 13.6m,工作闸门尺寸8m x 11m,垂直收缩系数ε＝0.914,求校核洪水时中孔泄洪洞的泄量系数及泄量。',
  expectedResult: '泄量=2227.90|出口断面流速=27.70'
}

const formulas = {
  0: 'Q :流量,m^3/s',
  1: '\\mu :流量系数',
  2: 'B :出口断面宽度,m',
  3: 'e :出口断面开启高度,m',
  4: 'H :由有压短管出口底板高程算起的上游水深,m',
  5: '\\varepsilon :有压短管出口的工作闸门垂直收缩系数'
}

const resultSchema = createAssignmentResultSchema<ShortPipeDischargeResult>([
  { key: 'discharge', label: 'Q', latex: 'Q' },
  { key: 'velocity', label: 'v', latex: 'v' }
])

export default defineComponent({
  name: 'Section332Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, ShortPipeDischargeResult> = {
      title: '3.3.2 有压短管流量计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const values = Chapter4.dxyydgll(
          Number(input.B),
          Number(input.e),
          Number(input.H),
          Number(input['\\mu']),
          Number(input['\\varepsilon'])
        )

        const discharge = values[0].toFixed(2)
        const velocity = values[1].toFixed(2)

        return {
          raw: `泄量=${discharge}|出口断面流速=${velocity}`,
          discharge,
          velocity
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
