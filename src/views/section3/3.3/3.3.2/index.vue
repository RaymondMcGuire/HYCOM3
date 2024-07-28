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
export default class Chapter4Section3122 extends Vue {
  private title = '3.3.2 有压短管流量计算';
  private initData = {
    '\\mu': 0.84,
    B: 8,
    e: 11,
    H: 56.4,
    '\\varepsilon': 0.914
  };
  private data = {
    '\\mu': '',
    B: '',
    e: '',
    H: '',
    '\\varepsilon': ''
  };

  private formulas = {
    0: 'Q :流量,m^3/s',
    1: '\\mu :流量系数',
    2: 'B :出口断面宽度,m',
    3: 'e :出口断面开启高度,m',
    4: 'H :由有压短管出口底板高程算起的上游水深,m',
    5: '\\varepsilon :有压短管出口的工作闸门垂直收缩系数'
  };

  private demoContent =
    '国内某水电站,水库校核水位1860.4m,正常蓄水位1856m,汛限水位1854m,中孔泄洪洞进水口为有压短管,长度20.35m,有压短管出口底板高程1804m,进口顶部高程1821.118m,检修门槽尺寸8m x 13.6m,工作闸门尺寸8m x 11m,垂直收缩系数ε＝0.914,求校核洪水时中孔泄洪洞的泄量系数及泄量。'
  private demoResult = '求得泄量为2227.9';

  public beforeOnCalculate() {
    let values = Chapter4.dxyydgll(
      +this.data.B,
      +this.data.e,
      +this.data.H,
      +this.data['\\mu'],
      +this.data['\\varepsilon']
    )
    let outStr = '泄量=' + values[0].toFixed(2).toString() + '|出口断面流速=' + values[1].toFixed(2).toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
