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
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Section2 } from '@/hycom_lib/section2'

import HycomForm from '@/components/HycomForm/index.vue'

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter1Section5Sub1 extends Vue {
  private title = '1.4.1 水平光面护坦上的水跃计算';
  private initData = {
    Q: 2253,
    b: 15,
    H_0: 83.216,
    '\\phi': 0.8
  };
  private data = {
    Q: '',
    b: '',
    H_0: '',
    '\\phi': ''
  };

  private formulas = {
    0: 'E_0 :以下游收缩断面处为基准面的泄水建筑物上游的总能头(计入上游水流行进流速v_0),m',
    1: 'E :以下游收缩断面处为基准面的泄水建筑物上游的水头(不计入上游水流行进流速v_0),m',
    2: 'Q :流量,m^3/s',
    3: 'b :消力池进口宽度,m',
    4: 'H_0 :以消力池进口底板为基准面的泄水建筑物上游总水头,m',
    5: '\\phi :流速系数; 低坝 : 实用堰 (\\phi=0.9 \\sim 0.95); 实用堰闸孔 (\\phi=0.85 \\sim 0.95); 宽顶堰 (\\phi=0.8 \\sim 0.9); 宽顶堰闸孔 (\\phi=0.75 \\sim 0.85)',
    6: '高坝 : \\phi=\\sqrt{1-0.1 \\frac{E^{1/2}}{(Q/b)^{1/3}} } '
  };

  private demoContent =
    '某泄水建筑物,水流沿泄槽扩散进入消力池,消力池进口宽15m,底板高程1778m,水库校核水位为1860.4m,泄量为2253m3/s,下游水位1793.87m,计算水跃长度.';
  private demoResult = '求得水跃长度为172.46';

  public beforeOnCalculate() {
    let outStr =
      '水跃长度=' +
      Section2.spghhtsdsyjs(
        +this.data.Q,
        +this.data.b,
        +this.data.H_0,
        +this.data['\\phi'])
        .toFixed(2)
        .toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
