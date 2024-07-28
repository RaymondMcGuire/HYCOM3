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
export default class Chapter9Section3 extends Vue {
  private title = '8.5 管（渠）道局部水头损失';
  private initData = {
    v: 1.0,
    n_j: '1,1,800,270,800,270,1',
    '\\xi_j': '0.5,8,0.022,0.99,0.183,0.07,1',
    h_y: 365.8
  };
  private data = {
    v: '',
    n_j: '',
    '\\xi_j': '',
    h_y: ''
  };

  private formulas = {
    0: 'Q :管道设计流量,m^3/s',
    1: '\\zeta_j :管道局部水头损失系数,取值见表9.3-1',
    2: 'n :管道局部水头损失系数的个数',
    3: '\\upsilon :管道断面水流平均流速,m/s',
    4: 'h_j :管道局部水头损失,m',
    5: 'h_y :管道沿程水头损失,m'
  };

  private demoContent =
    '某供水工程,管道长135km,设计流量为0.07m^3/s,经济流速1.0m/s,经济管径0.3m,计算管道沿程水头损失.';
  private demoResult = '求得管道沿程水头损失为23.45';

  public beforeOnCalculate() {
    let nj = this.data.n_j.split(',').map((item) => {
      return parseFloat(item)
    })
    let xij = this.data['\\xi_j'].split(',').map((item) => {
      return parseFloat(item)
    })
    let values = Chapter7.gdjbss(+this.data.v, nj, xij, +this.data.h_y)
    let outStr = '管道沿程水头损失=' + values[0].toFixed(2).toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
