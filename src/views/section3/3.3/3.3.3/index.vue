<template>
  <div>
    <hycom-form
      :definition="definition"
      :state="formState"
      @beforeOnDemo="resetTable"
      @beforeOnReset="resetTable"
    >
      <template #table_sec_anchor>
        <div class="section-slot-stack">
          <h3 class="section-slot-note">表格插值自动计算:</h3>
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
import { Chapter4 } from '@/hycom_lib/chapter4'
import { Table2DLerp } from '@/hycom_lib/common'
import HycomForm from '@/components/HycomForm/index.vue'
import TablePane from './components/TablePane.vue'
import {
  CalculationDefinition,
  createAssignmentResultSchema,
  createCalculationState,
  DemoCase,
  DerivedFieldRule,
  FieldSchema
} from '@/shared/calculations'

type TypicalShortPipeResult = {
  raw: string;
  discharge: string;
  velocity: string;
  '\\mu': string;
  '\\varepsilon': string;
}

const fields: FieldSchema[] = [
  { key: 'S_2', latex: 'S_2', type: 'number' },
  { key: 'e', latex: 'e', type: 'number' },
  { key: 'B', latex: 'B', type: 'number' },
  { key: 'H', latex: 'H', type: 'number' },
  { key: '\\varepsilon', latex: '\\varepsilon', type: 'number', readonly: true },
  { key: '\\mu', latex: '\\mu', type: 'number', readonly: true }
]

const demoCase: DemoCase = {
  values: {
    S_2: 4.3,
    e: 11,
    B: 8,
    H: 56.4
  },
  description: '国内某水电站,水库校核水位1860.4m,正常蓄水位1856m,汛限水位1854m,中孔泄洪洞进水口为宜有压短管,有压短管出口底板高程1804m,工作闸门尺寸8m x 11m,工作门前压坡1:4.3,检修门前顶部椭圆曲线x2/13.62+y2/4.52=1,求校核洪水时中孔泄洪洞的泄量。',
  expectedResult: '流量:2304.20|出口断面流速:29.07'
}

const formulas = {
  0: '\\mu :流量系数',
  1: '\\varepsilon :有压短管出口的工作闸门垂直收缩系数,查表4.3-3得到',
  2: 'e :计算断面处的大气压力水柱高,m',
  3: 'B :水的汽化压力水柱高,m',
  4: 'h_1 :闸门全开孔口高度,m',
  5: '\\phi :流速系数,一般取0.97'
}

const table433S2 = [4, 5, 6]
const table433Vertical = [0]
const table433epsilon = [[0.895, 0.914, 0.918]]
const table433Mu = [[0.862, 0.88, 0.884]]

function deriveShortPipeFactors(s2: number | undefined) {
  if (!Number.isFinite(s2)) {
    return {
      mu: undefined,
      epsilon: undefined
    }
  }

  const tableLerpepsilon = new Table2DLerp()
  const tableLerpMu = new Table2DLerp()

  return {
    mu: tableLerpMu.arr(
      table433Vertical,
      table433S2,
      table433Mu,
      0,
      Number(s2)
    ),
    epsilon: tableLerpepsilon.arr(
      table433Vertical,
      table433S2,
      table433epsilon,
      0,
      Number(s2)
    )
  }
}

const derivedFields: Array<DerivedFieldRule<Record<string, any>>> = [
  {
    deps: ['S_2'],
    targets: ['\\mu', '\\varepsilon'],
    apply: (state) => {
      const derived = deriveShortPipeFactors(Number(state.S_2))
      return {
        '\\mu': derived.mu,
        '\\varepsilon': derived.epsilon
      }
    }
  }
]

const resultSchema = createAssignmentResultSchema<TypicalShortPipeResult>([
  { key: 'discharge', label: 'Q', latex: 'Q' },
  { key: 'velocity', label: 'v', latex: 'v' },
  { key: '\\mu', label: '\\mu', latex: '\\mu' },
  { key: '\\varepsilon', label: '\\varepsilon', latex: '\\varepsilon' }
])

export default defineComponent({
  name: 'Section333Calculator',
  components: {
    HycomForm,
    TablePane
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, TypicalShortPipeResult> = {
      title: '3.3.3典型有压短管泄流能力计算',
      fields,
      formulas,
      result: resultSchema,
      demoCase,
      derivedFields,
      execute: ({ input }) => {
        const derived = deriveShortPipeFactors(Number(input.S_2))
        const mu = Number(input['\\mu'] ?? derived.mu)
        const epsilon = Number(input['\\varepsilon'] ?? derived.epsilon)
        const values = Chapter4.dxyydgll(
          Number(input.B),
          Number(input.e),
          Number(input.H),
          mu,
          epsilon
        )

        const discharge = values[0].toFixed(2)
        const velocity = values[1].toFixed(2)

        return {
          raw: `流量:${discharge}|出口断面流速:${velocity}`,
          discharge,
          velocity,
          '\\mu': mu.toFixed(3),
          '\\varepsilon': epsilon.toFixed(3)
        }
      },
      formatResult: (result) => result.raw
    }

    return {
      formState,
      definition,
      activeTableName: 't1',
      tableOptions: [
        { label: '表4.3-3典型有压短管弧门全开时的ε、φ值', key: 't1' }
      ]
    }
  },
  methods: {
    resetTable() {
      this.activeTableName = 't1'
    }
  }
})
</script>
