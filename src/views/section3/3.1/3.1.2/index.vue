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
import { Chapter4 } from '@/hycom_lib/chapter4'

import HycomForm from '@/components/HycomForm/index.vue'

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter4Section2132 extends Vue {
  private title = '3.1.2 泄流流量计算';
  private initData = {
    '\\mu': 0.774,
    T_0: 66.9,
    a: 6.8,
    b: 8,
    h_p: 6.8
  };
  private data = {
    '\\mu': '',
    T_0: '',
    a: '',
    b: '',
    h_p: ''
  };

  private formulas = {
    0: '\\mu :流量系数',
    1: 'T_0 :上游水面与隧洞出口底板高程差及上游行近流速水头之和',
    2: 'h_p :隧洞出口断面水流的平均单位势能,m',
    3: 'a :出口断面洞高,m',
    4: 'b :出口断面宽度,m'
  };

  private demoContent =
    '国内某水电站,校核水位1860.4m,泄洪排沙底孔为有压洞,洞内径9m。工作闸门孔口尺寸8mx6.8m,底板高程1793.5m,流量系数μ=0.774,求泄流量。'
  private demoResult = '求得泄流量为1445.12';

  public beforeOnCalculate() {
    let values = Chapter4.yygdll(
      +this.data['\\mu'],
      +this.data.a,
      +this.data.b,
      +this.data.T_0,
      +this.data.h_p
    )
    let outStr = '泄流量=' + values.toFixed(2).toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
