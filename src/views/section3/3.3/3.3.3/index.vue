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
      ref="template"
      :title="title"
      :data="data"
      :init-data="initData"
      :demo-content="demoContent"
      :demo-result="demoResult"
      :formulas="formulas"
      @beforeOnCalculate="beforeOnCalculate"
    >
      <div slot="table_sec_anchor">
        <h3>表格插值自动计算:</h3>
        <br>
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
          <el-col :span="2">
            <math-jax :latex="'\\varepsilon'" />
          </el-col>
          <el-col :span="10">
            <el-input v-model="epsilon" />
          </el-col>

          <el-col :span="2">
            <math-jax :latex="'\\mu'" />
          </el-col>
          <el-col :span="10">
            <el-input v-model="mu" />
          </el-col>
        </el-row>
        <br>
      </div>
    </hycom-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Chapter4 } from '@/hycom_lib/chapter4'
import { Table2DLerp } from '@/hycom_lib/common'

import TablePane from './components/TablePane.vue'
import HycomForm from '@/components/HycomForm/index.vue'

@Component({
  components: {
    HycomForm,
    TablePane

  }
})
export default class Chapter4Section321 extends Vue {
  public title = '3.3.3典型有压短管泄流能力计算';

  public initData = {
    S_2: '4.3',
    e: '11',
    B: '8',
    H: '56.4'
  };

    public data = {
      S_2: '',
      e: '',
      B: '',
      H: ''

    };

  public formulas = {
    0: '\\mu :流量系数',
    1: '\\varepsilon :有压短管出口的工作闸门垂直收缩系数,查表4.3-3得到',
    2: 'e :计算断面处的大气压力水柱高,m',
    3: 'B :水的汽化压力水柱高,m',
    4: 'h_1 :闸门全开孔口高度,m',
    5: '\\phi :流速系数,一般取0.97'
  };

  public demoContent =
    '国内某水电站,水库校核水位1860.4m,正常蓄水位1856m,汛限水位1854m,中孔泄洪洞进水口为宜有压短管,有压短管出口底板高程1804m,工作闸门尺寸8m x 11m,工作门前压坡1:4.3,检修门前顶部椭圆曲线x2/13.62+y2/4.52=1,求校核洪水时中孔泄洪洞的泄量。';
  public demoResult = '求得流量为2304.20,出口断面流速为29.07';

  // -------table 433 data--------------------------
  public table433S2 = [4, 5, 6];
  public table433Vertical = [0];
  public table433epsilon = [[0.895, 0.914, 0.918]];
  public table433Phi = [[0.963, 0.963, 0.963]];
  public table433Mu = [[0.862, 0.880, 0.884]];

  public tableOptions = [
    { label: '表4.3-3典型有压短管弧门全开时的ε、φ值', key: 't1' }
  ];
  public activeTableName = 't1';
  // -------table 433 data--------------------------

 public mu: number = 0;
  public epsilon: number = 0;

   @Watch('data.S_2')
  public onS2Change() {
    if (this.data.S_2 !== '') {
      let tableLerpepsilon = new Table2DLerp()
      let tableLerpMu = new Table2DLerp()
      this.mu = tableLerpMu.arr(
        this.table433Vertical,
        this.table433S2,
        this.table433Mu,
        0,
        +this.data.S_2
      )

      this.epsilon = tableLerpepsilon.arr(
        this.table433Vertical,
        this.table433S2,
        this.table433epsilon,
        0,
        +this.data.S_2
      )
    } else {
      this.epsilon = 0
      this.mu = 0
    }
  }

   public beforeOnCalculate() {
     let [Q, v] = Chapter4.dxyydgll(
       +this.data.B,
       +this.data.e,
       +this.data.H,
       this.mu,
       this.epsilon
     )
     let outStr = '流量:' + Q.toFixed(2).toString() + '|' + '出口断面流速:' + v.toFixed(2).toString()
     let template = this.$refs.template as any
     template.form.result = outStr
   }
}
</script>
