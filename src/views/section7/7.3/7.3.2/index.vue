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
export default class Chapter7Section3Sub2 extends Vue {
  private title = '7.3.2 管道的特征系数计算';
  private initData = {
    C: 619.05,
    'v_{max}': 5.584,
    H_0: 73.4
  };
  private data = {
    C: '',
    'v_{max}': '',
    H_0: ''
  };

  private formulas = {
    0: '\\rho :管道特征系数',
    1: 'v_{max} :管道中水流的最大流速,m/s',
    3: 'H_0 :静水头,m',
    4: 'C :水锤波速,m/s'
  };

  private demoContent =
    '某水电站单机最大流量为579.76m^3/s,管道直径11.5m,最大工作水头73.4m,求管道的特征系数.';
  private demoResult = '求得管道的特征系数为2.4028';

  public beforeOnCalculate() {
    let value = Chapter6.gdtzxs(
      +this.data.C,
      +this.data['v_{max}'],
      +this.data.H_0
    )
    let outStr = '管道特征系数=' + value.toFixed(4).toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
