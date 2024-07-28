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
export default class Chapter6Section43 extends Vue {
  private title = '5.4.3 护坦的冲击流速';
  private initData = {
    q: 101.538,
    Z: 221.68,
    Z0: 188.93,
    t_d: 110.203,
    '\\phi': 0.95,
    '\\nabla': 0
  };
  private data = {
    q: '',
    Z: '',
    Z0: '',
    t_d: '',
    '\\phi': '',
    '\\nabla': ''

  };

  private formulas = {
    0: 'Z_0:水舌落水点上、下游水位差,m',
    1: 'Z :鼻坎至河床高差,m',
    2: 'q :鼻坎末端断面单宽流量,m3/(s.m)',
    3: '\\beta:水舌入射角',
    4: 'h_0:水舌落至水面时的厚度, m',
    5: 'v_0:水舌落至水面时的平均流速,m/s',
    6: 't_d:水舌落水点上游水垫深度, m',
    7: '\\phi:流速系数,取0.95',
    8: 'v_1:水舌对护坦的冲击流速,m/s,水舌落点上、下游有水位差或者水舌落点上、下游无明显水位差。'
  };

  private demoContent =
  '黄河拉西瓦水电站混凝土拱坝,左、中、右三个表孔,鼻坎为跌流,左表孔鼻坎高程2436.18m,中表孔鼻坎高程2434.62m,右表孔鼻坎高程2436.18m,河床高程2214.5m,校核情况下单孔泄量均为1320m3/s,左、中、右表孔过流宽度均为13m,。左、中、右表孔上下游水位差分别为188.93m、184.58m、187.37m,计算冲击流速以及水舌入射角。'
  private demoResult = '冲击流速=17.4870, 水舌入射角=113.267';

  public beforeOnCalculate() {
    let value = Chapter6.htcjls(
      +this.data.q,
      +this.data.Z,
      +this.data.Z0,
      +this.data['\\phi'],
      +this.data.t_d,
      +this.data['\\nabla']
    )

    let outStr = '冲击流速=' +
      value.v1.toFixed(4).toString() + ', 水舌入射角=' + value.beta.toFixed(4).toString()
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
