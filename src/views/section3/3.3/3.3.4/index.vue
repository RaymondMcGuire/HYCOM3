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
import { Chapter2 } from '@/hycom_lib/chapter2'

import HycomForm from '@/components/HycomForm/index.vue'

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter4Section331 extends Vue {
  private title = '3.3.4 明流洞内水面线计算';
  private initData = {
    Q_c: 2310,
    b_c: 10,
    'b_{c}^{\\prime}': 8,
    n_z: 0.014,
    i_1: 0.14,
    i_2: 0.004692,
    e: 11,
    '\\varepsilon': 0.914,
    '\\Delta_{L1}': 206.39,
    '\\Delta_{L2}': 442.937
  };
  private data = {
    Q_c: '',
    b_c: '',
    'b_{c}^{\\prime}': '',
    n_z: '',
    i_1: '',
    i_2: '',
    e: '',
    '\\varepsilon': '',
    '\\Delta_{L1}': '',
    '\\Delta_{L2}': ''
  };

  private formulas = {
    0: 'Q_c :单个泄槽流量,m^3/s',
    1: 'n_z :糙率',
    2: 'b_c,b_{c}^{\\prime} :单个泄槽宽,m',
    3: '\\phi :流速系数,一般0.95 左右',
    4: 'H_0 :计算起始断面渠底以上总水头',
    5: 'L :泄槽长,m',
    6: '\\Delta_{L1},\\Delta_{L2} :分段长度,m',
    7: 'h_1 :分段起始断面水深,m',
    8: 'h_2 :分段末断面水深,m',
    9: 'v_1 :分段起始断面流速,m/s',
    10: 'v_2 :分段末断面流速,m/s',
    11: '\\alpha_1,\\alpha_2 :流速分布不均匀系数,取1.05',
    12: '\\theta :泄槽底坡角度',
    13: 'i_1,i_2 :泄槽底坡',
    14: 'J :分段内的摩阻坡率',
    15: 'v :分段平均流速',
    16: 'R :分段平均水力半径',
    17: 'h_c :起始断面水深为闸孔后的收缩水深',
    18: '\\zeta :掺气水深系数,取1~1.4s/m',
    19: 'N :计算断面个数',
    20: 'e :出口断面开启高度,m',
    21: '\\varepsilon :垂直收缩系数'
  };

  private demoContent =
    '国内某水电站,水库校核水位1860.4m,正常蓄水位1856m,汛限水位1854m,中孔泄洪洞进水口为有压短管,有压短管出口高程1804m,后接"龙抬头"无压泄洪洞,隧洞为城门洞型,隧洞断面尺寸为10m x 15m,底坡为0.14,洞长206.39m,反弧末段高程1778.007m,反弧段后底坡为0.00472、洞长442.937m.进水口底板高程1804m,工作闸门尺寸8m x 11m,流量系数mu＝0.871,垂直收缩系数epsilon＝0.914,混凝土衬砌糙率0.014,求校核洪水时中孔泄洪洞沿程水面线(净水深、掺气水深、空化数、隧洞净孔断面).';
  private demoResult = '求得第一断面h_1为6.51.第二断面h_2为7.92.';

  public beforeOnCalculate() {
    let value = Chapter2.sgysdsmxjs(
      +this.data.Q_c,
      +this.data.b_c,
      +this.data['b_{c}^{\\prime}'],
      +this.data.n_z,
      +this.data.i_1,
      +this.data.e,
      +this.data['\\varepsilon'],
      +this.data['\\Delta_{L1}']
    )
    let value1 = Chapter2.sgysdsmxjs2(
      +this.data.Q_c,
      +this.data.b_c,
      +this.data.n_z,
      +this.data.i_2,
      value,
      +this.data['\\Delta_{L2}']
    )

    let outStr =
      'h1:' +
      value.toFixed(2).toString() +
      '|' +
      'h2:' +
      value1.toFixed(2).toString()
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
