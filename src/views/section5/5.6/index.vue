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
      ref="template"
      :title="title"
      :data="data"
      :init-data="initData"
      :demo-content="demoContent"
      :demo-result="demoResult"
      :formulas="formulas"
      @beforeOnCalculate="beforeOnCalculate"
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
import { Chapter6 } from '@/hycom_lib/chapter6'
import { Table2DLerp } from '@/hycom_lib/common'

import TablePane from './components/TablePane.vue'
import HycomForm from '@/components/HycomForm/index.vue'
import DynamicSlkhsParams from './components/DynamicSLKHSParams.vue'

@Component({
  components: {
    HycomForm,
    TablePane,
    DynamicSlkhsParams
  }
})
export default class Chapter6Section6 extends Vue {
  public title = '5.6 溢流坝水流空化数计算';
  public explainText = '断面';

  public initData = {
    '\\nabla': 1862,
    C: 15
  };
  public data = {
    '\\nabla': '',
    C: ''
  };

  public formulas = {
    0: '\\sigma_i :第i个断面水流空化数;',
    1: 'h_i :第i个计算断面处的动水压力水头,水柱高,m',
    2: 'h_a :第i个计算断面处的大气压力水头,水柱高,m',
    3: 'h_v :第i个断面水的汽化压力水头,水柱高,m',
    4: 'v_i :第i个计算断面的平均流速,m',
    5: '\\nabla :计算断面高程,m',
    6: 'C :水温'
  };

  public demoContent ='澜沧江里底水电站,溢洪道为2 孔,单孔宽度14.0m,开敞式溢流堰,堰顶高程为1795.50m,上游斜坡为3∶2,溢流堰布置一扇14.0m x 23.6m 检修门和2 扇14.0m x 23.2m 的弧形工作门,闸室控制段长52.0m。堰顶最大作用水头Hmax＝23.4m,定型设计水头Hs＝21m（0.90Hmax）,堰面曲线下游通过1∶1 的斜线段与下游反弧段相连接,反弧半径为30m,采用底流消能。校核洪水位1818.9m,2 孔全开泄量6498m³/s,消力池宽度33m,消力池底板高程1762.2m。溢流面桩号32.5m 处流速17m/s、水深13.651m,桩号52.0m 处流速18.05m/s、水深12.857m。计算其水流空化数。'

  public demoResult = '第1断面:水流空化数=0.86417;第2断面:水流空化数=0.71879'

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

    slkhs.addFieldWithData(13.651, 17)
    slkhs.addFieldWithData(12.857, 18.05)
  }

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

    let slkhs = this.$refs.slkhs as any
    slkhs.onParamsDataChange()

    let hiList: any[] = []
    let viList : any[] = []
    this.paramData1.forEach(function(elem:any) {
      hiList.push(elem.hi)
      viList.push(elem.vi)
    })

    let counter = 1
    let res = Chapter6.ylbslkhs(
      +this.data['\\nabla'],
      hv,
      hiList,
      viList
    )
    res.forEach(function(elem:any) {
      outStr += '第' + counter.toString() + '断面:' + elem + ';'
      counter += 1
    })

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
