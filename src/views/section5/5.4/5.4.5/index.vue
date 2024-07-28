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
export default class Chapter6Section45 extends Vue {
  private title = '5.4.5 下游无护坦的最大冲坑水垫深度';
  private initData = {
    q: 101.538,
    Z: 221.68,
    K: 1.1
  };
  private data = {
    q: '',
    Z: '',
    K: ''

  };

  private formulas = {
    0: 't_d :自下游水面至坑底最大水垫深度,m',
    1: 'Z :鼻坎至河床高差,m',
    2: 'q :鼻坎末端断面单宽流量,m3/(s.m)'
  };

  private demoContent =
  '黄河拉西瓦水电站混凝土拱坝,左、中、右三个表孔,鼻坎为跌流,左表孔鼻坎高程2436.18m,中表孔鼻坎高程2434.62m,右表孔鼻坎高程2436.18m,河床高程2214.5m,校核情况下单孔泄量均为1320m3/s,左、中、右表孔过流宽度均为13m,计算自下游水面至坑底最大水垫深度。'
  private demoResult = '自下游水面至坑底最大水垫深度=42.77';

  public beforeOnCalculate() {
    let value = Chapter6.xywhtzdcksdsd(
      +this.data.K,
      +this.data.q,
      +this.data.Z
    )

    let outStr = '自下游水面至坑底最大水垫深度=' +
      value.toFixed(2).toString()
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
