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
  createCalculationState,
  DemoCase,
  FieldSchema,
  ResultSchema
} from '@/shared/calculations'

type BasinScenario = {
  label: string;
  text: string;
  length?: string;
  froude?: string;
  h1?: string;
  h2?: string;
}

type BasinLengthResult = {
  raw: string;
  sections: BasinScenario[];
}

const fields: FieldSchema[] = [
  { key: 'E', latex: 'E', type: 'number' },
  { key: 'Q', latex: 'Q', type: 'number' },
  { key: 'b', latex: 'b', type: 'number' },
  { key: 'H_0', latex: 'H_0', type: 'number' },
  { key: '\\phi', latex: '\\phi', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    E: 82.4,
    Q: 2253,
    b: 15,
    H_0: 83.216,
    '\\phi': 0.8
  },
  description: '某水电工程,水流沿溢流堰进入消力池,消力池进口宽15m,底板高程1778m,水库校核水位为1860.4m,泄量为2253m3/s,下游水位1793.87m,计算水跃长度.',
  expectedResult: '不设辅助消能工:L=165.00, Fr=4.58, h1=4.79, h2=28.70; 不设消力墩,设梳流坎和尾坎:L=107.63, Fr=4.58, h1=4.79, h2=28.70; '
}

const formulas = {
  0: 'L :护坦长度,m',
  1: 'h_1 :跃前共轭水深,m',
  2: 'h_2 :跃后共轭水深,m',
  3: 'F_{r1} :跃前断面佛劳德数',
  4: 'Q :流量,m^3/s',
  5: 'H_0 :计入上游水流行进流速v_0,以下游收缩断面处为基准面上游的水头,m',
  6: 'E :以下游收缩断面处为基准面的泄水建筑物的水头(不计入上游水流行进流速v_0),m',
  7: 'v_1 :跃前断面流速,m/s',
  8: 'b :消力池宽度,m',
  9: '\\phi :流速系数',
  10: '低坝 : 实用堰 (\\phi=0.9 \\sim 0.95); 实用堰闸孔 (\\phi=0.85 \\sim 0.95); 宽顶堰 (\\phi=0.8 \\sim 0.9); 宽顶堰闸孔 (\\phi=0.75 \\sim 0.85)',
  11: '高坝 : \\phi=\\sqrt{1-0.1 \\frac{E^{1/2}}{(Q/b)^{1/3}} } '
}

const resultSchema: ResultSchema<BasinLengthResult> = {
  lists: [
    {
      key: 'sections',
      label: '方案结果',
      itemLabel: (item) => (item as BasinScenario).label,
      itemValue: (item) => (item as BasinScenario).text
    }
  ]
}

function parseBasinScenarios(raw: string): BasinLengthResult {
  const sections = raw
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const separatorIndex = item.indexOf(':')
      const label = separatorIndex >= 0 ? item.slice(0, separatorIndex).trim() : item
      const detail = separatorIndex >= 0 ? item.slice(separatorIndex + 1).trim() : item

      const matches = detail.matchAll(/([A-Za-z0-9_{}]+)=([^,]+)/g)
      const parsed: Record<string, string> = {}
      for (const match of matches) {
        parsed[match[1]] = match[2].trim()
      }

      return {
        label,
        text: detail,
        length: parsed.L,
        froude: parsed.Fr,
        h1: parsed.h1,
        h2: parsed.h2
      }
    })

  return {
    raw,
    sections
  }
}

export default defineComponent({
  name: 'Section55Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '5.5 溢流坝消力池护坦长度计算',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const raw = Chapter6.ylbxlcht(
            Number(input.H_0),
            Number(input.Q),
            Number(input.b),
            Number(input['\\phi'])
          )

          return parseBasinScenarios(raw)
        },
        formatResult: (result: BasinLengthResult) => result.raw
      } as CalculationDefinition<Record<string, any>, BasinLengthResult>
    }
  }
})
</script>
