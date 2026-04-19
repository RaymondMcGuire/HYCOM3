<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-06-11 21:44:21
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-06-12 15:03:28
 * @FilePath: \hycom_app\src\views\section2\2.6\2.6.2\index.vue
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
-->
<template>
  <div>
    <hycom-form
      :definition="definition"
      :state="formState"
    >
      <template #table_fir_anchor>
        <div>
          <h3>掺气点位置与台阶高度和临界水深函数关系图(图2.6.6):</h3>
          <br>
          <LineChart />
        </div>
      </template>
    </hycom-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Chapter2 } from '@/hycom_lib/chapter2'

import HycomForm from '@/components/HycomForm/index.vue'
import LineChart from './components/LineChart.vue'
import {
  CalculationDefinition,
  createAssignmentResultSchema,
  createCalculationState,
  DerivedFieldRule,
  DemoCase,
  FieldSchema,
  parseAssignmentResult
} from '@/shared/calculations'

type AerationSummaryResult = {
  raw: string;
  L1?: string;
  L2?: string;
  d0?: string;
  v0?: string;
  eta?: string;
}

const fields: FieldSchema[] = [
  { key: 'Q', latex: 'Q', type: 'number' },
  { key: 'h', latex: 'h', type: 'number' },
  { key: 'H_堰', latex: 'H_堰', type: 'number' },
  { key: 'H', latex: 'H', type: 'number' },
  { key: 'b', latex: 'b', type: 'number' },
  { key: '\\frac{L1}{h}', latex: '\\frac{L1}{h}', type: 'number', readonly: true }
]

const demoCase: DemoCase = {
  values: {
    Q: 25.12,
    h: 0.9,
    H_堰: 50,
    H: 1.7,
    b: 8,
    '\\frac{L1}{h}': undefined
  },
  description: '某碾压混凝土(RCC)重力坝,最大坝高50m,坝顶宽8m,下游坝坡设置台阶消能工,每个台阶步高0.9m、步长0.72m,单宽流量3.14m^3/s-m,堰上水头1.7m,计算台阶消能工初始掺气点位置、水深、流速及均匀掺气断面位置、水深、流速、消能效率。',
  expectedResult: '求得L1=9.8095; L2=14.4677; d0=0.5994; v0=41.9091; eta=0.9470'
}

const formulas = {
  0: 'L_1: 从堰顶算起至掺气点的长度,m',
  1: 'L_2: 出现均匀流掺气水流的距离,m',
  2: 'd_0: 均匀掺气水流的水深,m',
  3: 'v_0: 均匀掺气流平均流速,m/s',
  4: 'H_堰: 堰高,m',
  5: 'H: 堰上水头,m',
  6: 'q: 单宽流量,m^3/s-m',
  7: 'd_c: 临界水深 m',
  8: 'h: 台阶的步高 m ',
  9: 'b: 溢流泄槽宽度'
}

const resultSchema = createAssignmentResultSchema<AerationSummaryResult>([
  { key: 'L1', label: 'L1', latex: 'L_1' },
  { key: 'L2', label: 'L2', latex: 'L_2' },
  { key: 'd0', label: 'd0', latex: 'd_0' },
  { key: 'v0', label: 'v0', latex: 'v_0' },
  { key: 'eta', label: 'eta', latex: '\\eta' }
])

function curve266(x: number) {
  return -0.04470359 * Math.pow(x, 5) + 0.74138603 * Math.pow(x, 4) - 3.45303124 * Math.pow(x, 3) + 7.83388746 * Math.pow(x, 2) - 2.07367457 * x + 7.20028475
}

const derivedFields: Array<DerivedFieldRule<Record<string, any>>> = [
  {
    deps: ['Q', 'b', 'h'],
    targets: ['\\frac{L1}{h}'],
    apply: (state) => {
      if (state.b && state.Q && state.h) {
        const q = Number(state.Q) / Number(state.b)
        const dcDivH = Math.pow(q * q / 9.8, 1 / 3) / Number(state.h)
        return {
          '\\frac{L1}{h}': Number(curve266(dcDivH).toFixed(4))
        }
      }

      return {
        '\\frac{L1}{h}': undefined
      }
    }
  }
]

export default defineComponent({
  name: 'Section162Calculator',
  components: {
    HycomForm,
    LineChart
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '1.6.2 南京水利科学研究院方法计算',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        derivedFields,
        execute: ({ input }) => {
          const raw = Chapter2.njslkxy263(
            Number(input.Q),
            Number(input.b),
            Number(input.h),
            Number(input.H_堰),
            Number(input.H),
            Number(input['\\frac{L1}{h}'])
          )
          return raw.includes('=')
            ? parseAssignmentResult<AerationSummaryResult>(raw)
            : { raw }
        },
        formatResult: (result: AerationSummaryResult) => result.raw
      } as CalculationDefinition<Record<string, any>, AerationSummaryResult>
    }
  }
})
</script>
