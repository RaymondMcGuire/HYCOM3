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
import { Chapter6 } from '@/hycom_lib/chapter6'
import { Table2DLerp } from '@/hycom_lib/common'
import CavitationTemperatureTable from '@/shared/components/cavitation/CavitationTemperatureTable.vue'
import HycomForm from '@/components/HycomForm/index.vue'
import DynamicSlkhsParams from '@/shared/components/cavitation/DynamicSlkhsParams.vue'
import {
  applyDynamicParamGroupDemo,
  buildIndexedSectionResult,
  CalculationDefinition,
  createCalculationState,
  createIndexedSectionResultSchema,
  DemoCase,
  DynamicParamGroupSchema,
  FieldSchema,
  IndexedSectionResult,
  resetDynamicRefs,
  serializeDynamicParamGroup
} from '@/shared/calculations'

const fields: FieldSchema[] = [
  { key: '\\nabla', latex: '\\nabla', type: 'number' },
  { key: 'C', latex: 'C', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    '\\nabla': 1862,
    C: 15
  },
  description: '澜沧江里底水电站,溢洪道为2 孔,单孔宽度14.0m,开敞式溢流堰,堰顶高程为1795.50m,上游斜坡为3∶2,溢流堰布置一扇14.0m x 23.6m 检修门和2 扇14.0m x 23.2m 的弧形工作门,闸室控制段长52.0m。堰顶最大作用水头Hmax＝23.4m,定型设计水头Hs＝21m（0.90Hmax）,堰面曲线下游通过1∶1 的斜线段与下游反弧段相连接,反弧半径为30m,采用底流消能。校核洪水位1818.9m,2 孔全开泄量6498m3/s,消力池宽度33m,消力池底板高程1762.2m。溢流面桩号32.5m 处流速17m/s、水深13.651m,桩号52.0m 处流速18.05m/s、水深12.857m。计算其水流空化数。',
  expectedResult: '第1断面:水流空化数=0.86417;第2断面:水流空化数=0.71879;'
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

const resultSchema = createIndexedSectionResultSchema('断面结果')

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
    { hi: 13.651, vi: 17 },
    { hi: 12.857, vi: 18.05 }
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
  name: 'Section56Calculator',
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
        title: '5.6 溢流坝水流空化数计算',
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

          const result = Chapter6.ylbslkhs(
            Number(this.formState['\\nabla']),
            hv,
            hiList,
            viList
          )

          return buildIndexedSectionResult(result)
        },
        formatResult: (result: IndexedSectionResult) => result.raw
      } as CalculationDefinition<Record<string, any>, IndexedSectionResult>
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
