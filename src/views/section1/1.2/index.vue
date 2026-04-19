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
import { syyType } from '@/hycom_lib/common'
import TablePane from './components/TablePane.vue'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createCalculationState,
  DerivedFieldRule,
  DemoCase,
  FieldSchema,
  ResultSchema
} from '@/shared/calculations'

type SurfaceLineSectionResult = {
  index: number;
  depth: string;
  text: string;
}

type SurfaceLineResult = {
  raw: string;
  sections: SurfaceLineSectionResult[];
}

const fields: FieldSchema[] = [
  { key: '实用堰类型', latex: '实用堰类型', type: 'select' },
  { key: '水流边壁类型', latex: '水流边壁类型', type: 'select' },
  { key: 'Q_c', latex: 'Q_c', type: 'number' },
  { key: 'b_c', latex: 'b_c', type: 'number' },
  { key: 'n_z', latex: 'n_z', type: 'number' },
  { key: 'i', latex: 'i', type: 'number' },
  { key: '\\phi', latex: '\\phi', type: 'number' },
  { key: 'H_0', latex: 'H_0', type: 'number' },
  { key: 'N', latex: 'N', type: 'number' },
  { key: 'L', latex: 'L', type: 'number' },
  { key: '\\alpha', latex: '\\alpha', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    实用堰类型: syyType.syy,
    水流边壁类型: '',
    Q_c: 7300,
    b_c: 25,
    n_z: 0.014,
    i: 0.1,
    '\\phi': 0.95,
    H_0: 34.5449,
    N: 5,
    L: 615.34,
    '\\alpha': 1.05
  },
  description: '某国外(马来西亚巴贡)水电站工程,溢洪道为实用堰,弧形闸门控制,4孔闸,单孔净宽15m,引渠底板高程202m,堰前行近流速为2.6m,PMF洪水下,水库水位233m,堰顶高程209m,下泄流量14600m3/s,泄槽起始底板高程198.80m,2 个泄槽,单个泄槽宽度25m,泄槽长度615.34m,底坡为0.1,计算PMF洪水下泄槽的净水深、掺气水深.',
  expectedResult: 'h1=16.153|h2=11.167|h3=9.438|h4=8.443|h5=7.782|'
}

const formulas = {
  0: 'Q_c :单个泄槽流量,m^3/s',
  1: 'n_z :糙率',
  2: 'b_c :单个泄槽宽,m',
  3: 'i :泄槽底坡',
  4: '\\phi :流速系数,一般0.95',
  5: 'g :重力加速度,m/s^2,取9.8',
  6: '\\theta :泄槽底板与水面夹角',
  7: 'L :泄槽长,m',
  8: '\\varsigma :掺气水深系数,缺范围取1.0\\sim 1.4, 取1.3',
  9: 'N :计算断面个数',
  10: '\\alpha :流速的动力系数'
}

const resultSchema: ResultSchema<SurfaceLineResult> = {
  lists: [
    {
      key: 'sections',
      label: '断面水深',
      itemLabel: (item) => `h${(item as SurfaceLineSectionResult).index}`,
      itemValue: (item) => (item as SurfaceLineSectionResult).text
    }
  ]
}

const derivedFields: Array<DerivedFieldRule<Record<string, any>>> = [
  {
    deps: ['水流边壁类型'],
    targets: ['n_z'],
    apply: (state) => {
      const roughness = state['水流边壁类型']
      return {
        n_z: roughness !== undefined && roughness !== null && roughness !== ''
          ? Number(roughness)
          : state.n_z
      }
    }
  }
]

function buildSurfaceLineResult(values: string[]): SurfaceLineResult {
  const sections = values.map((value, index) => ({
    index: index + 1,
    depth: value,
    text: `h${index + 1}=${value}`
  }))

  return {
    raw: sections.map((section) => `${section.text}|`).join(''),
    sections
  }
}

export default defineComponent({
  name: 'Section12Calculator',
  components: {
    HycomForm,
    TablePane
  },
  data() {
    return {
      formState: createCalculationState(fields),
      tableOptions: [
        { label: '表:水力计算中常用的糙率n值表', key: 't1' }
      ],
      activeTableName: 't1',
      definition: {
        title: '1.2 泄槽水面线计算',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        derivedFields,
        execute: ({ input }) => {
          const values = Chapter1.slotSurfaceLine(
            Number(input.实用堰类型),
            Number(input.Q_c),
            Number(input.b_c),
            Number(input.n_z),
            Number(input.i),
            Number(input['\\phi']),
            Number(input.H_0),
            Number(input.N),
            Number(input.L),
            Number(input['\\alpha'])
          )

          return buildSurfaceLineResult(values)
        },
        formatResult: (result: SurfaceLineResult) => result.raw
      } as CalculationDefinition<Record<string, any>, SurfaceLineResult>
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
