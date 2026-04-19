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
import { shapeType } from '@/hycom_lib/common'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createAssignmentResultSchema,
  createCalculationState,
  DemoCase,
  FieldSchema
} from '@/shared/calculations'

type UniformFlowResult = {
  raw: string;
  depth: string;
  velocity: string;
}

const fields: FieldSchema[] = [
  { key: '断面形状', latex: '断面形状', type: 'select' },
  { key: 'b', latex: 'b', type: 'number' },
  { key: 'i', latex: 'i', type: 'number' },
  { key: 'n_z', latex: 'n_z', type: 'number' },
  { key: 'Q', latex: 'Q', type: 'number' },
  { key: 'm', latex: 'm', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    断面形状: shapeType.RECTANGLE,
    b: 2,
    i: 0.002,
    n_z: 0.015,
    Q: 10,
    m: 1.25
  },
  description: '某灌溉渠道设计流量10m3/s,砼衬砌,糙率为0.015,初拟底坡0.002,初拟断面矩形,底宽为2m,求断面水深及流速.如果初拟断面为梯形,边坡系数1.25,求水深及流速.',
  expectedResult: '水深:2.16|流速:2.31'
}

const formulas = {
  0: 'Q :流量,m^3/s',
  1: 'A :渠道过流断面面积,m^2',
  2: 'x :湿周,m',
  3: 'R :水力半径,m',
  4: 'B :梯形渠道水面宽度,m',
  5: 'b :梯形渠道底部宽度或矩形断面宽度,m',
  6: 'm :边坡系数',
  7: 'h :水深,m',
  8: 'n_z :糙率',
  9: 'i :泄槽底坡'
}

const resultSchema = createAssignmentResultSchema<UniformFlowResult>([
  { key: 'depth', label: 'h', latex: 'h' },
  { key: 'velocity', label: 'v', latex: 'v' }
])

export default defineComponent({
  name: 'Section61Calculator',
  components: {
    HycomForm
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, UniformFlowResult> = {
      title: '6.1 渠道均匀流水力计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      execute: ({ input }) => {
        const values = Chapter5.mqjyls(
          Number(input.断面形状),
          Number(input.b),
          Number(input.i),
          Number(input.n_z),
          Number(input.Q),
          Number(input.m)
        )

        const depth = values[0].toFixed(2)
        const velocity = values[1].toFixed(2)

        return {
          raw: `水深:${depth}|流速:${velocity}`,
          depth,
          velocity
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
