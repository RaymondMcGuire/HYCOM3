<template>
  <div>
    <hycom-form
      :definition="definition"
      :state="formState"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Chapter7 } from '@/hycom_lib/chapter7'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createCalculationState,
  DemoCase,
  FieldSchema
} from '@/shared/calculations'

const fields: FieldSchema[] = [
  { key: 'v', latex: 'v', type: 'number' },
  { key: 'n_j', latex: 'n_j', type: 'text', placeholder: '以逗号分隔' },
  { key: '\\xi_j', latex: '\\xi_j', type: 'text', placeholder: '以逗号分隔' },
  { key: 'h_y', latex: 'h_y', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    v: 1.0,
    n_j: '1,1,800,270,800,270,1',
    '\\xi_j': '0.5,8,0.022,0.99,0.183,0.07,1',
    h_y: 365.8
  },
  description: '某供水工程,管道长135km,设计流量为0.07m^3/s,经济流速1.0m/s,经济管径0.3m,计算管道沿程水头损失.',
  expectedResult: '求得管道沿程水头损失为23.45'
}

const formulas = {
  0: 'Q :管道设计流量,m^3/s',
  1: '\\zeta_j :管道局部水头损失系数,取值见表9.3-1',
  2: 'n :管道局部水头损失系数的个数',
  3: '\\upsilon :管道断面水流平均流速,m/s',
  4: 'h_j :管道局部水头损失,m',
  5: 'h_y :管道沿程水头损失,m'
}

function parseNumberList(raw: string): number[] {
  return raw
    .split(',')
    .map((item) => parseFloat(item.trim()))
    .filter((item) => !Number.isNaN(item))
}

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter9Section3 extends Vue {
  public formState = createCalculationState(fields)

  public definition: CalculationDefinition = {
    title: '8.5 管（渠）道局部水头损失',
    fields,
    formulas,
    demoCase,
    execute: ({ input }) => {
      const nj = parseNumberList(String(input.n_j || ''))
      const xij = parseNumberList(String(input['\\xi_j'] || ''))
      const values = Chapter7.gdjbss(Number(input.v), nj, xij, Number(input.h_y))
      return '管道沿程水头损失=' + values[0].toFixed(2).toString()
    }
  }
}
</script>
