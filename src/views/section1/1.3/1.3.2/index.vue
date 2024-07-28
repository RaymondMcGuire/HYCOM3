<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-03-11 21:19:00
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-06-04 11:58:53
 * @FilePath: \hycom_app\src\views\chapter1\2.3\2.3.2\index.vue
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
      </div>
    </hycom-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Chapter1 } from '@/hycom_lib/chapter1'

import HycomForm from '@/components/HycomForm/index.vue'
import TablePane from './components/TablePane.vue'

@Component({
  components: {
    TablePane,
    HycomForm
  }
})
export default class Chapter1Section4Sub1 extends Vue {
  private title = '1.3.2 冲刷坑最大水垫深度';
  private initData = {
    'H_{up}': 233,
    'H_{down}': 69,
    可冲类别: 1.4,
    Q: 14600,
    b: 50,
    't^{\\prime}': 32
  };
  private data = {
    可冲类别: '',
    'H_{up}': '',
    'H_{down}': '',
    K: '',
    Q: '',
    b: '',
    't^{\\prime}': ''
  };

  private formulas = {
    0: 'K :综合冲刷系数',
    1: 'Q :流量,m^3/s',
    2: 'b :鼻坎宽度,m',
    3: 't^{\\prime} :下游水深,m',
    4: 'H_{up} :上游水面高程,m',
    5: 'H_{down} :下游水面高程,m',
    6: 'H :上下游水面差,m'
  };

  private demoContent =
    '某国外水电站工程,溢洪道为实用堰,泄槽净宽50m,PMF洪水下,水库水位233m,下泄流量14600m3/s,鼻坎坎顶高程98.466m,下游水位69m,下游河床高程37m,下游河床为砂岩和砂岩页岩互层,砂岩块度0.3 x 0.5 x 0.8m3,砂岩页岩互层块度0.1 x 0.3 x 0.4m3,抗冲流速4m/s 左右,求冲坑深度.';
  private demoResult = '求得冲坑深度53.61';

    public tableOptions = [
      { label: '表:岩基冲刷系数k值', key: 't1' }
    ];
  public activeTableName = 't1';

  @Watch('data.可冲类别')
  public onVarKCLBValuesChange() {
    if (this.data['可冲类别'] !== '') { this.data['K'] = this.data['可冲类别'] }
  }

  public beforeOnCalculate() {
    let outStr =
      '冲坑深度=' +
      Chapter1.ckjs(
        +this.data['H_{up}'],
        +this.data['H_{down}'],
        +this.data.K,
        +this.data.Q,
        +this.data.b,
        +this.data['t^{\\prime}']
      )
        .toFixed(2)
        .toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
