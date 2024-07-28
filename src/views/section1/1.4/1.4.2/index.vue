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
import { Chapter1 } from '@/hycom_lib/chapter1'

import HycomForm from '@/components/HycomForm/index.vue'

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter1Section5Sub2 extends Vue {
  private title = '1.4.2 下挖式消力池的水跃计算';
  private initData = {
    Q: 2253,
    b: 15,
    H_0: 83.216,
    '\\phi': 0.8,
    h_t: 15.87,
    '\\sigma': 1.05
  };
  private data = {
    Q: '',
    b: '',
    H_0: '',
    '\\phi': '',
    h_t: '',
    '\\sigma': ''
  };

  private formulas = {
    0: 'H_0 :以消力池进口底板为基准面的泄水建筑物上游总水头,m',
    1: 'Q :流量,m^3/s',
    2: 'b :消力池入口宽度,m',
    3: '\\sigma :水流淹没度,1.05 \\sim 1.1',
    4: '\\phi :流速系数,0.95',
    5: 'h_t :下游水深,m',
    6: 's :消力池池深,m'
  };

  private demoContent = '同上例,计算消力池长度和池深';
  private demoResult = '求得池深为8.90,池长为137.97';

  public beforeOnCalculate() {
    let objs = Chapter1.xwsxlcsyjs(
      +this.data.Q,
      +this.data.b,
      +this.data.H_0,
      +this.data['\\phi'],
      +this.data.h_t,
      +this.data['\\sigma']
    )
    let outStr = '池深:'
    outStr +=
      objs.s.toFixed(2).toString() + '|池长:' + objs.Lk.toFixed(2).toString()
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
