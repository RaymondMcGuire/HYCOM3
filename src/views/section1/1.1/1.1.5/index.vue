<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-03-11 21:19:00
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-06-04 11:58:04
 * @FilePath: \hycom_app\src\views\chapter1\2.1\2.1.4\2.1.4.2\index.vue
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
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Chapter1 } from '@/hycom_lib/chapter1'

import HycomForm from '@/components/HycomForm/index.vue'

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter1Section1Sub4No2 extends Vue {
  public title = '1.1.5 平底带胸墙孔口式闸';
  public initData = {
    H: 20.65,
    v_0: 1.6,
    b: 10,
    n: 1,
    '\\mu': 0.9,
    D: 10
  };
  public data = {
    H: '',
    v_0: '',
    b: '',
    n: '',
    '\\mu': '',
    D: ''
  };

  public formulas = {
    12: 'Q :流量,m^3/s',
    0: 'B :孔口总净宽,m',
    1: 'b :单孔宽度,m',
    2: 'n :孔数数目',
    3: 'D :孔口高度,m',
    7: 'H :堰上水头,m',
    5: 'v_0 :堰前3H_0\\sim 6H_0处断面的平均流速,m/s',
    4: 'g :重力加速度,m/s^2,取9.8',
    6: 'H_0 :自闸底算起的的堰上水头(包括行近流速水头),m',
    9: '\\mu :流量系数,圆滑孔口的流量系数在设计时可取0.90'
  };

  public demoContent =
    '某水利工程,进水闸孔口高度10m,单孔净宽10m,堰前行近流速为1.6m,设计洪水下堰上水头20.65m,孔口自由出流流量系数0.9,计算下泄流量.';
  public demoResult = '求得下泄流量为1308.25';

  public beforeOnCalculate() {
    let outStr =
      '泄流量Q=' +
      Chapter1.dxqpdzxljs(
        +this.data.H,
        +this.data.v_0,
        +this.data.b,
        +this.data.n,
        +this.data['\\mu'],
        +this.data.D
      )
        .toFixed(2)
        .toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
