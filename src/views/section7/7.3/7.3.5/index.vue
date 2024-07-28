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
export default class Chapter7Section3Sub5 extends Vue {
  private title = '7.3.5 直接水锤计算';
  private initData = {
    C: 619.05,
    v_0: 5.584
  };
  private data = {
    C: '',
    v_0: ''
  };

  private formulas = {
    1: 'C :水锤波速,m/s',
    2: 'v_0 :初始水流速,m/s',
    3: '\\Delta H :水锤压强'
  };

  private demoContent =
    '某水电站的基本资料同上例,如果发生水轮机关闭时间小于一个水锤波的时间T_s =0.8s, T_s < t_r=1.0012s则发生直接水锤,计算水锤压力';
  private demoResult = '求得水锤压力352.73';

  public beforeOnCalculate() {
    let value = Chapter6.zjsc(+this.data.C, +this.data.v_0)
    let outStr = '水锤压力=' + value.toFixed(2).toString()
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
