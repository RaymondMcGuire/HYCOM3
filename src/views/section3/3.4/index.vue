<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-03-11 21:19:00
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-08-07 02:16:53
 * @FilePath: \hycom3.0\src\views\section4\4.4\4.4.2\index.vue
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
-->
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

          <div class="section-slot-stack">
            <h3 class="section-slot-note">请点击⊕添加断面信息</h3>
            <dynamic-slkhs-params
              ref="slkhs"
              :explain-text="explainText"
            />
          </div>
        </div>
      </template>
    </hycom-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Chapter4 } from '@/hycom_lib/chapter4'
import { Table2DLerp } from '@/hycom_lib/common'

import CavitationTemperatureTable from '@/shared/components/cavitation/CavitationTemperatureTable.vue'
import HycomForm from '@/components/HycomForm/index.vue'
import DynamicSlkhsParams from '@/shared/components/cavitation/DynamicSlkhsParams.vue'
import {
  applyDynamicParamGroupDemo,
  CalculationDefinition,
  createCalculationState,
  DemoCase,
  DynamicParamGroupSchema,
  FieldSchema,
  resetDynamicRefs,
  ResultSchema,
  serializeDynamicParamGroup
} from '@/shared/calculations'

type CavitationSectionResult = {
  index: number;
  sigma?: string;
  conclusion: string;
  text: string;
}

type CavitationResult = {
  raw: string;
  sections: CavitationSectionResult[];
}

const fields: FieldSchema[] = [
  { key: '\\nabla', latex: '\\nabla', type: 'number' },
  { key: 'C', latex: 'C', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    '\\nabla': 1862,
    C: 15
  },
  description: '国内某水电站,水库校核水位1860.4m,正常蓄水位1856m,汛限水位1854m,中孔泄洪洞进水口为有压短管,有压短管出口高程804m,后接“龙抬头”无压泄洪洞,隧洞为城门洞形,隧洞断面尺寸为10mx15m,底坡为0.14,洞长206.39m,反弧末段高程1778.007m,反弧段后底坡为0.00472、洞长442.937m。进水口底板高程1804m,工作闸门尺寸8mx11m,流量系数μ=0.871,垂直收缩系数ε=0.914,混凝土衬砌糙率0.014,校核工况下泄量2310m3/s,求校核洪水时中孔泄洪洞沿程水面线(空化数)。',
  expectedResult: '第1断面:水流空化数=0.57812,不需要设掺气坎;第2断面:水流空化数=0.28647,需要设掺气坎;第3断面:水流空化数=0.33424,不需要设掺气坎;第4断面:水流空化数=0.43886,不需要设掺气坎;'
}

const formulas = {
  0: '\\sigma_i :第i个断面水流空化数;',
  1: 'h_i :第i个计算断面处的动水压力水头,水柱高,m',
  2: 'h_a :第i个计算断面处的大气压力水头,水柱高,m',
  3: 'h_v :第i个断面水的汽化压力水头,水柱高,m',
  4: 'v_i :第i个计算断面的平均流速,m',
  5: '\\nabla :计算断面高程,m',
  6: 'C :水温'
}

const resultSchema: ResultSchema<CavitationResult> = {
  lists: [
    {
      key: 'sections',
      label: '断面结果',
      itemLabel: (item) => `第${(item as CavitationSectionResult).index}断面`,
      itemValue: (item) => (item as CavitationSectionResult).text
    }
  ]
}

function buildCavitationResult(items: string[]): CavitationResult {
  const sections = items.map((item, index) => {
    const [sigmaPart, conclusion = ''] = item.split(',')
    const sigma = sigmaPart.includes('=')
      ? sigmaPart.split('=')[1].trim()
      : undefined

    return {
      index: index + 1,
      sigma,
      conclusion: conclusion.trim(),
      text: item
    }
  })

  return {
    raw: sections.map((section) => `第${section.index}断面:${section.text}`).join(';') + (sections.length > 0 ? ';' : ''),
    sections
  }
}

type SlkhsItem = {
  hi: string | number;
  vi: string | number;
}

type SlkhsSerialized = {
  hiList: number[];
  viList: number[];
}

const slkhsGroupSchema: DynamicParamGroupSchema<SlkhsItem, SlkhsSerialized> = {
  refName: 'slkhs',
  createDefaultItem: () => ({ hi: '', vi: '' }),
  toArgs: (item) => [item.hi, item.vi],
  demoItems: [
    { hi: 13.80776, vi: 20.912 },
    { hi: 9.518, vi: 24.27 },
    { hi: 10.003, vi: 23.093 },
    { hi: 10.923, vi: 21.148 }
  ],
  serialize: (items) => ({
    hiList: items.map((item) => Number(item.hi)),
    viList: items.map((item) => Number(item.vi))
  })
}

function getSlkhsItems(refs: Record<string, any>): SlkhsItem[] {
  return (refs.slkhs?.params || []) as SlkhsItem[]
}

export default defineComponent({
  name: 'Section34Calculator',
  components: {
    HycomForm,
    TablePane: CavitationTemperatureTable,
    DynamicSlkhsParams
  },
  data() {
    return {
      explainText: '断面',
      formState: createCalculationState(fields),
      table251Data: [
        [0.06, 0.09, 0.13, 0.17, 0.24, 0.32, 0.43, 0.75]
      ],
      table251Vertical: [0],
      table251Horizon: [0, 5, 10, 15, 20, 25, 30, 40],
      tableOptions: [
        { label: '表:水的汽化压力水头hv与水温的关系', key: 't1' }
      ],
      activeTableName: 't1',
      definition: {
        title: '3.4 高流速水工隧洞沿程水流空化数',
        fields,
        formulas,
        result: resultSchema,
        demoCase,
        execute: () => {
          const tableLerp = new Table2DLerp()
          const hv = tableLerp.arr(
            this.table251Vertical,
            this.table251Horizon,
            this.table251Data,
            0,
            Number(this.formState.C)
          )

          const { hiList, viList } = serializeDynamicParamGroup(
            slkhsGroupSchema,
            getSlkhsItems(this.getDynamicRefs())
          )

          const res = Chapter4.glssg_slkqhs(
            Number(this.formState['\\nabla']),
            hv,
            hiList,
            viList
          )
          return buildCavitationResult(res)
        },
        formatResult: (result: CavitationResult) => result.raw
      } as CalculationDefinition<Record<string, any>, CavitationResult>
    }
  },
  methods: {
    getDynamicRefs() {
      return this.$refs as Record<string, any>
    },
    beforeOnReset() {
      this.activeTableName = 't1'
      resetDynamicRefs(this.getDynamicRefs(), [slkhsGroupSchema.refName])
    },
    beforeOnDemo() {
      this.activeTableName = 't1'
      applyDynamicParamGroupDemo(this.getDynamicRefs(), slkhsGroupSchema)
    }
  }
})
</script>
