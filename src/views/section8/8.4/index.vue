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
  { key: 'Q', latex: 'Q', type: 'number' },
  { key: 'd_j', latex: 'd_j', type: 'number' },
  { key: 'C_h', latex: 'C_h', type: 'number' },
  { key: 'l', latex: 'l', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    Q: 0.07,
    d_j: 0.3,
    C_h: 145,
    l: 135000
  },
  description: '某供水工程,管道长135km,设计流量为0.07m^3/s,经济流速1.0m/s,经济管径0.3m,计算管道沿程水头损失.',
  expectedResult: '求得管道沿程水头损失为365.75'
}

const formulas = {
  0: 'Q :管道设计流量,m^3/s',
  1: 'l :管道计算长度',
  2: 'd_j :管道计算内径,m',
  4: 'C_h : 海曾—威廉系数Hazen Wiliams,水泥砂浆内衬的钢管铸铁管取120 \\sim 130、涂料内衬的钢管铸铁管取130 \\sim 140',
  5: '未做内衬的钢管铸铁管取90 \\sim 100、预应力钢筒混凝土管(PCCP)取120 \\sim 140、化学管材(聚氯乙烯管及玻璃钢管)取140 \\sim 150',
  3: 'h_y :管道沿程水头损失,m'
}

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter9Section23 extends Vue {
  public formState = createCalculationState(fields)

  public definition: CalculationDefinition = {
    title: '8.4 输配水管道和配水管网水力平差计算',
    fields,
    formulas,
    demoCase,
    execute: ({ input }) => {
      const values = Chapter7.spsgd(
        Number(input.Q),
        Number(input.d_j),
        Number(input.C_h),
        Number(input.l)
      )
      return '管道沿程水头损失=' + values[0].toFixed(2).toString()
    }
  }
}
</script>
