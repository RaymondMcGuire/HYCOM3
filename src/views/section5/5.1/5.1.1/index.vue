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
export default class Chapter6Section11 extends Vue {
  private title = '5.1.1 开敞式溢流堰的泄量计算';
  private initData = {
    C: 1.0,
    m: 0.463,
    '\\varepsilon': 0.95,
    '\\sigma_m': 1.0,
    n: 3,
    B: 13,
    H_w: 14
  };
  private data = {
    C: '',
    m: '',
    '\\varepsilon': '',
    '\\sigma_m': '',
    n: '',
    B: '',
    H_w: ''
  };

  private formulas = {
    0: 'Q :流量,m^3/s',
    1: 'B :总净宽,m',
    2: 'b :单孔宽度,m',
    3: 'n :闸孔数目',
    4: 'H_w :堰顶以上作用水头,m',
    5: 'm :流量系数',
    6: '\\varepsilon :侧收缩系数,根据闸墩厚度及墩头形状,可取0.90~0.95',
    7: 'C :上游面坡度修正系数,上游面为铅直面时取1.0',
    8: '\\sigma_m :淹没系数,不淹没时取1.0'
  };

  private demoContent =
    '国内某大型水电站,正常蓄水位2452m,总库容10.79 亿m3,最大坝高250m,水库校核洪水位2457m,表孔溢流堰3 孔等宽布置,每孔净宽13m,堰面曲线为WES 曲线,堰顶高程2443m.流量系数为0.463,侧收缩系数0.95,求校核情况下表孔的泄量.';
  private demoResult = '求得校核情况下表孔的泄量为3978.22';

  public beforeOnCalculate() {
    let value = Chapter4.kcsylydxl(
      +this.data.C,
      +this.data.m,
      +this.data['\\varepsilon'],
      +this.data['\\sigma_m'],
      +this.data.n,
      +this.data.B,
      +this.data.H_w
    )
    let outStr = '泄量=' + value.toFixed(2).toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
