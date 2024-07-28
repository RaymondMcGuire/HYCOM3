<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-06-11 21:44:21
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-06-11 22:07:02
 * @FilePath: \hycom_app\src\views\chapter1\2.6\2.6.1\index.vue
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
-->
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
export default class Chapter2Section6Sub1 extends Vue {
  private title = '1.6.1 台阶溢洪道水力计算昌桑计算方法';
  private initData = {
    Q: 76,
    b: 10,
    h: 0.3,
    l: 2.174,
    i: 0.138
  };
  private data = {
    Q: '',
    b: '',
    h: '',
    l: '',
    i: ''
  };

  private formulas = {
    0: 'L_1 :从堰顶算起至掺气点的长度,m',
    1: 'd_1 :掺气点水深,m',
    2: 'v :掺气点平均流速,m/s',
    3: 'L_2 :出现均匀流掺气水流的距离,m',
    4: 'd_0 :均匀掺气水流的水深,m',
    5: 'v_0 :均匀掺气流平均流速,m/s',

    6: 'd_c :临界水深,m',
    7: 'q :单宽流量 m^3/s-m',
    8: '\\alpha :坡角',
    9: 'h :台阶的步高,m',
    10: 'l :台阶的步长,m',
    11: 'k :糙度,m',
    12: 'F :摩擦系数'
  };

  private demoContent =
    '深圳某水库,采用开敞式溢洪道,由进口控制段、泄槽段、消力池组成,溢洪道轴线布置与坝轴线垂直,全长约107.5m。控制段为溢流堰,长15.0m,分两孔,每孔过流宽10.0m,中墩厚2m,堰顶高程47.55m,堰高5.0m。堰体的后部与泄槽衔接。泄槽段长83.0m,桩号为0+012.00~0+065.00 段纵坡为13.8% , 桩号为0+065.00~0+095.00 段纵坡为26.7%。为降低下泄水流的流速、减少河床冲刷,采用台阶式泄槽;每个台阶高0.3m,共49 个台阶,每个台阶步长2.174m。泄槽宽度为10m,高3m。泄槽下游与泄洪洞共用消力池,底板顶高程为29.0m。消力池长12.5m,宽23.5m,末端设1.5m 高的尾坎,下设2m 深的混凝土防掏墙。消力池下游设0.5m 厚混凝土护坦与原河道衔接。正常蓄水位47.55m,校核水位49.06m,2000年一遇洪水为校核洪水,洪峰流量185 m^3/s,调蓄后下泄119 m^3/s,溢洪道下泄76 m^3/s。';
  private demoResult = '计算结果：从堰顶算起至掺气点的长度 L1=34.53m, 掺气点水深 d1=1.162m, 掺气点平均流速 v=6.542m/s,从堰顶算起至出现均匀流掺气水流的距离 L2=68.95m, 均匀掺气水流的水深d0=1.23m, 均匀掺气流平均流速 v0 =6.194m/s,台阶的步高 h =0.3m, 台阶的步长 l=2.174m';

  public beforeOnCalculate() {
    let outStr =
      Chapter2.csff263(+this.data.Q, +this.data.b, +this.data.h, +this.data.l, +this.data.i)
        .toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
