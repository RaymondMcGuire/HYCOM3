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

type TrajectoryResult = {
  raw: string;
  distance: string;
  scourDepth: string;
}

const fields: FieldSchema[] = [
  { key: '可冲类别', latex: '可冲类别', type: 'select' },
  { key: 'h', latex: 'h', type: 'number' },
  { key: '\\theta', latex: '\\theta', type: 'number' },
  { key: 'H_0', latex: 'H_0', type: 'number' },
  { key: 'h_2', latex: 'h_2', type: 'number' },
  { key: 'K', latex: 'K', type: 'number' },
  { key: 'q', latex: 'q', type: 'number' },
  { key: 'H', latex: 'H', type: 'number' },
  { key: 't^{\\prime}', latex: 't^{\\prime}', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    h: 7.781,
    '\\theta': 15,
    H_0: 134.879,
    h_2: 42.466,
    q: 14600 / 50,
    H: 177,
    't^{\\prime}': 19,
    可冲类别: 1.4,
    K: 1.4
  },
  description: '某水电站工程,溢流堰为实用堰,弧形闸门控制,堰前行近流速为2.6m,PMF 洪水下,水库水位233m,下泄流量14600m3/s,鼻坎宽50m,鼻坎坎顶高程98.466m,下游水位56m,下游河床高程37m,鼻坎挑角15º.下游河床为砂岩和砂岩页岩互层,砂岩块度0.3 x 0.5 x 0.8m3,砂岩页岩互层块度0.1 x 0.3 x 0.4m3,抗冲流速4m/s 左右.计算PMF洪水下挑距和冲坑深度.',
  expectedResult: '挑距:333.65|冲坑深度:68.26'
}

const formulas = {
  0: 'L :自挑流鼻坎坎顶算起的挑流水舌外缘与下游水面后与河床面交点的水平距离,m',
  1: '\\theta :挑流鼻坎挑角',
  2: 'h :坎顶法向的平均水深,m',
  3: 'h_1 :挑流鼻坎坎顶铅直方向水深,m',
  4: 'h_2 :鼻坎坎顶至下游水面高差,m,如计算冲刷坑最深点距鼻坎的距离,该值可采用坎顶距冲坑最深点高程差',
  5: 'v_1 :鼻坎坎顶水面流速,m/s',
  6: '\\phi :流速系数,可取0.95',
  7: 'H_0 :鼻坎顶水头,m,鼻坎末端的水深可近似利用泄槽末端断面水深,按推算泄槽段水面线方法求出,单宽流量除以该水深,可得鼻坎断面平均流速',
  8: 'H :上、下游水面差,m',
  9: '\\beta :水舌外缘与下游水面夹角,挑射水流挑射角可近似用鼻坎挑角代替',
  10: 'L_c :水面以下水舌长度的水平投影计算',
  11: 't^{\\prime} :下游水深,m',
  12: 't :下游水面至坑底的最大水垫深度,m',
  13: 'T :冲坑深度,由河床底面至坑低,m',
  14: 'K :基岩冲刷系数'
}

const resultSchema = createAssignmentResultSchema<TrajectoryResult>([
  { key: 'distance', label: 'L', latex: 'L' },
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
  name: 'Section531Calculator',
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
        title: '5.3.1 挑流水舌外缘挑距及冲坑深度',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        derivedFields,
        execute: ({ input }) => {
          const value = Chapter6.tljs(
            Number(input.h),
            (Number(input['\\theta']) * Math.PI) / 180,
            Number(input.H_0),
            Number(input.h_2),
            Number(input.K),
            Number(input.q),
            Number(input.H),
            Number(input['t^{\\prime}'])
          )

          const distance = value[0].toFixed(2)
          const scourDepth = value[1].toFixed(2)

          return {
            raw: `挑距:${distance}|冲坑深度:${scourDepth}`,
            distance,
            scourDepth
          }
        },
        formatResult: (result: TrajectoryResult) => result.raw
      } as CalculationDefinition<Record<string, any>, TrajectoryResult>
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
