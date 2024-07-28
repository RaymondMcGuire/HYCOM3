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
export default class Chapter6Section44 extends Vue {
  private title = '5.4.4 护坦上的动水压力';
  private initData = {
    v_1: 17.476,
    '\\gamma': 9.8,
    '\\beta': 113.291
  };
  private data = {
    v_1: '',
    '\\gamma': '',
    '\\beta': ''
  };

  private formulas = {
    0: '\\gamma :水的重度,kN/m^3',
    1: 'v_1 :水舌对护坦的冲击流速，m/s',
    2: '\\beta :水舌入射角',
    3: 'P_d:动水压力强度,kN/m^2'
  };

  private demoContent =
  '黄河拉西瓦水电站混凝土拱坝,左、中、右三个表孔,鼻坎为跌流,左表孔鼻坎高程2436.18m,中表孔鼻坎高程2434.62m,右表孔鼻坎高程2436.18m,河床高程2214.5m,校核情况下单孔泄量均为1320m3/s,左、中、右表孔过流宽度均为13m,计算左表孔射流跌落冲击底板动水压力。'
  private demoResult = '左表孔射流跌落冲击底板动水压力=128.83';

  public beforeOnCalculate() {
    let value = Chapter6.htsdsyl(
      +this.data['\\gamma'],
      +this.data.v_1,
      +this.data['\\beta']
    )

    let outStr = '左表孔射流跌落冲击底板动水压力=' +
      value.toFixed(2).toString()
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
