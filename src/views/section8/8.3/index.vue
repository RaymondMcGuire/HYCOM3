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
  { key: 'd_j', latex: 'd_j', type: 'number' },
  { key: 'n_z', latex: 'n_z', type: 'number' },
  { key: '\\upsilon', latex: '\\upsilon', type: 'number' },
  { key: 'l', latex: 'l', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    d_j: 0.3,
    n_z: 0.009,
    '\\upsilon': 1.0,
    l: 135000
  },
  description: '某供水工程,管道长135km,设计流量为0.07m^3/s,经济流速1.0m/s,经济管径0.3m,计算管道沿程水头损失.',
  expectedResult: '求得管道沿程水头损失为345.73'
}

const formulas = {
  0: 'Q :流量,m^3/s',
  1: 'l :管道计算长度',
  2: 'n_z :糙率,0.014',
  3: 'd_j :管道计算内径,m',
  4: '\\upsilon :管道断面水流平均流速,m/s',
  5: 'h_y :管道沿程水头损失,m'
}

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter9Section22 extends Vue {
  public formState = createCalculationState(fields)

  public definition: CalculationDefinition = {
    title: '8.3 混凝土管（渠）及水泥砂浆内衬的金属管道沿程水头损失',
    fields,
    formulas,
    demoCase,
    execute: ({ input }) => {
      const values = Chapter7.hntgjsgd(
        Number(input.d_j),
        Number(input.n_z),
        Number(input['\\upsilon']),
        Number(input.l)
      )
      return '管道沿程水头损失=' + values[0].toFixed(2).toString()
    }
  }
}
</script>
