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
export default class Chapter6Section41 extends Vue {
  private title = '5.4.1 跌流射距估算';
  private initData = {
    q: 101.538,
    Z: 221.68
  };
  private data = {
    q: '',
    Z: ''

  };

  private formulas = {
    0: 'L_d :射距,m',
    1: 'Z :鼻坎至河床高差,m',
    2: 'q :鼻坎末端断面单宽流量,m3/(s.m)'
  };

  private demoContent =
  '黄河拉西瓦水电站混凝土拱坝,左、中、右三个表孔,鼻坎为跌流,左表孔鼻坎高程2436.18m,中表孔鼻坎高程2434.62m,右表孔鼻坎高程2436.18m,河床高程2214.5m,校核情况下单孔泄量均为1320m3/s,左、中、右表孔过流宽度均为13m,计算左表孔挑射距。'
  private demoResult = '左表孔挑射距=77.80';

  public beforeOnCalculate() {
    let value = Chapter6.dlsjgs(
      +this.data.q,
      +this.data.Z
    )

    let outStr = '左表孔挑射距=' +
      value.toFixed(2).toString()
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
