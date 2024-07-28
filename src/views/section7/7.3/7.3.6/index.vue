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
export default class Chapter7Section3Sub6 extends Vue {
  private title = '7.3.6 间接水锤计算';
  private initData = {
    '\\tau_0': 0,
    '\\rho': 2.4028,
    '\\sigma': 0.2187,
    H_0: 73.4
  };
  private data = {
    '\\tau_0': '',
    '\\rho': '',
    '\\sigma': '',
    H_0: ''
  };

  private formulas = {
    0: '\\rho :管道特征系数',
    1: 'C :水锤波速,m/s',
    2: '\\sigma :水锤的特性参数',
    3: '\\tau_0 :孔口相对开度',
    4: 'H_0 :静水头,m'
  };

  private demoContent =
    '资料同上例,导叶关闭时间T_s=11s>t_r=0.85 ,发生间接水锤.机组全增负荷,导叶由全关到全开, tau=0 ,判断发生水锤类型,计算间接水锤压力.机组甩负荷,导叶右全开到全关, tau=1 ,判断发生类型,计算间接水锤压力.';
  private demoResult = '求得正水锤为41.09,负水锤为26.34';

  public beforeOnCalculate() {
    let values = Chapter6.jssc(
      +this.data['\\tau_0'],
      +this.data['\\rho'],
      +this.data['\\sigma'],
      +this.data.H_0
    )
    let outStr =
      '正水锤:' +
      values[0].toFixed(2).toString() +
      '|负水锤:' +
      values[1].toFixed(2).toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
