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

type WaterHammerModeResult = {
  raw: string;
  mode: string;
  travelTime: string;
}

const fields: FieldSchema[] = [
  { key: 'L', latex: 'L', type: 'number' },
  { key: 'C', latex: 'C', type: 'number' },
  { key: 'T_s', latex: 'T_s', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    L: 309.9,
    C: 619.05,
    T_s: 11
  },
  description: '某水电站的基本资料同上例,最长的1#管道长度263.1m,水轮机有效关闭时间11s,发生直接水锤还是间接水锤.',
  expectedResult: '间接水锤; tr=1.001211533801793'
}

const formulas = {
  1: 'C :水锤波速,m/s',
  2: 'L :管道长度,m',
  3: 'T_s :有效开阀时间,s',
  4: 't_r :水锤波在钢管中来回传播一次所用的时间'
}

const resultSchema = createAssignmentResultSchema<WaterHammerModeResult>([
  { key: 'mode', label: '水锤类型' },
  { key: 'travelTime', label: 't_r', latex: 't_r' }
])

export default defineComponent({
  name: 'Section734Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, WaterHammerModeResult> = {
      title: '7.3.4 直接水锤和间接水锤计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const value = Chapter6.pdzjschjjsc(
          Number(input.L),
          Number(input.C),
          Number(input.T_s)
        )

        return {
          raw: `${value[0]}; tr=${value[1]}`,
          mode: String(value[0]),
          travelTime: String(value[1])
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
