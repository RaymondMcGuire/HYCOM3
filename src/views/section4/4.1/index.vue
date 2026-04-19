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
import { Chapter3 } from '@/hycom_lib/chapter3'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createAssignmentResultSchema,
  createCalculationState,
  DemoCase,
  FieldSchema
} from '@/shared/calculations'

type ShaftSpillwayResult = {
  raw: string;
  discharge: string;
}

const fields: FieldSchema[] = [
  { key: '环形堰流', latex: '环形堰流', type: 'boolean', defaultValue: false },
  { key: '\\varepsilon', latex: '\\varepsilon', type: 'number' },
  { key: 'm', latex: 'm', type: 'number' },
  { key: 'R', latex: 'R', type: 'number' },
  { key: 'n_0', latex: 'n_0', type: 'number' },
  { key: 'S', latex: 'S', type: 'number' },
  { key: 'H', latex: 'H', type: 'number' },
  { key: '\\mu', latex: '\\mu', type: 'number' },
  { key: 'd', latex: 'd', type: 'number' },
  { key: 'Y', latex: 'Y', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    环形堰流: false,
    '\\varepsilon': 0.9,
    m: 0.46,
    R: 36,
    n_0: 1,
    S: 214.08,
    H: 19,
    '\\mu': 0.85,
    d: 7.5,
    Y: 22
  },
  description: '黄河某水电站工程主要任务是发电,兼顾下游灌溉及供水.水库正常蓄水位2005.0m,校核水位2008.0m,总库容为6.2 亿m3,电站总装机容量为1500MW.右岸泄洪洞为由导流洞改建而成的水平旋流消能泄洪洞型式.开敞式进水口位于电站引渠前沿右侧,堰顶高程1989.0m,为一孔12 m x 16 m 的孔口,设平板事故检修闸门和平板工作闸门各一扇,由2 x 1250kN固定式启闭机操作.堰闸后接直径9.0m 竖井,竖井掺气坎喉口断面控制各缩窄0.75m,高程1967m,竖井高度为46.615m,其下通过高度为27.75m的水平旋流发生装置与长45.5m、直径10.50m 的水平旋流洞相接.水平旋流洞后为长60.0m 的水垫塘消能段,其后即为与原导流洞结合的退水洞段,结合段长740.246m,末端为挑流消能鼻坎.',
  expectedResult: '泄量=1064.514'
}

const formulas = {
  0: 'Q :流量,m^3/s',
  1: 'm :有斜平面段喇叭口的溢洪道流量系数m=0.36,无平顶段竖井溢洪道流量系数m=0.46',
  2: 'H :堰顶水头,m',
  3: 'R :喇叭口半径,m',
  4: 'n_0 :闸墩数目',
  5: 'S :堰顶处闸墩宽度,m',
  6: '\\varepsilon :收缩系数,一般取0.9',
  7: '\\mu :竖井淹没成有压流流量系数,一般取0.85',
  8: 'Y :环形堰堰顶与流态转换断面上自由水面之间的高差,m',
  9: 'd :竖井直径,m'
}

const resultSchema = createAssignmentResultSchema<ShaftSpillwayResult>([
  { key: 'discharge', label: 'Q', latex: 'Q' }
])

export default defineComponent({
  name: 'Section41Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, ShaftSpillwayResult> = {
      title: '4.1 环形堰竖井泄洪洞泄流能力计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const discharge = Chapter3.xlnl(
          Boolean(input.环形堰流),
          Number(input['\\varepsilon']),
          Number(input.m),
          Number(input.R),
          Number(input.n_0),
          Number(input.S),
          Number(input.H),
          Number(input['\\mu']),
          Number(input.d),
          Number(input.Y)
        ).toFixed(3)

        return {
          raw: `泄量=${discharge}`,
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
