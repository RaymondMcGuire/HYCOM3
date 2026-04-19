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

type EconomicDiameterResult = {
  raw: string;
  diameter: string;
}

const fields: FieldSchema[] = [
  { key: 'v_e', latex: 'v_e', type: 'number' },
  { key: 'Q_{max}', latex: 'Q_{max}', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    v_e: 5.5,
    'Q_{max}': 579.76
  },
  description: '某水电站发电引水管道为压力钢管,单管最大流量为579.76m^3/s,设计水头为66m, v_e为水电站压力钢管经济流速取5.5m/s,初拟管道经济直径.',
  expectedResult: '管道直径=11.59'
}

const formulas = {
  0: '\\upsilon_e :管道经济流速,m/s',
  1: 'D :管道直径,m',
  2: 'Q_{max} :管道中的最大设计流量,m^3/s'
}

const resultSchema = createAssignmentResultSchema<EconomicDiameterResult>([
  { key: 'diameter', label: 'D', latex: 'D' }
])

export default defineComponent({
  name: 'Section71Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, EconomicDiameterResult> = {
      title: '7.1 经济管径的计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const diameter = Chapter6.jsjjzj(
          Number(input.v_e),
          Number(input['Q_{max}'])
        ).toFixed(2)

        return {
          raw: `管道直径=${diameter}`,
          diameter
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
