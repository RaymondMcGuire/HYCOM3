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
import { Chapter2 } from '@/hycom_lib/chapter2'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createAssignmentResultSchema,
  createCalculationState,
  DemoCase,
  FieldSchema
} from '@/shared/calculations'

type FreeFlowSurfaceLineResult = {
  raw: string;
  h1: string;
  h2: string;
}

const fields: FieldSchema[] = [
  { key: 'Q_c', latex: 'Q_c', type: 'number' },
  { key: 'b_c', latex: 'b_c', type: 'number' },
  { key: 'b_{c}^{\\prime}', latex: 'b_{c}^{\\prime}', type: 'number' },
  { key: 'n_z', latex: 'n_z', type: 'number' },
  { key: 'i_1', latex: 'i_1', type: 'number' },
  { key: 'i_2', latex: 'i_2', type: 'number' },
  { key: 'e', latex: 'e', type: 'number' },
  { key: '\\varepsilon', latex: '\\varepsilon', type: 'number' },
  { key: '\\Delta_{L1}', latex: '\\Delta_{L1}', type: 'number' },
  { key: '\\Delta_{L2}', latex: '\\Delta_{L2}', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    Q_c: 2310,
    b_c: 10,
    'b_{c}^{\\prime}': 8,
    n_z: 0.014,
    i_1: 0.14,
    i_2: 0.004692,
    e: 11,
    '\\varepsilon': 0.914,
    '\\Delta_{L1}': 206.39,
    '\\Delta_{L2}': 442.937
  },
  description: '国内某水电站,水库校核水位1860.4m,正常蓄水位1856m,汛限水位1854m,中孔泄洪洞进水口为有压短管,有压短管出口高程1804m,后接"龙抬头"无压泄洪洞,隧洞为城门洞型,隧洞断面尺寸为10m x 15m,底坡为0.14,洞长206.39m,反弧末段高程1778.007m,反弧段后底坡为0.00472、洞长442.937m.进水口底板高程1804m,工作闸门尺寸8m x 11m,流量系数mu＝0.871,垂直收缩系数epsilon＝0.914,混凝土衬砌糙率0.014,求校核洪水时中孔泄洪洞沿程水面线(净水深、掺气水深、空化数、隧洞净孔断面).',
  expectedResult: 'h1:6.51|h2:7.92'
}

const formulas = {
  0: 'Q_c :单个泄槽流量,m^3/s',
  1: 'n_z :糙率',
  2: 'b_c,b_{c}^{\\prime} :单个泄槽宽,m',
  3: '\\phi :流速系数,一般0.95 左右',
  4: 'H_0 :计算起始断面渠底以上总水头',
  5: 'L :泄槽长,m',
  6: '\\Delta_{L1},\\Delta_{L2} :分段长度,m',
  7: 'h_1 :分段起始断面水深,m',
  8: 'h_2 :分段末断面水深,m',
  9: 'v_1 :分段起始断面流速,m/s',
  10: 'v_2 :分段末断面流速,m/s',
  11: '\\alpha_1,\\alpha_2 :流速分布不均匀系数,取1.05',
  12: '\\theta :泄槽底坡角度',
  13: 'i_1,i_2 :泄槽底坡',
  14: 'J :分段内的摩阻坡率',
  15: 'v :分段平均流速',
  16: 'R :分段平均水力半径',
  17: 'h_c :起始断面水深为闸孔后的收缩水深',
  18: '\\zeta :掺气水深系数,取1~1.4s/m',
  19: 'N :计算断面个数',
  20: 'e :出口断面开启高度,m',
  21: '\\varepsilon :垂直收缩系数'
}

const resultSchema = createAssignmentResultSchema<FreeFlowSurfaceLineResult>([
  { key: 'h1', label: 'h_1', latex: 'h_1' },
  { key: 'h2', label: 'h_2', latex: 'h_2' }
])

export default defineComponent({
  name: 'Section334Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, FreeFlowSurfaceLineResult> = {
      title: '3.3.4 明流洞内水面线计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const h1 = Chapter2.sgysdsmxjs(
          Number(input.Q_c),
          Number(input.b_c),
          Number(input['b_{c}^{\\prime}']),
          Number(input.n_z),
          Number(input.i_1),
          Number(input.e),
          Number(input['\\varepsilon']),
          Number(input['\\Delta_{L1}'])
        )
        const h2 = Chapter2.sgysdsmxjs2(
          Number(input.Q_c),
          Number(input.b_c),
          Number(input.n_z),
          Number(input.i_2),
          h1,
          Number(input['\\Delta_{L2}'])
        )

        return {
          raw: `h1:${h1.toFixed(2)}|h2:${h2.toFixed(2)}`,
          h1: h1.toFixed(2),
          h2: h2.toFixed(2)
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
