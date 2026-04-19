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
import { Chapter6 } from '@/hycom_lib/chapter6'
import HycomForm from '@/components/HycomForm/index.vue'
import TablePane from './components/TablePane.vue'
import {
  CalculationDefinition,
  createAssignmentResultSchema,
  createCalculationState,
  DerivedFieldRule,
  DemoCase,
  FieldSchema
} from '@/shared/calculations'

type ConcentratedFlowScourResult = {
  raw: string;
  scourDepth: string;
}

const fields: FieldSchema[] = [
  { key: '可冲类别', latex: '可冲类别', type: 'select' },
  { key: 'R', latex: 'R', type: 'number' },
  { key: 'L', latex: 'L', type: 'number' },
  { key: 'H_{\\text{上}}', latex: 'H_{\\text{上}}', type: 'number' },
  { key: 'H_{\\text{下}}', latex: 'H_{\\text{下}}', type: 'number' },
  { key: 'K', latex: 'K', type: 'number' },
  { key: 'Q', latex: 'Q', type: 'number' },
  { key: 'b', latex: 'b', type: 'number' },
  { key: 't^{\\prime}', latex: 't^{\\prime}', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    可冲类别: 1.4,
    R: 214.1,
    L: 80.76,
    'H_{\\text{上}}': 2457,
    'H_{\\text{下}}': 2272.42,
    K: 1.4,
    Q: 1320,
    b: 13,
    't^{\\prime}': 57.92
  },
  description: '黄河某水电站混凝土拱坝，中孔鼻坎为挑流，中表孔鼻坎高程2434.62m，河床高程2214.5m，鼻坎末端算起拱坝半径214.1m，校核情况下单孔泄量均为1320m3/s，中孔过流宽度均为13m，计算中孔挑流冲坑深度。',
  expectedResult: '冲坑深度:25.57'
}

const formulas = {
  0: 'Q :流量，m^3/s',
  1: 'b :鼻坎宽度，m',
  2: 't :自下游水面至坑底最大水垫深度，m',
  3: 'H_{\\text{上}} :上游水面高程，m',
  4: 'H_{\\text{下}} :下游水面高程，m',
  5: 't^{\\prime} :下游水深，m',
  6: 'T :冲坑深度，由河床底面至坑低，m',
  7: 'R :鼻坎末端算起拱坝半径，m',
  8: 'L :鼻坎末端算起挑距，m',
  9: 'C_q :考虑水流向心集中影响的拱坝流量向心集中系数'
}

const resultSchema = createAssignmentResultSchema<ConcentratedFlowScourResult>([
  { key: 'scourDepth', label: 'T', latex: 'T' }
])

const derivedFields: Array<DerivedFieldRule<Record<string, any>>> = [
  {
    deps: ['可冲类别'],
    targets: ['K'],
    apply: (state) => {
      const value = state['可冲类别']
      return {
        K: value !== undefined && value !== null && value !== '' ? Number(value) : state.K
      }
    }
  }
]

export default defineComponent({
  name: 'Section532Calculator',
  components: {
    HycomForm,
    TablePane
  },
  data() {
    return {
      formState: createCalculationState(fields),
      activeTableName: 't1',
      tableOptions: [
        { label: '表:基岩冲刷系数', key: 't1' }
      ],
      definition: {
        title: '5.3.2 拱坝水流向心集中影响挑流冲刷坑深度',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        derivedFields,
        execute: ({ input }) => {
          const scourDepth = Chapter6.gbslxxjzyx_tlcsksd(
            Number(input.R),
            Number(input.L),
            Number(input['H_{\\text{上}}']),
            Number(input['H_{\\text{下}}']),
            Number(input.K),
            Number(input.Q),
            Number(input.b),
            Number(input['t^{\\prime}'])
          ).toFixed(2)

          return {
            raw: `冲坑深度:${scourDepth}`,
            scourDepth
          }
        },
        formatResult: (result: ConcentratedFlowScourResult) => result.raw
      } as CalculationDefinition<Record<string, any>, ConcentratedFlowScourResult>
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
