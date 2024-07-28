<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-05-21 12:37:10
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-06-12 01:57:35
 * @FilePath: \hycom_app\src\views\section3\3.2\3.3.1\index.vue
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
export default class Chapter3Section3SubSection1 extends Vue {
  private title = '2.2 侧槽水面线计算';
  private initData = {
    Q: 423.62,
    m: 0.5,
    H: 2.2,
    v_0: 1.02,
    '\\zeta_k': 0.85,
    b_s: 7,
    b_m: 17,
    N: 5,
    n_z: 0.014,
    i: 0.0171
  };
  private data = {
    Q: '',
    m: '',
    H: '',
    v_0: '',
    '\\zeta_k': '',
    b_s: '',
    b_m: '',
    N: '',
    n_z: '',
    i: ''
  };

  private formulas = {
    0: 'L :侧槽段溢流前沿总长度,m;侧槽溢洪道一般不设置闸门',
    1: 'Q :溢洪道最大泄流流量,m^3/s',
    2: 'm :流量系数,根据堰型选用;可采用实用堰、宽顶堰河梯形堰等,实际工程以实用堰居多',
    3: 'H :堰上水头,m,取堰前3H_0~6H_0 处',
    4: 'v_0 :引渠的行进流速,m/s',
    5: '\\alpha :动能修正系数,近似取1',
    6: '\\zeta_k :侧槽溢流堰侧收缩系数,无闸实用堰,两边侧墙圆角到直角取0.7~1.0',
    7: 'H_0 :计入行进流速的堰上水头,m',
    8: 'n_z :糙率',
    9: 'b_s :侧槽首端断面宽度,m',
    10: 'b_m :侧槽末端断面宽度,m',
    11: 'i :侧槽槽底坡',
    12: 'n :为1、2、.....N',
    13: 'N :需要计算断面数'
  };

  private demoContent =
    '新疆某水库工程,侧槽溢洪道为实用堰的,无闸门堰流,堰高4.0m,堰顶高程1164m,引渠长约19m,底板高程1160.00m,度65.0m~70.0m,堰前行近流速为1.02m,校核洪水位1166.2m,下泄流量423.62m3/s,溢0-65.00 至溢0+00.00 为堰后汇水槽,侧槽首端底宽7m,底高程为1158m;末端底宽17.0m,底高程为1156.90m,汇水槽底坡i=0.02;溢0+00.0 至溢0+15.00 为侧槽水流的调整段,槽宽17.0m,底坡水平,调整段底部高程1156.90m,泄槽陡坡由收缩段及等宽段组成,溢0+15.00 至溢0+115.00 为收缩段,底宽由17m 缩至12m;溢0+115.00 至溢0+191.50 段,底宽为12m.泄槽底坡i=0.268,槽底高程由1156.9m 降至1110.0m.泄水槽采用整体矩形断面,泄槽长176.5m.计算侧槽溢洪道长度及侧槽内水面线.';
  private demoResult =
    '侧槽溢洪道长度及侧槽内水面线,以5个断面为例:h1=5.4875,h2=6.0868,h3=6.5021,h4=6.7833,h5=6.7759.';

  public beforeOnCalculate() {
    let values = Chapter1.ccdsmxjs(
      +this.data.Q,
      +this.data.m,
      +this.data.H,
      +this.data.v_0,
      +this.data['\\zeta_k'],
      +this.data.b_s,
      +this.data.b_m,
      +this.data.N,
      +this.data.n_z,
      +this.data.i
    )
    let outStrs = ''
    let cnt = 0
    values.forEach((element: any) => {
      cnt++
      outStrs += 'h' + cnt.toString() + '=' + element.toString() + '|'
    })
    let template = this.$refs.template as any
    template.form.result = outStrs
  }
}
</script>
