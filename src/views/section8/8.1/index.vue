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
  { key: 'h_y', latex: 'h_y', type: 'number' },
  { key: 'h_j', latex: 'h_j', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    h_y: 365.8,
    h_j: 36.58
  },
  description: '某供水工程,管道长135km,设计流量为0.07m^3/s,经济流速1.0m/s,经济管径0.3m,计算管道沿程水头损失.',
  expectedResult: '求得管道沿程水头损失为402.38'
}

const formulas = {
  2: 'Q :管道设计流量,m^3/s',
  3: 'h_y :管(渠)道沿程水头损失,m',
  4: 'h_j :管(渠)道局部水头损失,m'
}

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter9Section12 extends Vue {
  public formState = createCalculationState(fields)

  public definition: CalculationDefinition = {
    title: '8.1 管（渠）道总水头损失',
    fields,
    formulas,
    demoCase,
    execute: ({ input }) => {
      const value = Chapter7.gdzstss(Number(input.h_y), Number(input.h_j))
      return '管道沿程水头损失=' + value.toFixed(2).toString()
    }
  }
}
</script>
