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
export default class Chapter7Section1 extends Vue {
  private title = '7.1 经济管径的计算';
  private initData = {
    v_e: 5.5,
    'Q_{max}': 579.76
  };
  private data = {
    v_e: '',
    'Q_{max}': ''
  };

  private formulas = {
    0: '\\upsilon_e :管道经济流速,m/s',
    1: 'D :管道直径,m',
    2: 'Q_{max} :管道中的最大设计流量,m^3/s'
  };

  private demoContent =
    '某水电站发电引水管道为压力钢管,单管最大流量为579.76m^3/s,设计水头为66m, v_e为水电站压力钢管经济流速取5.5m/s,初拟管道经济直径.';
  private demoResult = '求得管道直径为11.59';

  public beforeOnCalculate() {
    let value = Chapter6.jsjjzj(+this.data.v_e, +this.data['Q_{max}'])
    let outStr = '管道直径=' + value.toFixed(2).toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
