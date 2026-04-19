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
import { Chapter7 } from '@/hycom_lib/chapter7'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createCalculationState,
  DemoCase,
  FieldSchema
} from '@/shared/calculations'

const fields: FieldSchema[] = [
  { key: '\\upsilon', latex: '\\upsilon', type: 'number' },
  { key: 'd_j', latex: 'd_j', type: 'number' },
  { key: 'v', latex: 'v', type: 'number' },
  { key: 'l', latex: 'l', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    '\\upsilon': 1.0,
    d_j: 0.3,
    v: 1.31e-6,
    l: 135000
  },
  description: '某供水工程,管道长135km,设计流量为0.07m^3/s,经济流速1.0m/s,经济管径0.3m,计算管道沿程水头损失.',
  expectedResult: '求得管道沿程水头损失为352.83'
}

const formulas = {
  0: 'Q :流量,m^3/s',
  1: 'l :管道计算长度',
  3: 'd_j :管道计算内径,m',
  4: '\\upsilon :管道断面水流平均流速,m/s',
  5: 'v :运动粘滞系数、1.31 x 10^{-2}cm^2/s',
  6: 'h_y :管道沿程水头损失,m'
}

export default defineComponent({
  name: 'Section82Calculator',
  components: {
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      definition: {
        title: '8.2 塑料管管（渠）道沿程水头损失',
        fields,
        formulas,
        demoCase,
        execute: ({ input }) => {
          const value = Chapter7.slgdyctss(
            Number(input['\\upsilon']),
            Number(input.d_j),
            Number(input.v),
            Number(input.l)
          )
          return `管道沿程水头损失=${value.toFixed(2)}`
        }
      } as CalculationDefinition
    }
  }
})
</script>
