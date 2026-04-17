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
      <div slot="table_fir_anchor">
        <el-row :gutter="20">
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
          <br>
        </el-row>

        <el-row :gutter="20">
          <h3>请点击⊕添加断面信息</h3>
          <dynamic-slkhs-params
            ref="slkhs"
            :explain-text="explainText"
            @updateParamsData="updateParamsData"
          />
        </el-row>
      </div>
    </hycom-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Chapter4 } from '@/hycom_lib/chapter4'
import { Table2DLerp } from '@/hycom_lib/common'

import TablePane from './components/TablePane.vue'
import HycomForm from '@/components/HycomForm/index.vue'
import DynamicSlkhsParams from './components/DynamicSLKHSParams.vue'
import {
  CalculationDefinition,
  createCalculationState,
  DemoCase,
  FieldSchema
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

@Component({
  components: {
    HycomForm,
    TablePane,
    DynamicSlkhsParams
  }
})
export default class Chapter4Section42 extends Vue {
  public explainText = '断面';
  public formState = createCalculationState(fields)
  public definition: CalculationDefinition = {
    title: '3.4 高流速水工隧洞沿程水流空化数',
    fields,
    formulas,
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

      const slkhs = this.$refs.slkhs as any
      const params = slkhs.params || []

      const hiList: number[] = []
      const viList: number[] = []
      params.forEach(function(elem: any) {
        hiList.push(elem.hi)
        viList.push(elem.vi)
      })

      let outStr = ''
      let counter = 1
      const res = Chapter4.glssg_slkqhs(
        Number(this.formState['\\nabla']),
        hv,
        hiList,
        viList
      )
      res.forEach(function(elem: any) {
        outStr += '第' + counter.toString() + '断面:' + elem + ';'
        counter += 1
      })

      return outStr
    }
  }

  // -------table 251 data--------------------------
  public table251Data = [
    [0.06, 0.09, 0.13, 0.17, 0.24, 0.32, 0.43, 0.75]
  ];
  public table251Vertical = [0];
  public table251Horizon = [0, 5, 10, 15, 20, 25, 30, 40];

  public tableOptions = [
    { label: '表:水的汽化压力水头hv与水温的关系', key: 't1' }
  ];
  public activeTableName = 't1';
  // -------table 251 data--------------------------
  private paramData1 = [];

  public updateParamsData(paramData) {
    this.paramData1 = paramData
  }

  public beforeOnReset() {
    let slkhs = this.$refs.slkhs as any
    slkhs.removeAllField()
  }

  public beforeOnDemo() {
    let slkhs = this.$refs.slkhs as any
    slkhs.removeAllField()

    slkhs.addFieldWithData(13.80776, 20.912)
    slkhs.addFieldWithData(9.518, 24.27)
    slkhs.addFieldWithData(10.003, 23.093)
    slkhs.addFieldWithData(10.923, 21.148)
  }
}
</script>
