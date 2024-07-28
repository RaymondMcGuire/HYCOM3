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
export default class Chapter6Section12 extends Vue {
  private title = '5.1.2 孔口泄流能力';
  private initData = {
    A_i: '53.988,46.75,46.75,39.875',
    '\\xi_i': '0.1,0.2,0.133,0.1',
    A_j: '53.988,46.75,39.875',
    '\\chi_j': '30.632,28,25.5',
    l_j: '11,16.178,10.721',
    n_z: 0.014,
    A_k: 33,
    n: 2,
    H_w: 92
  };
  private data = {
    A_i: '',
    '\\xi_i': '',
    A_j: '',
    '\\chi_j': '',
    l_j: '',
    n_z: '',
    A_k: '',
    n: '',
    H_w: ''
  };

  private formulas = {
    0: 'Q :流量,m^3/s',
    1: 'A_k :出口处面积,m^2',
    2: 'k :局部水头损失系数计算总数',
    3: '\\xi_i :局部水头损失系数,与之相应的流速所在断面为A_i',
    4: 'A_i :局部水头损失系数\\xi_i管道断面面积,m^2',
    5: 'm :有压孔沿程水头损失计算分段总数',
    6: 'A_j :有压孔沿程水头损失第j段管道断面面积,m^2',
    7: '\\chi_j :有压孔沿程水头损失第j段断面湿周平均值,m',
    8: 'l_i :有压孔沿程水头损失第j段管道长度,m',
    9: 'R_j :有压孔沿程水头损失第j段水力半径的平均值,m',
    10: 'H_w :自由出流时孔口中心处的作用水头,淹没时为上下游水位差,m',
    11: '\\mu :孔口式管道有压流流量系数',
    12: 'n_z :管道糙率',
    13: 'n :有压孔口数',
    14: 'v_k :出口处流速,m/s'
  };

  private demoContent =
    '同上例,深孔为2 孔,有压孔口,进水口底坎高程2371.8m,工作门底坎高程2362.0m,孔口尺寸5.5m x 6.0m,水库校核洪水位2457m,求校核情况下深孔的泄量.左、右深孔均为斜穿坝体的倾斜有压孔,由坝前进口段、坝内有压斜直段和下弯段,以及坝后工作弧门闸室段,长约35m.';
  private demoResult = '求得流量为2448.33出口流速为37.10.';

  public beforeOnCalculate() {
    let ai = this.data.A_i.split(',').map((item) => {
      return parseFloat(item)
    })

    let xii = this.data['\\xi_i'].split(',').map((item) => {
      return parseFloat(item)
    })

    let aj = this.data.A_j.split(',').map((item) => {
      return parseFloat(item)
    })

    let xj = this.data['\\chi_j'].split(',').map((item) => {
      return parseFloat(item)
    })

    let lj = this.data.l_j.split(',').map((item) => {
      return parseFloat(item)
    })

    let values = Chapter4.kkxljs(
      ai,
      xii,
      aj,
      xj,
      lj,
      +this.data.n_z,
      +this.data.A_k,
      +this.data.n,
      +this.data.H_w
    )
    let outStr = ''
    outStr +=
      '流量: ' +
      values[0].toFixed(2).toString() +
      '| 出口流速: ' +
      values[1].toFixed(2).toString() +
      '| 流量系数: ' +
      values[2].toFixed(2).toString()
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
