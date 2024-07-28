<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-07-16 22:00:43
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-07-16 23:33:08
 * @FilePath: \hycom_app\src\views\chapter2\4.3\4.3.2.1\index.vue
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
      @beforeOnDemo="beforeOnDemo"
      @beforeOnReset="beforeOnReset"
    >
      <div slot="table_fir_anchor">
        <el-row :gutter="20">
          <h3>请点击⊕添加断面信息</h3>
          <dynamic-yhdgf-params
            ref="yhdgf"
            :explain-text="explainText"
            @updateParamsData="updateParamsData"
          />
        </el-row>
      </div>
    </hycom-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Chapter4 } from '@/hycom_lib/chapter4'

import HycomForm from '@/components/HycomForm/index.vue'
import DynamicYhdgfParams from './components/DynamicYHDGFParams.vue'

@Component({
  components: {
    HycomForm,
    DynamicYhdgfParams
  }
})
export default class Chapter4Section343 extends Vue {
  public title = '3.3.5.3 溢洪道规范方法计算隧洞掺气水深';
  public explainText = '断面';

  public initData = {
    '\\zeta': 1.3
  };

    public data = {
      '\\zeta': ''

    };

    public formulas = {
      0: 'b_i:明流隧洞底宽,m',
      1: 'h_{ai}:掺气后水深,m',
      2: 'h_i:未掺气水流的水深,m',
      3: 'v_i:未掺气水流的流速,m',
      4: 'R_i:未掺气水流的水力半径,m',
      5: 'i:第i个计算断面',
      6: '\\zeta:修正系数,取1.0~1.4s/m,当流速大于20m/s 时,宜取较大值'
    };

  public demoContent =
  '国内某水电站,中孔泄洪洞进水口为有压短管,后接“龙抬头”无压泄洪洞,隧洞为城门洞形,隧洞断面尺寸为10m x 15m(宽 x 高),“龙抬头”明流无压泄洪洞清水水面线计算结果为:反弧段前= k i 0.005516<0.14 属于急流,为降水曲线,起始断面,L0=0、h0=10.054m、υ0=28.72m/s,反弧段第1 断面:L1=206.39m、h1=6.515m、υ1=35.4566m/s;反弧段后明, = k i 0.005516>0.004692 属于缓流,属于用壅水曲线,洞长L2=442.937m;第2 断面:L2=157.166m、h2=7m、υ2=33m/s;第3 断面:L3=442.937m 、h3=7.92m、υ3=29.1667m/s;计算掺气水深。'

  public demoResult = '第1断面:掺气水深=11.09962;第2断面:掺气水深=7.36195;第3断面:掺气水深=7.91000;第4断面:掺气水深=8.94960;';

    private paramData1 = [];

    public updateParamsData(paramData) {
      this.paramData1 = paramData
    }

    public beforeOnCalculate() {
      let yhdgf = this.$refs.yhdgf as any
      yhdgf.onParamsDataChange()

      let hiList: any[] = []
      let viList : any[] = []
      this.paramData1.forEach(function(elem:any) {
        hiList.push(elem.hi)
        viList.push(elem.vi)
      })

      let outStr = ''
      let counter = 1
      let res = Chapter4.yhdgf_sdsqss(+this.data['\\zeta'], hiList, viList)
      res.forEach(function(elem:any) {
        outStr += '第' + counter.toString() + '断面:' + elem + ';'
        counter += 1
      })

      let template = this.$refs.template as any
      template.form.result = outStr
    }

    public beforeOnReset() {
      let yhdgf = this.$refs.yhdgf as any
      yhdgf.removeAllField()
    }

    public beforeOnDemo() {
      let yhdgf = this.$refs.yhdgf as any
      yhdgf.removeAllField()

      yhdgf.addFieldWithData(10.054, 8, 28.72)
      yhdgf.addFieldWithData(6.515, 10, 35.4566)
      yhdgf.addFieldWithData(7, 10, 33)
      yhdgf.addFieldWithData(7.92, 10, 29.1667)
    }
}
</script>
