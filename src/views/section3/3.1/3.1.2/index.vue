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

type PressurizedTunnelDischargeResult = {
  raw: string;
  discharge: string;
}

const fields: FieldSchema[] = [
  { key: '\\mu', latex: '\\mu', type: 'number' },
  { key: 'T_0', latex: 'T_0', type: 'number' },
  { key: 'a', latex: 'a', type: 'number' },
  { key: 'b', latex: 'b', type: 'number' },
  { key: 'h_p', latex: 'h_p', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    '\\mu': 0.774,
    T_0: 66.9,
    a: 6.8,
    b: 8,
    h_p: 6.8
  },
  description: '国内某水电站,校核水位1860.4m,泄洪排沙底孔为有压洞,洞内径9m。工作闸门孔口尺寸8mx6.8m,底板高程1793.5m,流量系数μ=0.774,求泄流量。',
  expectedResult: '泄流量=1445.12'
}

const formulas = {
  0: '\\mu :流量系数',
  1: 'T_0 :上游水面与隧洞出口底板高程差及上游行近流速水头之和',
  2: 'h_p :隧洞出口断面水流的平均单位势能,m',
  3: 'a :出口断面洞高,m',
  4: 'b :出口断面宽度,m'
}

const resultSchema = createAssignmentResultSchema<PressurizedTunnelDischargeResult>([
  { key: 'discharge', label: 'Q', latex: 'Q' }
])

export default defineComponent({
  name: 'Section312Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, PressurizedTunnelDischargeResult> = {
      title: '3.1.2 泄流流量计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const discharge = Chapter4.yygdll(
          Number(input['\\mu']),
          Number(input.a),
          Number(input.b),
          Number(input.T_0),
          Number(input.h_p)
        ).toFixed(2)

        return {
          raw: `泄流量=${discharge}`,
          discharge
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
