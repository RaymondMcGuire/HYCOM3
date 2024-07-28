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
export default class Chapter1Section1Sub4No1 extends Vue {
  public title = '1.1.4 带胸墙孔口泄流能力（非淹没流、闸门全开）';
  public initData = {
    H: 23,
    v_0: 3,
    b: 10,
    n: 3,
    P_1: 15,
    H_d: 17.7,
    D: 8.5
  };
  public data = {
    H: '',
    v_0: '',
    b: '',
    n: '',
    P_1: '',
    H_d: '',
    D: ''
  };

  public formulas = {
    12: 'Q :流量,m^3/s',
    0: 'B :孔口总净宽,m',
    1: 'b :单孔宽度,m',
    2: 'n :孔数目',
    3: 'D :孔口高度,m',
    4: 'g :重力加速度,m/s^2,取9.8',
    5: 'v_0 :堰前3H_0\\sim 6H_0处断面的平均流速,m/s',
    6: 'H_0 :计入行进流速的孔口堰上水头,m',
    7: 'H_{max} :水库校核水位时堰顶以上最大水头,m',
    8: 'H_d :定型设计水头,m,可按堰顶以上最大水头H_{max}的H_d=56\\%\\sim 77\\%',
    9: '\\mu :孔口流量系数',
    10: 'H :堰上水头,m',
    11: 'P_1 :上游堰高,m'
  };

  public demoContent =
    '某国内(刘家峡)水电站工程,溢洪道为实用堰,平板闸门控制,3孔闸,孔口高度8.5m,单孔净宽10m,堰前行近流速为3m/s,校核洪水位1738m,堰顶高程1715m,上游堰高15m,计算闸门全开时的泄流量.';
  public demoResult = '求得闸门全开时的泄流量为4213.54';

  public beforeOnCalculate() {
    let results = Chapter1.dxqsyy(
      +this.data.H,
      +this.data.v_0,
      +this.data.b,
      +this.data.n,
      +this.data.P_1,
      +this.data.H_d,
      +this.data.D
    )

    let outStr =
      '泄流量Q=' +
        results.Q
          .toFixed(2)
          .toString() + '; 孔口自由出流流量系数μ=' + results.mu.toFixed(3)
        .toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
