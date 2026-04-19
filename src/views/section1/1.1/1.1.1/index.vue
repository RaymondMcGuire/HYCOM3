<template>
  <div class="app-container">
    <hycom-form
      :definition="definition"
      :state="formState"
      @beforeOnDemo="beforeOnDemo"
      @beforeOnReset="beforeOnReset"
    >
      <template #table_sec_anchor>
        <div class="section-slot-stack lookup-slot">
          <h3 class="section-slot-note">表格计算:</h3>

          <div class="lookup-grid">
            <div class="lookup-grid__label">
              <math-jax :latex="'上游坝面坡度比 \\Delta y / \\Delta x'" />
            </div>
            <div class="lookup-grid__value">
              <el-select
                v-model="formState.__slope"
                placeholder="请选择上游坝面坡度比"
                style="width: 100%;"
              >
                <el-option
                  v-for="option in slopePropOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </div>
          </div>

          <div id="data-table" class="table-section">
            <el-tabs
              v-model="activeTableName"
              style="margin-top: 15px"
              type="border-card"
            >
              <el-tab-pane
                v-for="item in tabOptions"
                :key="item.key"
                :label="item.label"
                :name="item.key"
              >
                <keep-alive>
                  <tab-pane
                    v-if="activeTableName === item.key"
                    :type="item.key"
                  />
                </keep-alive>
              </el-tab-pane>
            </el-tabs>

            <div class="result-grid">
              <div class="result-grid__label">
                <math-jax :latex="'C'" />
              </div>
              <div class="result-grid__value">
                <el-input :value="displayC" readonly />
              </div>
              <div class="result-grid__label">
                <math-jax :latex="'m'" />
              </div>
              <div class="result-grid__value">
                <el-input :value="displayM" readonly />
              </div>
            </div>
          </div>
        </div>
      </template>
    </hycom-form>

    <h3 class="section-slot-note report-heading">计算书:</h3>

    <mav-editor :config="mavEditorConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Chapter1 } from '@/hycom_lib/chapter1'
import { Table2DLerp } from '@/hycom_lib/common'
import HycomForm from '@/components/HycomForm/index.vue'
import MavEditor from '@/components/MavEditor/MavEditor.vue'
import TabPane from './components/TabPane.vue'
import {
  CalculationDefinition,
  createCalculationState,
  DemoCase,
  FieldSchema,
  ResultSchema
} from '@/shared/calculations'

type OverflowCapacityResult = {
  raw: string;
  Q: string;
  C: string;
  m: string;
  H0: string;
}

type OverflowLookupValues = {
  C: number;
  m: number;
  H0: number;
}

const TITLE = '1.1.1 开敞式幂曲线实用堰泄流能力'

const REPORT_HEADER =
  '<center><font face=黑体 size=5">某国外水电站工程岸边开敞式溢洪道泄流能力计算</font ></center> ' +
  '<br /> <br /> ' +
  '<font face=黑体 size=4>1 计算说明</font >  <br /><br />' +
  '<font face=宋体 size=3> 采用水力学计算程序HYCOM</font> <br /> <br />' +
  '<font face=黑体 size=4>2 计算依据</font > <br /> <br />' +
  '<font face=宋体 size=3> 依据《溢洪道设计规范》 DL-T5166-2002.</font><br /> <br /> ' +
  '<font face=黑体 size=4>3 计算过程</font > <br /><br /> ' +
  '<font face=宋体 size=3> 某国外水电站工程,岸边式溢洪道,引渠底板高程为190m,堰顶高程为209m,PMF库水位233m,引渠流速3m/s,4孔,单孔宽度15m,上游坡度3:2,求PMF下泄量. <br /><br /> ' +
  '已知参数为:</font> <br /> \n \n'

const REPORT_RESULT_SECTION = ' <font face=黑体 size=4>4 计算结果与分析</font > <br />\n '
const REPORT_APPENDIX_SECTION = '<font face=黑体 size=4>5 计算附表及附图</font >'

const fields: FieldSchema[] = [
  { key: 'n', latex: 'n', type: 'number' },
  { key: 'b', latex: 'b', type: 'number' },
  { key: 'P_1', latex: 'P_1', type: 'number' },
  { key: 'H_d', latex: 'H_d', type: 'number' },
  { key: 'H', latex: 'H', type: 'number' },
  { key: 'v_0', latex: 'v_0', type: 'number' },
  { key: '\\varepsilon', latex: '\\varepsilon', type: 'number' },
  { key: '\\sigma_m', latex: '\\sigma_m', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    n: 4,
    b: 15,
    P_1: 19,
    H_d: 20,
    H: 24,
    v_0: 3,
    '\\varepsilon': 0.88,
    '\\sigma_m': 1.0
  },
  description:
    '某国外水电站工程,岸边式溢洪道,引渠底板高程为190m,堰顶高程为209m,PMF 库水位233m,引渠流速3m/s,4 孔,单孔宽度15m,上游坡度3:2,求PMF下泄量.',
  expectedResult: '求得PMF下泄量为14291.74'
}

const formulas = {
  11: 'Q :流量,m^3/s',
  0: '\\sigma_m :淹没系数',
  1: 'C :上游坡角修正系数',
  2: 'm :流量系数',
  3: '\\varepsilon :收缩系数,设计时对高堰可取\\varepsilon=0.90\\sim 0.97,均值0.935,对低堰可取\\varepsilon=0.80\\sim 0.90,均值0.85',
  4: 'b :单孔宽度,m',
  5: 'n :闸孔数目',
  6: 'H :堰上水头,m,取堰前3H_{0}\\sim 6H_{0}处',
  7: 'v_0 :引渠的行进流速,m/s',
  8: 'g :重力加速度,m/s^2,取9.8',
  9: 'P_1 :上游堰高,m',
  10: 'H_d :定型设计水头,m,对于高堰,H_d=75\\%\\sim 95\\%  H_{max},H_{max}为校核流量对应的水头'
}

const resultSchema: ResultSchema<OverflowCapacityResult> = {
  summary: [
    { key: 'Q', label: 'Q', latex: 'Q' },
    { key: 'H0', label: 'H0', latex: 'H_0' },
    { key: 'C', label: 'C', latex: 'C' },
    { key: 'm', label: 'm', latex: 'm' }
  ]
}

const tabOptions = [
  { label: '表:流量系数m值', key: 't1' },
  { label: '表:上游面坡度影响修正系数C值', key: 't2' }
]

const slopePropOptions = [
  { label: '3:1', value: '0' },
  { label: '3:2', value: '1' },
  { label: '3:3', value: '2' },
  { label: '垂直', value: '-1' }
]

const tableA = [
  [0.425, 0.43, 0.431, 0.433, 0.436],
  [0.438, 0.442, 0.445, 0.448, 0.451],
  [0.45, 0.455, 0.458, 0.46, 0.464],
  [0.458, 0.463, 0.468, 0.472, 0.476],
  [0.467, 0.474, 0.477, 0.482, 0.486],
  [0.473, 0.48, 0.485, 0.491, 0.494],
  [0.479, 0.486, 0.491, 0.496, 0.501],
  [0.482, 0.491, 0.496, 0.502, 0.507],
  [0.485, 0.495, 0.499, 0.506, 0.51],
  [0.496, 0.5, 0.5, 0.508, 0.513]
]

const tableAVertical = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3]
const tableAHorizon = [0.2, 0.4, 0.6, 1.0, 1.33]

const tableB = [
  [1.009, 1.007, 1.004, 1.002, 1.0, 0.998, 0.997],
  [1.015, 1.011, 1.006, 1.002, 0.999, 0.996, 0.993],
  [1.021, 1.015, 1.007, 1.002, 0.998, 0.993, 0.988]
]

const tableBVertical = [0, 1, 2]
const tableBHorizon = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.3]

function hasLookupInputs(input: Record<string, any>): boolean {
  return input.P_1 !== undefined &&
    input.H_d !== undefined &&
    input.H !== undefined &&
    input.v_0 !== undefined
}

function calculateLookupValues(input: Record<string, any>, slopeVal: string): OverflowLookupValues | null {
  if (!hasLookupInputs(input)) {
    return null
  }

  let H0 = Number(input.H)
  if (Number(input.P_1) < 1.33 * Number(input.H_d)) {
    H0 = Number(input.H) + (Number(input.v_0) * Number(input.v_0)) / (2 * 9.8)
  }

  const p1DivHd = Number(input.P_1) / Number(input.H_d)
  const h0DivHd = H0 / Number(input.H_d)
  const lerp = new Table2DLerp()
  const m = Number(lerp.arr(tableAVertical, tableAHorizon, tableA, h0DivHd, p1DivHd))

  let C = 1
  if (slopeVal !== '-1') {
    C = Number(lerp.arr(tableBVertical, tableBHorizon, tableB, Number(slopeVal), p1DivHd))
  }

  return { C, m, H0 }
}

function createReportConfig() {
  return {
    subfield: false,
    defaultOpen: 'preview',
    editable: false,
    toolbarsFlag: false,
    scrollStyle: true,
    html: true,
    value: '',
    filename: '计算书',
    download: true,
    preview: true
  }
}

export default defineComponent({
  name: 'Section111Calculator',
  components: {
    HycomForm,
    TabPane,
    MavEditor
  },
  data() {
    return {
      formState: {
        ...createCalculationState(fields),
        __slope: ''
      },
      activeTableName: 't1',
      tabOptions,
      slopePropOptions,
      mavEditorConfig: createReportConfig(),
      definition: {
        title: TITLE,
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const lookupValues = this.lookupValues || { C: 0, m: 0, H0: 0 }

          const Q = Chapter1.kcsmqxsyy(
            Number(input.n),
            Number(input.b),
            lookupValues.H0,
            lookupValues.C,
            lookupValues.m,
            Number(input['\\varepsilon']),
            Number(input['\\sigma_m'])
          ).toFixed(2)

          const result = {
            raw: `PMF下泄量Q=${Q}`,
            Q,
            C: lookupValues.C.toFixed(3),
            m: lookupValues.m.toFixed(3),
            H0: lookupValues.H0.toFixed(3)
          }

          this.mavEditorConfig.value = this.buildReportContent(input, result)
          return result
        },
        formatResult: (result: OverflowCapacityResult) => result.raw
      } as CalculationDefinition<Record<string, any>, OverflowCapacityResult>
    }
  },
  computed: {
    lookupValues(): OverflowLookupValues | null {
      return calculateLookupValues(this.formState, String(this.formState.__slope ?? ''))
    },
    displayC(): string {
      return this.lookupValues ? this.lookupValues.C.toFixed(3) : ''
    },
    displayM(): string {
      return this.lookupValues ? this.lookupValues.m.toFixed(3) : ''
    }
  },
  mounted() {
    this.resetReportDocument()
  },
  methods: {
    beforeOnDemo() {
      this.activeTableName = 't1'
      this.formState.__slope = '1'
      this.resetReportDocument()
    },
    beforeOnReset() {
      this.formState.__slope = ''
      this.activeTableName = 't1'
      this.resetReportDocument()
    },
    resetReportDocument(): void {
      this.mavEditorConfig.value = REPORT_HEADER + REPORT_RESULT_SECTION + REPORT_APPENDIX_SECTION
      this.mavEditorConfig.filename = `${TITLE}_计算书`
    },
    buildReportContent(input: Record<string, any>, result: OverflowCapacityResult): string {
      const knownParams =
        '$C= ' +
        Number(result.C) +
        ', m= ' +
        Number(result.m) +
        ', \\varepsilon= ' +
        Number(input['\\varepsilon']).toFixed(3) +
        ', \\sigma_m= ' +
        Number(input['\\sigma_m']).toFixed(3) +
        ', H_0= ' +
        Number(result.H0) +
        '$ \n'

      const equation =
        '$Q=c m \\varepsilon \\sigma_m B \\sqrt{2g} H_0^{\\frac{3}{2}}$ \n' +
        '$\\quad=' +
        Number(result.C) +
        ' \\times ' +
        Number(result.m) +
        ' \\times ' +
        Number(input['\\varepsilon']) +
        ' \\times ' +
        Number(input['\\sigma_m']) +
        ' \\times ' +
        Number(input.b) +
        ' \\times \\sqrt{2 \\times 9.8}' +
        ' \\times ' +
        result.H0 +
        '^{\\frac{3}{2}}$ \n' +
        '$\\quad=' +
        Number(Number(result.Q).toFixed(3)) +
        ' m^3/s$ \n \n'

      return REPORT_HEADER +
        knownParams +
        equation +
        REPORT_RESULT_SECTION +
        '<font face=宋体 size=3> PMF工况下泄量 $Q=' +
        result.Q +
        ' m^3/s$,满足要求 </font> <br /> \n' +
        REPORT_APPENDIX_SECTION
    }
  }
})
</script>

<style lang="scss" scoped>
.lookup-grid {
  display: grid;
  gap: 12px 20px;
  grid-template-columns: minmax(140px, 220px) minmax(240px, 1fr);
  align-items: center;
}

.lookup-grid__value,
.result-grid__value {
  min-width: 0;
}

.table-section {
  display: grid;
  gap: 20px;
}

.result-grid {
  display: grid;
  gap: 12px 20px;
  grid-template-columns: minmax(40px, 80px) minmax(180px, 1fr) minmax(40px, 80px) minmax(180px, 1fr);
  align-items: center;
}

.report-heading {
  margin-top: 24px;
}

@media (max-width: 768px) {
  .lookup-grid,
  .result-grid {
    grid-template-columns: 1fr;
  }
}
</style>
