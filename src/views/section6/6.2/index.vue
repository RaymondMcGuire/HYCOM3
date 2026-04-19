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
import { Chapter5 } from '@/hycom_lib/chapter5'
import { shapeType, syyType } from '@/hycom_lib/common'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createCalculationState,
  DemoCase,
  FieldSchema,
  ResultSchema
} from '@/shared/calculations'

type SurfaceLineStep = {
  label: string;
  value: string;
}

type NonUniformFlowResult = {
  raw: string;
  regime: string;
  steps: SurfaceLineStep[];
}

const fields: FieldSchema[] = [
  { key: '实用堰类型', latex: '实用堰类型', type: 'select' },
  { key: '断面形状', latex: '断面形状', type: 'select' },
  { key: '\\phi', latex: '\\phi', type: 'number' },
  { key: 'h', latex: 'h', type: 'number' },
  { key: '\\alpha', latex: '\\alpha', type: 'number' },
  { key: 'Q', latex: 'Q', type: 'number' },
  { key: 'b', latex: 'b', type: 'number' },
  { key: 'm', latex: 'm', type: 'number' },
  { key: 'n_z', latex: 'n_z', type: 'number' },
  { key: 'i', latex: 'i', type: 'number' },
  { key: 'L', latex: 'L', type: 'number' },
  { key: 'N', latex: 'N', type: 'number' },
  { key: 'Q_c', latex: 'Q_c', type: 'number' },
  { key: 'b_c', latex: 'b_c', type: 'number' },
  { key: 'H_0', latex: 'H_0', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    实用堰类型: syyType.syy,
    断面形状: shapeType.LADDER,
    '\\phi': 0.95,
    h: 8.95,
    '\\alpha': 1,
    Q: 500,
    b: 45,
    m: 2,
    n_z: 0.025,
    i: 0.000333333,
    L: 3386,
    N: 7,
    Q_c: 7300,
    b_c: 25,
    H_0: 34.5449
  },
  description: '某河湖连通工程,布置一渠道将水引至排水闸,渠道全长为3386m,梯形断面,边坡系数2.0,底宽45m,糙率为0.025,底坡为1/3000.当过闸流量为500m3/s 时,闸前水深为8.95m,计算排水渠道的水面线.',
  expectedResult: '缓流a1型壅水曲线|h1=8.950|h2=8.781|h3=8.615|h4=8.451|h5=8.287|h6=8.127|h7=7.968|'
}

const formulas = {
  0: 'Q_c :流量,m^3/s',
  110: 'Q :流量,m^3/s',
  1: 'A :渠道过流断面面积,m^2',
  2: 'x :湿周,m',
  3: 'R :水力半径,m',
  4: 'B :梯形渠道水面宽度,m',
  5: 'b_c :梯形渠道底部宽度或矩形断面宽度,m',
  50: 'b :梯形渠道底部宽度或矩形断面宽度,m',
  6: 'm :边坡系数',
  7: 'h :水深,m',
  8: 'n_z :糙率',
  9: 'i :泄槽底坡',
  10: '\\phi :流速系数,一般0.95 左右',
  11: 'H_0 :计算起始断面渠底以上总水头',
  12: '\\theta :泄槽底板与水面夹角',
  14: 'L :渠道长,m',
  15: 'N :计算断面个数',
  17: '\\alpha :流速的动力系数'
}

const resultSchema: ResultSchema<NonUniformFlowResult> = {
  summary: [
    { key: 'regime', label: '流态曲线' }
  ],
  lists: [
    {
      key: 'steps',
      label: '断面水深',
      itemLabel: (item) => (item as SurfaceLineStep).label,
      itemValue: (item) => (item as SurfaceLineStep).value
    }
  ]
}

export default defineComponent({
  name: 'Section62Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, NonUniformFlowResult> = {
      title: '6.2 渠道非均匀流水面线计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const values = Chapter5.mqfjyls(
          Number(input.实用堰类型),
          Number(input.断面形状),
          Number(input['\\phi']),
          Number(input.h),
          Number(input['\\alpha']),
          Number(input.Q),
          Number(input.b),
          Number(input.m),
          Number(input.n_z),
          Number(input.i),
          Number(input.L),
          Number(input.N),
          Number(input.Q_c),
          Number(input.b_c),
          Number(input.H_0),
          0.1
        )

        const steps = values[1].map((value: unknown, index: number) => ({
          label: `h${index + 1}`,
          value: String(value)
        }))

        return {
          raw: `${values[0]}|${steps.map((item) => `${item.label}=${item.value}|`).join('')}`,
          regime: String(values[0]),
          steps
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
