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
export default class Chapter7Section3Sub1 extends Vue {
  private title = '7.3.1 水锤波速C计算';
  private initData = {
    D: 1150,
    E_s: 2.1e6,
    '\\delta_s': 3,
    E_w: 2e4,
    '\\gamma': 0.001
  };
  private data = {
    D: '',
    E_s: '',
    '\\delta_s': '',
    E_w: '',
    '\\gamma': ''
  };

  private formulas = {
    0: 'E_w,\\gamma :水的体积弹性模量和容重',
    1: '\\delta_s :管道的壁厚',
    2: 'D :管道的直径,m',
    3: 'r :管道的半径',
    4: 'K :抗力系数',
    5: 'E_s :管道材料的弹模'
  };

  private demoContent =
    '某水电站压力钢管,壁厚3cm,直径11.5m,水容重0.001kg/cm3,水的体积弹模2.1*10^4 cm2,其中钢材E_s 2.1*10^6 kg / cm^2 ,求水锤波速.';
  private demoResult = '求得水锤波速为649.18';

  public beforeOnCalculate() {
    let value = Chapter6.scbs(
      +this.data.D,
      +this.data.E_s,
      +this.data['\\delta_s'],
      +this.data.E_w,
      +this.data['\\gamma']
    )
    let outStr = '水锤波速=' + value.toFixed(2).toString()
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
