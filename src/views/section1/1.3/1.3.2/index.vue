<template>
  <div>
    <hycom-form
      :definition="definition"
      :state="formState"
      @beforeOnDemo="beforeOnDemo"
      @beforeOnReset="beforeOnReset"
    >
      <template #table_fir_anchor>
        <div class="section-slot-stack">
          <el-tabs
            v-model="activeTableName"
            style="margin-top: 15px"
            type="border-card"
          >
            <el-tab-pane
              v-for="item in tableOptions"
              :key="item.key"
              :label="item.label"
              :name="item.key"
            >
              <keep-alive>
                <table-pane
                  v-if="activeTableName === item.key"
                  :type="item.key"
                />
              </keep-alive>
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>
    </hycom-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Chapter1 } from '@/hycom_lib/chapter1'
import HycomForm from '@/components/HycomForm/index.vue'
import TablePane from './components/TablePane.vue'
import {
  CalculationDefinition,
  createCalculationState,
  DerivedFieldRule,
  DemoCase,
  FieldSchema,
  ResultSchema
} from '@/shared/calculations'

type ScourDepthResult = {
  raw: string;
  depth: string;
}

const fields: FieldSchema[] = [
  { key: '可冲类别', label: '可冲类别', type: 'select' },
  { key: 'K', latex: 'K', type: 'number', readonly: true },
  { key: 'H_{up}', latex: 'H_{up}', type: 'number' },
  { key: 'H_{down}', latex: 'H_{down}', type: 'number' },
  { key: 'Q', latex: 'Q', type: 'number' },
  { key: 'b', latex: 'b', type: 'number' },
  { key: 't^{\\prime}', latex: 't^{\\prime}', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    'H_{up}': 233,
    'H_{down}': 69,
    可冲类别: 1.4,
    K: 1.4,
    Q: 14600,
    b: 50,
    't^{\\prime}': 32
  },
  description: '某国外水电站工程,溢洪道为实用堰,泄槽净宽50m,PMF洪水下,水库水位233m,下泄流量14600m3/s,鼻坎坎顶高程98.466m,下游水位69m,下游河床高程37m,下游河床为砂岩和砂岩页岩互层,砂岩块度0.3 x 0.5 x 0.8m3,砂岩页岩互层块度0.1 x 0.3 x 0.4m3,抗冲流速4m/s 左右,求冲坑深度.',
  expectedResult: '求得冲坑深度53.61'
}

const formulas = {
  0: 'K :综合冲刷系数',
  1: 'Q :流量,m^3/s',
  2: 'b :鼻坎宽度,m',
  3: 't^{\\prime} :下游水深,m',
  4: 'H_{up} :上游水面高程,m',
  5: 'H_{down} :下游水面高程,m',
  6: 'H :上下游水面差,m'
}

const resultSchema: ResultSchema<ScourDepthResult> = {
  summary: [
    { key: 'depth', label: 'depth', latex: 'T' }
  ]
}

const derivedFields: Array<DerivedFieldRule<Record<string, any>>> = [
  {
    deps: ['可冲类别'],
    targets: ['K'],
    apply: (state) => {
      const value = state['可冲类别']
      return {
        K: value === undefined || value === '' ? undefined : Number(value)
      }
    }
  }
]

export default defineComponent({
  name: 'Section132Calculator',
  components: {
    TablePane,
    HycomForm
  },
  data() {
    return {
      formState: createCalculationState(fields),
      tableOptions: [
        { label: '表:岩基冲刷系数k值', key: 't1' }
      ],
      activeTableName: 't1',
      definition: {
        title: '1.3.2 冲刷坑最大水垫深度',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        derivedFields,
        execute: ({ input }) => {
          const depth = Chapter1.ckjs(
            Number(input['H_{up}']),
            Number(input['H_{down}']),
            Number(input.K),
            Number(input.Q),
            Number(input.b),
            Number(input['t^{\\prime}'])
          ).toFixed(2)

          return {
            raw: `冲坑深度=${depth}`,
            depth
          }
        },
        formatResult: (result: ScourDepthResult) => result.raw
      } as CalculationDefinition<Record<string, any>, ScourDepthResult>
    }
  },
  methods: {
    beforeOnDemo() {
      this.activeTableName = 't1'
    },
    beforeOnReset() {
      this.activeTableName = 't1'
    }
  }
})
</script>
