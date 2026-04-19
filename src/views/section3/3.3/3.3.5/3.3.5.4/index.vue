<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-07-16 22:00:43
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-07-16 23:33:08
 * @FilePath: \hycom_app\src\views\chapter2\4.3\4.3.2.1\index.vue
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
          <h3 class="section-slot-note">请点击⊕添加断面信息</h3>
          <dynamic-section-fields
            ref="params"
            :fields="sectionFields"
            :explain-text="explainText"
            @updateParamsData="updateDynamicItems"
          />
        </div>
      </template>
    </hycom-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Chapter4 } from '@/hycom_lib/chapter4'

import HycomForm from '@/components/HycomForm/index.vue'
import DynamicSectionFields from '@/shared/components/calculation/DynamicSectionFields.vue'
import {
  applyDynamicParamGroupDemo,
  buildIndexedSectionResult,
  CalculationDefinition,
  createCalculationState,
  createIndexedSectionResultSchema,
  DemoCase,
  FieldSchema,
  IndexedSectionResult,
  resetDynamicRefs,
  serializeDynamicParamGroup
} from '@/shared/calculations'
import {
  threeFieldAerationGroupSchema,
  threeFieldSectionFields,
  ThreeFieldAerationItem
} from '../shared'

const fields: FieldSchema[] = [
  { key: 'n_z', latex: 'n_z', type: 'number' }
]

const demoCase: DemoCase = {
  values: {
    n_z: 0.014
  },
  description: '国内某水电站,中孔泄洪洞进水口为有压短管,后接“龙抬头”无压泄洪洞,隧洞为城门洞形,隧洞断面尺寸为10m x 15m(宽 x 高),“龙抬头”明流无压泄洪洞清水水面线计算结果为:反弧段前= k i 0.005516<0.14 属于急流,为降水曲线,起始断面,L0=0、h0=10.054m、υ0=28.72m/s,反弧段第1 断面:L1=206.39m、h1=6.515m、υ1=35.4566m/s;反弧段后明, = k i 0.005516>0.004692 属于缓流,属于用壅水曲线,洞长L2=442.937m;第2 断面:L2=157.166m、h2=7m、υ2=33m/s;第3 断面:L3=442.937m 、h3=7.92m、υ3=29.1667m/s;计算掺气水深。',
  expectedResult: '第1断面:掺气水深=10.58946;第2断面:公式不合适;第3断面:公式不合适;第4断面:掺气水深=8.65013;'
}

const formulas = {
  0: 'b_i:明流隧洞底宽,m',
  1: 'h_{ai}:掺气后水深,m',
  2: 'h_i:未掺气水流的水深,m',
  3: 'v_i:未掺气水流的流速,m',
  4: 'R_i:未掺气水流的水力半径,m',
  5: 'i:第i个计算断面',
  6: 'n_z:糙率值'
}

export default defineComponent({
  name: 'Section3354Calculator',
  components: {
    HycomForm,
    DynamicSectionFields
  },
  data() {
    const formState = createCalculationState(fields)
    const definition: CalculationDefinition<Record<string, any>, IndexedSectionResult> = {
      title: '3.3.5.4 王俊勇方法计算隧洞掺气水深',
      fields,
      formulas,
      result: createIndexedSectionResultSchema(),
      demoCase,
      execute: ({ input }) => {
        const { hiList, biList, viList } = serializeDynamicParamGroup(
          threeFieldAerationGroupSchema,
          this.dynamicItems
        )

        return buildIndexedSectionResult(
          Chapter4.wjy_sdsqss(Number(input.n_z), biList, hiList, viList)
        )
      },
      formatResult: (result) => result.raw
    }

    return {
      explainText: '断面',
      sectionFields: threeFieldSectionFields,
      formState,
      definition,
      dynamicItems: [] as ThreeFieldAerationItem[]
    }
  },
  methods: {
    beforeOnReset() {
      this.dynamicItems = []
      resetDynamicRefs(this.$refs as Record<string, any>, [threeFieldAerationGroupSchema.refName])
    },
    beforeOnDemo() {
      applyDynamicParamGroupDemo(this.$refs as Record<string, any>, threeFieldAerationGroupSchema)
    },
    updateDynamicItems(items: ThreeFieldAerationItem[]) {
      this.dynamicItems = items
    }
  }
})
</script>
