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
import { Section2 } from '@/hycom_lib/section2'

import HycomForm from '@/components/HycomForm/index.vue'

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter1Section1Sub2 extends Vue {
  public title = '1.1.2.1 闸墩侧收缩系数ε计算';
  public initData = {
    v_0: 3,
    H: 4.8,
    n: 2,
    b: 11,
    B: 28,
    d: 1.5,
    K: 0.1,
    P_1: 5.2
  };
  public data = {
    v_0: '',
    H: '',
    n: '',
    b: '',
    B: '',
    d: '',
    K: '',
    P_1: ''
  };

  public formulas = {
    1: 'Q :流量,m^3/s',
    2: 'm :流量系数',
    3: '\\varepsilon :侧收缩系数',
    5: 'n :孔数',
    4: 'b :单孔宽度,m',
    6: 'H :堰上水头,m,取堰前3H_{0} \\sim 6H_{0}处',
    7: 'v_0 :行进流速,m/s',
    8: 'g :重力加速度,m/s^2,取9.8',
    9: 'P_1 :上游堰高,m',
    10: 'K :闸墩形状影响系数',
    11: 'd :中墩厚度',
    12: 'B :堰上游距堰3H_{0} \\sim 4H_{0} 处的宽度'
  };

  public demoContent =
    '某水利工程水库校核水位615m,溢洪道进水口控制堰为宽顶堰,堰长20.5m,进口底板高程605m,堰顶高程610.2m,进口底坎边缘用半径0.8m 圆弧修圆,2孔,单孔宽度11m,闸墩厚度1.5m,K=0.1,引渠宽度28m,计算控制堰侧收缩系数。';
  public demoResult = '求得侧收缩系数为0.98';
  public beforeOnCalculate() {
    let epslion = Section2.ddkcssxs(
      +this.data.B,
      +this.data.b,
      +this.data.K,
      +this.data.P_1,
      +this.data.H,
      +this.data.v_0,
      +this.data.d,
      +this.data.n
    )

    let outStr = '侧收缩系数 ε :'
    outStr += epslion.toFixed(5).toString()
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
