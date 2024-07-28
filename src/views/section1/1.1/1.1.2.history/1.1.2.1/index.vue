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
export default class Section2121 extends Vue {
  public title = '2.1.2.1 单孔侧收缩系数计算';
  public initData = {
    v_0: 3,
    H: 4.8,
    b: 11,
    B: 28,
    K: 0.1,
    P_1: 5.2
  };
  public data = {
    v_0: '',
    H: '',
    b: '',
    B: '',
    K: '',
    P_1: ''
  };

  public formulas = {
    1: 'm :流量系数',
    2: '\\varepsilon :侧收缩系数',
    3: 'b :单孔宽度,m',
    4: 'H :堰上水头,m,取堰前3H_{0} \\sim 6H_{0}处',
    5: 'v_0 :行进流速,m/s',
    6: 'g :重力加速度,m/s^2,取9.8',
    7: 'P_1 :上游堰高,m',
    8: 'K :闸墩形状影响系数',
    9: 'B :堰上游距堰3H_{0} \\sim 4H_{0} 处的宽度'
  };

  public demoContent =
    '某水利工程水库校核水位615m,溢洪道进水口控制堰为宽顶堰,堰长20.5m,进口底板高程605m,堰顶高程610.2m,进口底坎边缘用半径0.8m 圆弧修圆,2孔,单孔宽度11m,闸墩厚度1.5m,K=0.1,引渠宽度28m,计算控制堰侧收缩系数。';
  public demoResult = '求得侧收缩系数为0.95';
  public beforeOnCalculate() {
    let epslion = Section2.dkcssxs(
      +this.data.B,
      +this.data.b,
      +this.data.K,
      +this.data.P_1,
      +this.data.H,
      +this.data.v_0
    )

    let outStr = '侧收缩系数 ε :'
    outStr += epslion.toFixed(5).toString()
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
