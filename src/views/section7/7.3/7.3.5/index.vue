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

type DirectHammerResult = {
  raw: string;
  pressure: string;
}

const fields: FieldSchema[] = [
  { key: 'C', latex: 'C', type: 'number' },
  { key: 'v_0', latex: 'v_0', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    C: 619.05,
    v_0: 5.584
  },
  description: '某水电站的基本资料同上例,如果发生水轮机关闭时间小于一个水锤波的时间T_s =0.8s, T_s < t_r=1.0012s则发生直接水锤,计算水锤压力',
  expectedResult: '水锤压力=352.73'
}

const formulas = {
  1: 'C :水锤波速,m/s',
  2: 'v_0 :初始水流速,m/s',
  3: '\\Delta H :水锤压强'
}

const resultSchema = createAssignmentResultSchema<DirectHammerResult>([
  { key: 'pressure', label: '\\Delta H', latex: '\\Delta H' }
])

export default defineComponent({
  name: 'Section735Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, DirectHammerResult> = {
      title: '7.3.5 直接水锤计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const pressure = Chapter6.zjsc(
          Number(input.C),
          Number(input.v_0)
        ).toFixed(2)

        return {
          raw: `水锤压力=${pressure}`,
          pressure
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
