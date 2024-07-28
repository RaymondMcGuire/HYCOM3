<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-03-11 21:19:00
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-06-04 11:57:57
 * @FilePath: \hycom_app\src\views\chapter1\2.1\2.1.3\index.vue
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
import { tfyType } from '@/hycom_lib/common'

import HycomForm from '@/components/HycomForm/index.vue'

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter1Section1Sub3 extends Vue {
  public title = '1.1.3 驼峰堰泄流能力';
  public initData = {
    驼峰堰堰型: tfyType.a,
    P_1: 2.5,
    v_0: 3.5,
    H: 4.525,
    '\\varepsilon': 0.817,
    n: 1,
    b: 25
  };
  public data = {
    驼峰堰堰型: '',
    P_1: '',
    v_0: '',
    H: '',
    '\\varepsilon': '',
    n: '',
    b: ''
  };
  public formulas = {
    0: 'Q :流量,m^3/s',
    1: 'n :闸孔数目',
    2: 'b :单孔宽度,m',
    3: '\\varepsilon :侧收缩系数, 取值低堰可取 \\varepsilon=0.80 \\sim 0.90 ,均值0.85',
    4: 'P_1 :上游堰高,m',
    5: 'g :重力加速度,m/s^2,取9.8',
    6: 'H_0 :计入行进流速的堰上水头,m',
    7: 'H :堰上水头,m',
    8: 'm :流量系数'
  };

  public demoContent =
    '南方某水利工程,溢洪道为驼峰堰,堰型为a型,堰高P1=2.5m,H=4.525m,v0 =3.5m/s,n=1,b=25m,epsilon=0.817,计算流量。';
  public demoResult = '求得流量为458.63';
  public beforeOnCalculate() {
    let objs = Chapter1.tfy(
      +this.data.P_1,
      +this.data.v_0,
      +this.data.H,
      +this.data['\\varepsilon'],
      +this.data.n,
      +this.data.b,
      +this.data.驼峰堰堰型
    )
    let outStr = '流量系数m:'
    outStr +=
      objs.m.toFixed(2).toString() + '|流量Q:' + objs.Q.toFixed(2).toString()
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
