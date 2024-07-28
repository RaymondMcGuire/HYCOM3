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
import { Chapter6 } from '@/hycom_lib/chapter6'

import HycomForm from '@/components/HycomForm/index.vue'

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter7Section3Sub3 extends Vue {
  private title = '7.3.3 水锤的特性参数计算';
  private initData = {
    L: 309.9,
    'v_{max}': 5.584,
    T_s: 11,
    H_0: 73.4
  };
  private data = {
    L: '',
    'v_{max}': '',
    T_s: '',
    H_0: ''
  };

  private formulas = {
    0: '\\sigma :水锤的特性参数',
    1: 'L :管道长度,m',
    2: 'v_{max} :管道中水流的最大流速,m/s',
    3: 'H_0 :静水头,m',
    4: 'T_s :有效开阀时间'
  };

  private demoContent =
    '同上,进水口长度46.8m,最长的1#管道长度263.1m,水轮机有效关闭时间11s,单机最大过流量579.76m^3/s,求水锤特征系数.';
  private demoResult = '求得水锤特征系数为0.2187';

  public beforeOnCalculate() {
    let value = Chapter6.sctxcs(
      +this.data.L,
      +this.data['v_{max}'],
      +this.data.T_s,
      +this.data.H_0
    )
    let outStr = '水锤特征系数=' + value.toFixed(4).toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
