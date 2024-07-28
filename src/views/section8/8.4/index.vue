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
import { Chapter7 } from '@/hycom_lib/chapter7'

import HycomForm from '@/components/HycomForm/index.vue'

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter9Section23 extends Vue {
  private title = '8.4 输配水管道和配水管网水力平差计算';
  private initData = {
    Q: 0.07,
    d_j: 0.3,
    C_h: 145,
    l: 135000
  };
  private data = {
    Q: '',
    d_j: '',
    C_h: '',
    l: ''
  };

  private formulas = {
    0: 'Q :管道设计流量,m^3/s',
    1: 'l :管道计算长度',
    2: 'd_j :管道计算内径,m',
    4: 'C_h : 海曾—威廉系数Hazen Wiliams,水泥砂浆内衬的钢管铸铁管取120 \\sim 130、涂料内衬的钢管铸铁管取130 \\sim 140',
    5: '未做内衬的钢管铸铁管取90 \\sim 100、预应力钢筒混凝土管(PCCP)取120 \\sim 140、化学管材(聚氯乙烯管及玻璃钢管)取140 \\sim 150',
    3: 'h_y :管道沿程水头损失,m'
  };

  private demoContent =
    '某供水工程,管道长135km,设计流量为0.07m^3/s,经济流速1.0m/s,经济管径0.3m,计算管道沿程水头损失.';
  private demoResult = '求得管道沿程水头损失为365.75';

  public beforeOnCalculate() {
    let values = Chapter7.spsgd(
      +this.data.Q,
      +this.data.d_j,
      +this.data.C_h,
      +this.data.l
    )
    let outStr = '管道沿程水头损失=' + values[0].toFixed(2).toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
