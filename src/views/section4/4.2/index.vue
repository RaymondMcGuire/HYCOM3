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

type VortexSpillwayResult = {
  raw: string;
  discharge: string;
}

const fields: FieldSchema[] = [
  { key: '\\mu', latex: '\\mu', type: 'number' },
  { key: 'd', latex: 'd', type: 'number' },
  { key: 'H', latex: 'H', type: 'number' },
  { key: '\\delta', latex: '\\delta', type: 'number' },
  { key: 'v_0', latex: 'v_0', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    '\\mu': 0.85,
    d: 9,
    H: 19,
    '\\delta': 0.45,
    v_0: 0
  },
  description: '黄河某水电站工程主要任务是发电,兼顾下游灌溉及供水.水库正常蓄水位2005.0m,校核水位2008.0m,总库容为6.2 亿m3,电站总装机容量为1500MW.右岸泄洪洞为由导流洞改建而成的水平旋流消能泄洪洞型式.开敞式进水口位于电站引渠前沿右侧,堰顶高程1989.0m,为一孔12 m x 16 m 的孔口,设平板事故检修闸门和平板工作闸门各一扇,由2 x 1250kN固定式启闭机操作.堰闸后接直径9.0m 竖井,竖井掺气坎喉口断面控制各缩窄0.75m,高程1967m,竖井高度为46.615m,其下通过高度为27.75m的水平旋流发生装置与长45.5m、直径10.50m 的水平旋流洞相接.水平旋流洞后为长60.0m 的水垫塘消能段,其后即为与原导流洞结合的退水洞段,结合段长740.246m,末端为挑流消能鼻坎.',
  expectedResult: '泄量=1055.800'
}

const formulas = {
  0: 'Q :流量,m^3/s',
  1: 'H :堰顶水头,m',
  2: 'd :竖井直径,m',
  3: '\\upsilon_0 :堰前行近流速,m/s',
  4: '\\mu :流量系数,一般取0.85',
  5: '\\delta :竖井和涡室连接处的棱角以半径\\delta=(0.1 \\sim 0.2)d/2予以修圆,m'
}

const resultSchema = createAssignmentResultSchema<VortexSpillwayResult>([
  { key: 'discharge', label: 'Q', latex: 'Q' }
])

export default defineComponent({
  name: 'Section42Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, VortexSpillwayResult> = {
      title: '4.2 涡流竖井泄洪洞',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const discharge = Chapter3.wlsxlnl(
          Number(input['\\mu']),
          Number(input.d),
          Number(input.H),
          Number(input['\\delta']),
          Number(input.v_0)
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
