<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-03-11 21:19:00
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-08-07 01:58:48
 * @FilePath: \hycom3.0\src\views\section2\2.5\index.vue
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
-->
<template>
  <div>
    <hycom-form
      ref="template"
      :title="title"
      :data="data"
      :init-data="initData"
      :demo-content="demoContent"
      :demo-result="demoResult"
      :formulas="formulas"
      @beforeOnCalculate="beforeOnCalculate"
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
          <h3>注:存在n个断面时,使用分号(";")来输入多个断面参数。具体输入方法可参考"算例"。</h3>
        </el-row>
      </div>
    </hycom-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Chapter1 } from '@/hycom_lib/chapter1'
import { Table2DLerp } from '@/hycom_lib/common'

import TablePane from './components/TablePane.vue'
import HycomForm from '@/components/HycomForm/index.vue'

@Component({
  components: {
    HycomForm,
    TablePane
  }
})
export default class Chapter1Section3 extends Vue {
  public title = '1.5 溢洪道泄流水流空化数';
  public initData = {
    '\\nabla_i': '198.8;183.4165;168.033',
    h_i: '16.14;11.165;9.436',
    v_i: '18.0917;26.153;30.945',
    C: 15
  };
  public data = {
    '\\nabla_i': '',
    h_i: '',
    v_i: '',
    C: ''
  };

  public formulas = {
    0: '\\sigma_i :第i个断面水流空化数;',
    1: 'h_i :第i个计算断面处的动水压力水头,水柱高,m',
    2: 'h_a :第i个计算断面处的大气压力水头,水柱高,m',
    3: 'h_v :第i个断面水的汽化压力水头,水柱高,m',
    4: 'v_i :第i个计算断面的平均流速,m',
    5: '\\nabla_i :第i个计算断面高程,m',
    6: 'C :水温'
  };

  public demoContent =
    '国外某水电站工程,溢洪道为实用堰,泄槽净宽50m,PMF 洪水下,水库水位233m,下泄流量14600m3/s,鼻坎坎顶高程98.466m,下游水位56m,下游河床高程37m,下游河床为砂岩和砂岩页岩互层,砂岩块度0.3mx0.5mx0.8m,砂岩页岩互层块度0.1mx0.3mx0.4m,抗冲流速4m/s 左右,水库水温15 度,计算PMF 洪水下泄槽的空化数及掺气槽位置的设置。';
  public demoResult = '断面1:水流空化数=1.02;不需要设掺气坎|断面2:水流空化数=0.35;不需要设掺气坎|断面3:水流空化数=0.21;需要设掺气坎|即在第三段前设置';

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

  public beforeOnCalculate() {
    let outStr = ''
    let tableLerp = new Table2DLerp()
    let hv = tableLerp.arr(
      this.table251Vertical,
      this.table251Horizon,
      this.table251Data,
      0,
      +this.data.C
    )

    if (this.data['\\nabla_i'].toString().includes(';') && this.data.h_i.toString().includes(';') && this.data.v_i.toString().includes(';')) {
      let nablaArray = this.data['\\nabla_i'].toString().split(';')
      let hiArray = this.data.h_i.toString().split(';')
      let viArray = this.data.v_i.toString().split(';')
      if (nablaArray.length === hiArray.length && hiArray.length === viArray.length && nablaArray.length === viArray.length) {
        for (let index = 0; index < nablaArray.length; index++) {
          const vi = viArray[index]
          const hi = hiArray[index]
          const nabla = nablaArray[index]

          let objs = Chapter1.slkqhs(
            +nabla,
            +hi,
            hv,
            +vi
          )
          outStr += '断面' + (index + 1).toString() + ':水流空化数='
          outStr += objs.sigma.toFixed(2).toString() + ';' + objs.out + '|'
        }
      }
    } else if (!this.data['\\nabla_i'].toString().includes(';') && !this.data.h_i.toString().includes(';') && !this.data.v_i.toString().includes(';')) {
      let objs = Chapter1.slkqhs(
        +this.data['\\nabla_i'],
        +this.data.h_i,
        hv,
        +this.data.v_i
      )
      outStr = '空化数:'
      outStr += objs.sigma.toFixed(2).toString() + '|' + objs.out
    }

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
