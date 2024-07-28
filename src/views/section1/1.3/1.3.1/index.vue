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
export default class Chapter1Section4Sub2 extends Vue {
  private title = '1.3.1 挑流水舌外缘挑距计算';
  private initData = {
    'H_{库水位}': 233,
    'H_{鼻坎}': 98.466,
    v_0: 2.6,
    h: 7.781,
    '\\theta': 15,
    h_2: 42.466,
    t: 87.26
  };
  private data = {
    'H_{库水位}': '',
    'H_{鼻坎}': '',
    v_0: '',
    h: '',
    '\\theta': '',
    h_2: '',
    t: ''
  };

  private formulas = {
    0: 'Q :下泄流量,m/s^3',
    1: 'L :自挑流鼻坎坎顶算起的挑流水舌外缘与下游水面交点的水平距离,m',
    2: 'L^{\\prime} :冲坑最低点到挑坎坎顶的水平距离,m',
    3: '\\theta :鼻坎挑角',
    4: 'h :鼻坎法向平均水深,近似取泄槽末端水深,m',
    5: 'g :重力加速度,m/s2,取9.8',
    6: 'v_0 :水库堰前行近流速,m/s',
    7: 'H_0 :鼻坎坎顶总水头,m',
    8: 'H_{库水位} :水库水位,m',
    9: 'H_{鼻坎} :鼻坎坎顶高程,m',
    10: 'h_1 :挑流鼻坎坎顶铅直方向水深,m',
    11: 'h_2 :鼻坎坎顶至下游水面高差,m,如计算最深点距鼻坎的距离,该值采用坎顶至冲坑最深点高程差,m',
    12: 'v_1 :鼻坎坎顶水面流速,m/s',
    13: 'T :冲坑深度,由河床底面至坑低,m',
    14: '\\beta :水舌外缘与下游水面夹角',
    15: 'L_c :水面以下水舌长度的水平投影计算',
    16: 't :自下游水面至坑底最大水垫深度,m,当t<H_2时,t采用H_2,m'
  };

  private demoContent =
    '同上例,某国外水电站工程,溢洪道为实用堰,弧形闸门控制,4 孔闸,单孔净宽15m,堰前行近流速为2.6m,PMF 洪水下,水库水位233m,下泄流量14600m3/s,泄槽有一2m 厚的中墩,单槽宽25m,鼻坎坎顶高程98.466m,下游水位56m,下游河床高程37m,鼻坎挑角15º,计算PMF洪水下挑距.';
  private demoResult = '求得PMF洪水下挑距为333.65';

  public beforeOnCalculate() {
    let outStr =
      'PMF洪水下挑距=' +
      Chapter1.tj(
        +this.data['H_{库水位}'],
        +this.data['H_{鼻坎}'],
        +this.data.v_0,
        +this.data.h,
        +this.data['\\theta'],
        +this.data.h_2,
        +this.data.t
      )
        .toFixed(2)
        .toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
