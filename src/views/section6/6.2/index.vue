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
import { Chapter5 } from '@/hycom_lib/chapter5'
import { shapeType, syyType } from '@/hycom_lib/common'

import HycomForm from '@/components/HycomForm/index.vue'

@Component({
  components: {
    HycomForm
  }
})
export default class Chapter7Section2 extends Vue {
  private title = '6.2 渠道非均匀流水面线计算';
  private initData = {
    实用堰类型: syyType.syy,
    断面形状: shapeType.LADDER,
    '\\phi': 0.95,
    h: 8.95,
    '\\alpha': 1,
    Q: 500,
    b: 45,
    m: 2,
    n_z: 0.025,
    i: 0.000333333,
    L: 3386,
    N: 7,
    Q_c: 7300,
    b_c: 25,
    H_0: 34.5449
    // i_b: 0.1
  };
  private data = {
    实用堰类型: '',
    断面形状: '',
    '\\phi': '',
    h: '',
    '\\alpha': '',
    Q: '',
    b: '',
    m: '',
    n_z: '',
    i: '',
    L: '',
    N: '',
    Q_c: '',
    b_c: '',
    H_0: ''
    // i_b: ''
  };

  private formulas = {
    0: 'Q_c :流量,m^3/s',
    110: 'Q :流量,m^3/s',
    1: 'A :渠道过流断面面积,m^2',
    2: 'x :湿周,m',
    3: 'R :水力半径,m',
    4: 'B :梯形渠道水面宽度,m',
    5: 'b_c :梯形渠道底部宽度或矩形断面宽度,m',
    50: 'b :梯形渠道底部宽度或矩形断面宽度,m',
    6: 'm :边坡系数',
    7: 'h :水深,m',
    8: 'n_z :糙率',
    9: 'i :泄槽底坡',
    10: '\\phi :流速系数,一般0.95 左右',
    11: 'H_0 :计算起始断面渠底以上总水头',
    12: '\\theta :泄槽底板与水面夹角',
    14: 'L :渠道长,m',
    15: 'N :计算断面个数',
    17: '\\alpha :流速的动力系数'
  };

  private demoContent =
    '某河湖连通工程,布置一渠道将水引至排水闸,渠道全长为3386m,梯形断面,边坡系数2.0,底宽45m,糙率为0.025,底坡为1/3000.当过闸流量为500m3/s 时,闸前水深为8.95m,计算排水渠道的水面线.';
  private demoResult =
    '求得缓流a1型壅水曲线.h1=8.950|h2=8.781|h3=8.615|h4=8.451|h5=8.287|h6=8.127|h7=7.968|';

  public beforeOnCalculate() {
    let values = Chapter5.mqfjyls(
      +this.data.实用堰类型,
      +this.data.断面形状,
      +this.data['\\phi'],
      +this.data.h,
      +this.data['\\alpha'],
      +this.data.Q,
      +this.data.b,
      +this.data.m,
      +this.data.n_z,
      +this.data.i,
      +this.data.L,
      +this.data.N,
      +this.data.Q_c,
      +this.data.b_c,
      +this.data.H_0,
      0.1
    )
    let outStr = ''
    outStr += values[0] + '|'
    for (let index = 0; index < values[1].length; index++) {
      const element = values[1][index]
      outStr += 'h' + (index + 1).toString() + '=' + element.toString() + '|'
    }
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
