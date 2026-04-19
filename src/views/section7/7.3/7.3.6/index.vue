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

type IndirectHammerResult = {
  raw: string;
  positive: string;
  negative: string;
}

const fields: FieldSchema[] = [
  { key: '\\tau_0', latex: '\\tau_0', type: 'number' },
  { key: '\\rho', latex: '\\rho', type: 'number' },
  { key: '\\sigma', latex: '\\sigma', type: 'number' },
  { key: 'H_0', latex: 'H_0', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    '\\tau_0': 0,
    '\\rho': 2.4028,
    '\\sigma': 0.2187,
    H_0: 73.4
  },
  description: '资料同上例,导叶关闭时间T_s=11s>t_r=0.85 ,发生间接水锤.机组全增负荷,导叶由全关到全开, tau=0 ,判断发生水锤类型,计算间接水锤压力.机组甩负荷,导叶右全开到全关, tau=1 ,判断发生类型,计算间接水锤压力.',
  expectedResult: '正水锤:41.09|负水锤:26.34'
}

const formulas = {
  0: '\\rho :管道特征系数',
  1: 'C :水锤波速,m/s',
  2: '\\sigma :水锤的特性参数',
  3: '\\tau_0 :孔口相对开度',
  4: 'H_0 :静水头,m'
}

const resultSchema = createAssignmentResultSchema<IndirectHammerResult>([
  { key: 'positive', label: '正水锤' },
  { key: 'negative', label: '负水锤' }
])

export default defineComponent({
  name: 'Section736Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, IndirectHammerResult> = {
      title: '7.3.6 间接水锤计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const values = Chapter6.jssc(
          Number(input['\\tau_0']),
          Number(input['\\rho']),
          Number(input['\\sigma']),
          Number(input.H_0)
        )

        const positive = values[0].toFixed(2)
        const negative = values[1].toFixed(2)

        return {
          raw: `正水锤:${positive}|负水锤:${negative}`,
          positive,
          negative
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
