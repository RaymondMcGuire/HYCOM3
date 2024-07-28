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
import { Chapter7 } from '@/hycom_lib/chapter7'

import HycomForm from '@/components/HycomForm/index.vue'

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter9Section21 extends Vue {
  private title = '8.2 塑料管管（渠）道沿程水头损失';
  private initData = {
    '\\upsilon': 1.0,
    d_j: 0.3,
    v: 1.31e-6,
    l: 135000
  };
  private data = {
    '\\upsilon': '',
    d_j: '',
    v: '',
    l: ''
  };

  private formulas = {
    0: 'Q :流量,m^3/s',
    1: 'l :管道计算长度',
    3: 'd_j :管道计算内径,m',
    4: '\\upsilon :管道断面水流平均流速,m/s',
    5: 'v :运动粘滞系数、1.31 x 10^{-2}cm^2/s',
    6: 'h_y :管道沿程水头损失,m'
  };

  private demoContent =
    '某供水工程,管道长135km,设计流量为0.07m^3/s,经济流速1.0m/s,经济管径0.3m,计算管道沿程水头损失.';
  private demoResult = '求得管道沿程水头损失为352.83';

  public beforeOnCalculate() {
    let value = Chapter7.slgdyctss(
      +this.data['\\upsilon'],
      +this.data.d_j,
      +this.data.v,
      +this.data.l
    )
    let outStr = '管道沿程水头损失=' + value.toFixed(2).toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
