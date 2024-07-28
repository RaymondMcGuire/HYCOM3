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
export default class Chapter9Section12 extends Vue {
  private title = '8.1 管（渠）道总水头损失';
  private initData = {
    h_y: 365.8,
    h_j: 36.58
  };
  private data = {
    h_y: '',
    h_j: ''
  };

  private formulas = {
    2: 'Q :管道设计流量,m^3/s',
    3: 'h_y :管(渠)道沿程水头损失,m',
    4: 'h_j :管(渠)道局部水头损失,m'
  };

  private demoContent =
    '某供水工程,管道长135km,设计流量为0.07m^3/s,经济流速1.0m/s,经济管径0.3m,计算管道沿程水头损失.';
  private demoResult = '求得管道沿程水头损失为402.38';

  public beforeOnCalculate() {
    let value = Chapter7.gdzstss(+this.data.h_y, +this.data.h_j)
    let outStr = '管道沿程水头损失=' + value.toFixed(2).toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
