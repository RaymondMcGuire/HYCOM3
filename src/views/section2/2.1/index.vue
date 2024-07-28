<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-03-11 21:19:00
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-06-12 01:56:31
 * @FilePath: \hycom_app\src\views\section3\3.2\3.2.1\index.vue
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
export default class Chapter3Section2SubSection1 extends Vue {
  private title = '2.1 侧槽溢流前缘的总长度计算';
  private initData = {
    Q: 424,
    m: 0.5,
    H: 2.2,
    v_0: 1.02,
    '\\zeta_k': 0.88
  };
  private data = {
    Q: '',
    m: '',
    H: '',
    v_0: '',
    '\\zeta_k': ''
  };

  private formulas = {
    0: 'L :侧槽段溢流前沿总长度,m;侧槽溢洪道一般不设置闸门',
    1: 'Q :溢洪道最大泄流流量,m^3/s',
    2: 'm :流量系数,根据堰型选用;可采用实用堰、宽顶堰河梯形堰等,实际工程以实用堰居多',
    3: '\\zeta_k :侧槽溢流堰侧收缩系数,无闸实用堰,两边侧墙圆角到直角取0.7 \\sim 1.0',
    4: 'H :堰上水头,m,取堰前3H_0 \\sim 6H_0处',
    5: 'v_0 :引渠的行进流速,m/s',
    6: 'H_0 :计入行进流速的堰上水头,m'
  };

  private demoContent =
    '新疆某水库工程,侧槽溢洪道为实用堰的,无闸门堰流,堰高4.0m,堰顶高程1164m,引渠长约19m,底板高程1160.00m,度65.0m~70.0m,校核洪水位1166.2m,下泄流量423.62m^3/s.计算侧槽溢洪道前沿长度.';
  private demoResult = '求得侧槽溢洪道前沿长为64.36';

  public beforeOnCalculate() {
    let outStr =
      '侧槽溢洪道前沿长=' +
      Chapter1.cydylqydzcdjs(
        +this.data.Q,
        +this.data.m,
        +this.data.H,
        +this.data.v_0,
        +this.data['\\zeta_k']
      )
        .toFixed(2)
        .toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
