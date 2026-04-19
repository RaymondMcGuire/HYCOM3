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

          <h3 class="section-slot-note">注:存在n个断面时,使用分号(";")来输入多个断面参数。具体输入方法可参考"算例"。</h3>
        </div>
      </template>
    </hycom-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Chapter1 } from '@/hycom_lib/chapter1'
import { Table2DLerp } from '@/hycom_lib/common'
import CavitationTemperatureTable from '@/shared/components/cavitation/CavitationTemperatureTable.vue'
import HycomForm from '@/components/HycomForm/index.vue'
import {
  CalculationDefinition,
  createCalculationState,
  DemoCase,
  FieldSchema,
  parseDelimitedNumberList,
  ResultSchema
} from '@/shared/calculations'

type CavitationSectionResult = {
  index: number;
  sigma: string;
  conclusion: string;
  text: string;
}

type CavitationResult = {
  raw: string;
  sections: CavitationSectionResult[];
}

const fields: FieldSchema[] = [
  { key: '\\nabla_i', latex: '\\nabla_i', type: 'textarea', placeholder: '多个断面使用分号分隔' },
  { key: 'h_i', latex: 'h_i', type: 'textarea', placeholder: '多个断面使用分号分隔' },
  { key: 'v_i', latex: 'v_i', type: 'textarea', placeholder: '多个断面使用分号分隔' },
  { key: 'C', latex: 'C', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    '\\nabla_i': '198.8;183.4165;168.033',
    h_i: '16.14;11.165;9.436',
    v_i: '18.0917;26.153;30.945',
    C: 15
  },
  description: '国外某水电站工程,溢洪道为实用堰,泄槽净宽50m,PMF 洪水下,水库水位233m,下泄流量14600m3/s,鼻坎坎顶高程98.466m,下游水位56m,下游河床高程37m,下游河床为砂岩和砂岩页岩互层,砂岩块度0.3mx0.5mx0.8m,砂岩页岩互层块度0.1mx0.3mx0.4m,抗冲流速4m/s 左右,水库水温15 度,计算PMF 洪水下泄槽的空化数及掺气槽位置的设置。',
  expectedResult: '断面1:水流空化数=1.02;不需要设掺气坎|断面2:水流空化数=0.35;不需要设掺气坎|断面3:水流空化数=0.21;需要设掺气坎|'
}

const formulas = {
  0: '\\sigma_i :第i个断面水流空化数;',
  1: 'h_i :第i个计算断面处的动水压力水头,水柱高,m',
  2: 'h_a :第i个计算断面处的大气压力水头,水柱高,m',
  3: 'h_v :第i个断面水的汽化压力水头,水柱高,m',
  4: 'v_i :第i个计算断面的平均流速,m',
  5: '\\nabla_i :第i个计算断面高程,m',
  6: 'C :水温'
}

const resultSchema: ResultSchema<CavitationResult> = {
  lists: [
    {
      key: 'sections',
      label: '断面结果',
      itemLabel: (item) => `断面${(item as CavitationSectionResult).index}`,
      itemValue: (item) => (item as CavitationSectionResult).text
    }
  ]
}

const table251Data = [
  [0.06, 0.09, 0.13, 0.17, 0.24, 0.32, 0.43, 0.75]
]
const table251Vertical = [0]
const table251Horizon = [0, 5, 10, 15, 20, 25, 30, 40]

function createSection(index: number, sigma: number, conclusion: string): CavitationSectionResult {
  const sigmaText = sigma.toFixed(2)
  return {
    index,
    sigma: sigmaText,
    conclusion,
    text: `水流空化数=${sigmaText};${conclusion}`
  }
}

function buildCavitationResult(sections: CavitationSectionResult[], singleSection: boolean): CavitationResult {
  if (sections.length === 0) {
    return {
      raw: '',
      sections: []
    }
  }

  if (singleSection) {
    const firstSection = sections[0]
    return {
      raw: `空化数:${firstSection.sigma}|${firstSection.conclusion}`,
      sections
    }
  }

  return {
    raw: sections.map((section) => `断面${section.index}:${section.text}|`).join(''),
    sections
  }
}

export default defineComponent({
  name: 'Section15Calculator',
  components: {
    HycomForm,
    TablePane: CavitationTemperatureTable
  },
  data() {
    return {
      formState: createCalculationState(fields),
      tableOptions: [
        { label: '表:水的汽化压力水头hv与水温的关系', key: 't1' }
      ],
      activeTableName: 't1',
      definition: {
        title: '1.5 溢洪道泄流水流空化数',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: ({ input }) => {
          const tableLerp = new Table2DLerp()
          const hv = tableLerp.arr(
            table251Vertical,
            table251Horizon,
            table251Data,
            0,
            Number(input.C)
          )

          const nablaValues = parseDelimitedNumberList(input['\\nabla_i'], ';')
          const hValues = parseDelimitedNumberList(input.h_i, ';')
          const vValues = parseDelimitedNumberList(input.v_i, ';')

          if (
            nablaValues.length === 0 ||
            hValues.length === 0 ||
            vValues.length === 0 ||
            nablaValues.length !== hValues.length ||
            hValues.length !== vValues.length
          ) {
            return buildCavitationResult([], false)
          }

          const sections = nablaValues.map((nabla, index) => {
            const result = Chapter1.slkqhs(
              nabla,
              hValues[index],
              hv,
              vValues[index]
            )

            return createSection(index + 1, result.sigma, result.out)
          })

          return buildCavitationResult(sections, sections.length === 1)
        },
        formatResult: (result: CavitationResult) => result.raw
      } as CalculationDefinition<Record<string, any>, CavitationResult>
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
