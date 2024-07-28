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
export default class Chapter6Section5 extends Vue {
  private title = '5.5 溢流坝消力池护坦长度计算';
  private initData = {
    E: 82.4,
    Q: 2253,
    b: 15,
    H_0: 83.216,
    '\\phi': 0.8
  };
  private data = {
    E: '',
    Q: '',
    b: '',
    H_0: '',
    '\\phi': ''
  };

  private formulas = {
    0: 'L :护坦长度,m',
    1: 'h_1 :跃前共轭水深,m',
    2: 'h_2 :跃后共轭水深,m',
    3: 'F_{r1} :跃前断面佛劳德数',
    4: 'Q :流量,m^3/s',
    5: 'H_0 :计入上游水流行进流速v_0,以下游收缩断面处为基准面上游的水头,m',
    6: 'E :以下游收缩断面处为基准面的泄水建筑物的水头(不计入上游水流行进流速v_0),m',
    7: 'v_1 :跃前断面流速,m/s',
    8: 'b :消力池宽度,m',
    9: '\\phi :流速系数',
    10: '低坝 : 实用堰 (\\phi=0.9 \\sim 0.95); 实用堰闸孔 (\\phi=0.85 \\sim 0.95); 宽顶堰 (\\phi=0.8 \\sim 0.9); 宽顶堰闸孔 (\\phi=0.75 \\sim 0.85)',
    11: '高坝 : \\phi=\\sqrt{1-0.1 \\frac{E^{1/2}}{(Q/b)^{1/3}} } '
  };

  private demoContent =
    '某水电工程,水流沿溢流堰进入消力池,消力池进口宽15m,底板高程1778m,水库校核水位为1860.4m,泄量为2253m3/s,下游水位1793.87m,计算水跃长度.';
  private demoResult = '不设辅助消能工:L=165.00, Fr=4.58, h1=4.79, h2=28.70; 不设消力墩,设梳流坎和尾坎:L=107.63, Fr=4.58, h1=4.79, h2=28.70;';

  public beforeOnCalculate() {
    let outStr = Chapter6.ylbxlcht(
      +this.data.H_0,
      +this.data.Q,
      +this.data.b,
      +this.data['\\phi']
    )

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
