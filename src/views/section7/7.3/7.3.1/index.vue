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

type WaterHammerWaveSpeedResult = {
  raw: string;
  speed: string;
}

const fields: FieldSchema[] = [
  { key: 'D', latex: 'D', type: 'number' },
  { key: 'E_s', latex: 'E_s', type: 'number' },
  { key: '\\delta_s', latex: '\\delta_s', type: 'number' },
  { key: 'E_w', latex: 'E_w', type: 'number' },
  { key: '\\gamma', latex: '\\gamma', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    D: 1150,
    E_s: 2.1e6,
    '\\delta_s': 3,
    E_w: 2e4,
    '\\gamma': 0.001
  },
  description: '某水电站压力钢管,壁厚3cm,直径11.5m,水容重0.001kg/cm3,水的体积弹模2.1*10^4 cm2,其中钢材E_s 2.1*10^6 kg / cm^2 ,求水锤波速.',
  expectedResult: '水锤波速=649.18'
}

const formulas = {
  0: 'E_w,\\gamma :水的体积弹性模量和容重',
  1: '\\delta_s :管道的壁厚',
  2: 'D :管道的直径,m',
  3: 'r :管道的半径',
  4: 'K :抗力系数',
  5: 'E_s :管道材料的弹模'
}

const resultSchema = createAssignmentResultSchema<WaterHammerWaveSpeedResult>([
  { key: 'speed', label: 'C', latex: 'C' }
])

export default defineComponent({
  name: 'Section731Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, WaterHammerWaveSpeedResult> = {
      title: '7.3.1 水锤波速C计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const speed = Chapter6.scbs(
          Number(input.D),
          Number(input.E_s),
          Number(input['\\delta_s']),
          Number(input.E_w),
          Number(input['\\gamma'])
        ).toFixed(2)

        return {
          raw: `水锤波速=${speed}`,
          speed
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
