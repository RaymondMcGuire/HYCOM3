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
  FieldSchema,
  parseDelimitedNumberList
} from '@/shared/calculations'

type OutletDischargeResult = {
  raw: string;
  discharge: string;
  velocity: string;
  coefficient: string;
}

const fields: FieldSchema[] = [
  { key: 'A_i', latex: 'A_i', type: 'text', placeholder: '以逗号分隔' },
  { key: '\\xi_i', latex: '\\xi_i', type: 'text', placeholder: '以逗号分隔' },
  { key: 'A_j', latex: 'A_j', type: 'text', placeholder: '以逗号分隔' },
  { key: '\\chi_j', latex: '\\chi_j', type: 'text', placeholder: '以逗号分隔' },
  { key: 'l_j', latex: 'l_j', type: 'text', placeholder: '以逗号分隔' },
  { key: 'n_z', latex: 'n_z', type: 'number' },
  { key: 'A_k', latex: 'A_k', type: 'number' },
  { key: 'n', latex: 'n', type: 'number' },
  { key: 'H_w', latex: 'H_w', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    A_i: '53.988,46.75,46.75,39.875',
    '\\xi_i': '0.1,0.2,0.133,0.1',
    A_j: '53.988,46.75,39.875',
    '\\chi_j': '30.632,28,25.5',
    l_j: '11,16.178,10.721',
    n_z: 0.014,
    A_k: 33,
    n: 2,
    H_w: 92
  },
  description: '同上例,深孔为2 孔,有压孔口,进水口底坎高程2371.8m,工作门底坎高程2362.0m,孔口尺寸5.5m x 6.0m,水库校核洪水位2457m,求校核情况下深孔的泄量.左、右深孔均为斜穿坝体的倾斜有压孔,由坝前进口段、坝内有压斜直段和下弯段,以及坝后工作弧门闸室段,长约35m.',
  expectedResult: '流量: 2448.33| 出口流速: 37.10| 流量系数: 0.87'
}

const formulas = {
  0: 'Q :流量,m^3/s',
  1: 'A_k :出口处面积,m^2',
  2: 'k :局部水头损失系数计算总数',
  3: '\\xi_i :局部水头损失系数,与之相应的流速所在断面为A_i',
  4: 'A_i :局部水头损失系数\\xi_i管道断面面积,m^2',
  5: 'm :有压孔沿程水头损失计算分段总数',
  6: 'A_j :有压孔沿程水头损失第j段管道断面面积,m^2',
  7: '\\chi_j :有压孔沿程水头损失第j段断面湿周平均值,m',
  8: 'l_i :有压孔沿程水头损失第j段管道长度,m',
  9: 'R_j :有压孔沿程水头损失第j段水力半径的平均值,m',
  10: 'H_w :自由出流时孔口中心处的作用水头,淹没时为上下游水位差,m',
  11: '\\mu :孔口式管道有压流流量系数',
  12: 'n_z :管道糙率',
  13: 'n :有压孔口数',
  14: 'v_k :出口处流速,m/s'
}

const resultSchema = createAssignmentResultSchema<OutletDischargeResult>([
  { key: 'discharge', label: 'Q', latex: 'Q' },
  { key: 'velocity', label: 'v_k', latex: 'v_k' },
  { key: 'coefficient', label: '\\mu', latex: '\\mu' }
])

export default defineComponent({
  name: 'Section512Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '5.1.2 孔口泄流能力',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const values = Chapter4.kkxljs(
            parseDelimitedNumberList(input.A_i),
            parseDelimitedNumberList(input['\\xi_i']),
            parseDelimitedNumberList(input.A_j),
            parseDelimitedNumberList(input['\\chi_j']),
            parseDelimitedNumberList(input.l_j),
            Number(input.n_z),
            Number(input.A_k),
            Number(input.n),
            Number(input.H_w)
          )

          const discharge = values[0].toFixed(2)
          const velocity = values[1].toFixed(2)
          const coefficient = values[2].toFixed(2)

          return {
            raw: `流量: ${discharge}| 出口流速: ${velocity}| 流量系数: ${coefficient}`,
            discharge,
            velocity,
            coefficient
          }
        },
        formatResult: (result: OutletDischargeResult) => result.raw
      } as CalculationDefinition<Record<string, any>, OutletDischargeResult>
    }
  }
})
</script>
