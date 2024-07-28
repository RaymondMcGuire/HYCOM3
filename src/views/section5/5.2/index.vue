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
export default class Chapter6Section21 extends Vue {
  private title = '5.2 溢流坝面或泄槽水面波动及掺气水深';
  private initData = {
    h: 14,
    '\\varsigma': 1.1,
    v: 21.875
  };
  private data = {
    h: '',
    '\\varsigma': '',
    v: ''
  };

  private formulas = {
    0: 'h :溢流面计算断面的水深,m',
    1: 'h_b :溢流面计算断面的掺气水深,m',
    2: 'v :不掺气情况下计算断面的流速,m/s',
    3: '\\varsigma :修正系数,取1~1.4s/m.'
  };

  private demoContent = '同5.1算例,求溢流面计算断面的掺气水深';
  private demoResult = '求得溢流面计算断面的掺气水深为17.3688';

  public beforeOnCalculate() {
    let value = Chapter4.smbdjsqjs(
      +this.data.h,
      +this.data['\\varsigma'],
      +this.data.v
    )
    let outStr = '掺气水深=' + value.toFixed(4).toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
