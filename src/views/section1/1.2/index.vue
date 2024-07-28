<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-03-11 21:19:00
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-06-04 11:58:23
 * @FilePath: \hycom_app\src\views\chapter1\2.2\index.vue
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
import { Component, Watch, Vue } from 'vue-property-decorator'
import { Chapter1 } from '@/hycom_lib/chapter1'
import { syyType } from '@/hycom_lib/common'

import TablePane from './components/TablePane.vue'
import HycomForm from '@/components/HycomForm/index.vue'

@Component({
  components: {
    HycomForm,
    TablePane

  }
})
export default class Chapter1Section2 extends Vue {
  public title = '1.2 泄槽水面线计算';
  public initData = {
    实用堰类型: syyType.syy,
    水流边壁类型: '',
    Q_c: 7300,
    b_c: 25,
    n_z: 0.014,
    i: 0.1,
    '\\phi': 0.95,
    H_0: 34.5449,
    N: 5,
    L: 615.34,
    '\\alpha': 1.05
  };
  public data = {
    实用堰类型: '',
    水流边壁类型: '',
    Q_c: '',
    b_c: '',
    n_z: '',
    i: '',
    '\\phi': '',
    H_0: '',
    N: '',
    L: '',
    '\\alpha': ''
  };

  public formulas = {
    0: 'Q_c :单个泄槽流量,m^3/s',
    1: 'n_z :糙率',
    2: 'b_c :单个泄槽宽,m',
    3: 'i :泄槽底坡',
    4: '\\phi :流速系数,一般0.95',
    5: 'g :重力加速度,m/s^2,取9.8',
    6: '\\theta :泄槽底板与水面夹角',
    7: 'L :泄槽长,m',
    8: '\\varsigma :掺气水深系数,缺范围取1.0\\sim 1.4, 取1.3',
    9: 'N :计算断面个数',
    10: '\\alpha :流速的动力系数'
  };

  public demoContent =
    '某国外(马来西亚巴贡)水电站工程,溢洪道为实用堰,弧形闸门控制,4孔闸,单孔净宽15m,引渠底板高程202m,堰前行近流速为2.6m,PMF洪水下,水库水位233m,堰顶高程209m,下泄流量14600m3/s,泄槽起始底板高程198.80m,2 个泄槽,单个泄槽宽度25m,泄槽长度615.34m,底坡为0.1,计算PMF洪水下泄槽的净水深、掺气水深.';
  public demoResult =
    '以5个断面为例,求得h1=16.153,h2=11.167,h3=9.438,h4=8.443,h5=7.782';

  public tableOptions = [
    { label: '表:水力计算中常用的糙率n值表', key: 't1' }
  ];
  public activeTableName = 't1';

  @Watch('data.水流边壁类型')
  public onVarSLBBValuesChange() {
    if (this.data['水流边壁类型'] !== '') { this.data['n_z'] = this.data['水流边壁类型'] }
  }

  public beforeOnCalculate() {
    let values = Chapter1.slotSurfaceLine(
      +this.data.实用堰类型,
      +this.data.Q_c,
      +this.data.b_c,
      +this.data.n_z,
      +this.data.i,
      +this.data['\\phi'],
      +this.data.H_0,
      +this.data.N,
      +this.data.L,
      +this.data['\\alpha']
    )
    let outStrs = ''
    let cnt = 0
    values.forEach((element) => {
      cnt++
      outStrs += 'h' + cnt.toString() + '=' + element.toString() + '|'
    })
    let template = this.$refs.template as any
    template.form.result = outStrs
  }
}
</script>
