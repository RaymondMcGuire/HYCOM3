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
      <div slot="equ_explain_anchor">
        <h3>计算局部水头损失：</h3>
        <el-main>
          <el-row :gutter="20">
            <h4>部位1:进水口</h4>

            <dynamic-jsk-select-params
              ref="jsk"
              :explain-text="explainText"
              @updateParamsData="updateJSKParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位2:进口拦污栅</h4>
            <dynamic-jklws-select-params
              ref="jklws"
              :explain-text="explainText"
              @updateParamsData="updateJKLWSParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位3:进口门槽</h4>
            <dynamic-jkmc-range-params
              ref="jkmc"
              :explain-text="explainText"
              :min-value="0.05"
              :max-value="0.2"
              :step-value="0.01"
              @updateParamsData="updateJKMCParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位4:矩形变圆形渐缩管</h4>
            <dynamic-jxbyxjsg-number-params
              ref="jxbyxjsg"
              :explain-text="explainText"
              :default-value="0.05"
              :read-only="true"
              @updateParamsData="updateJXBYXJSGParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位5:圆形渐扩段</h4>
            <dynamic-yxjkd-params
              ref="yxjkd"
              :explain-text="explainText"
              @updateParamsData="updateYXJKDParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位6:圆形渐缩段</h4>
            <dynamic-yxjsd-params
              ref="yxjsd"
              :explain-text="explainText"
              @updateParamsData="updateYXJSDParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位7:断面突扩</h4>
            <dynamic-dmtk-params
              ref="dmtk"
              :explain-text="explainText"
              @updateParamsData="updateDMTKParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位8:断面突缩</h4>
            <dynamic-dmts-params
              ref="dmts"
              :explain-text="explainText"
              @updateParamsData="updateDMTSParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位9:圆形缓弯管</h4>
            <dynamic-yxhwg-params
              ref="yxhwg"
              :explain-text="explainText"
              @updateParamsData="updateYXHWGParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位10:圆形急弯管</h4>
            <dynamic-yxjwg-params
              ref="yxjwg"
              :explain-text="explainText"
              @updateParamsData="updateYXJWGParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位11:圆形变矩形渐缩管</h4>
            <dynamic-yxbjxjsg-number-params
              ref="yxbjxjsg"
              :explain-text="explainText"
              :default-value="0.1"
              :read-only="true"
              @updateParamsData="updateYXBJXJSGParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位12:出口门槽</h4>
            <dynamic-ckmc-range-params
              ref="ckmc"
              :explain-text="explainText"
              :min-value="0.05"
              :max-value="0.2"
              :step-value="0.01"
              @updateParamsData="updateCKMCParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位13:弧形工作门</h4>
            <dynamic-hxgzm-params
              ref="hxgzm"
              :explain-text="explainText"
              @updateParamsData="updateHXGZMParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位14:平板门</h4>
            <dynamic-pbm-params
              ref="pbm"
              :explain-text="explainText"
              @updateParamsData="updatePBMParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位15:出水口流入水库</h4>
            <dynamic-csklrsk-number-params
              ref="csklrsk"
              :explain-text="explainText"
              :default-value="1.0"
              :read-only="true"
              @updateParamsData="updateCSKLRSKParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位16:出水口流入明渠</h4>
            <dynamic-csklrmq-params
              ref="csklrmq"
              :explain-text="explainText"
              @updateParamsData="updateCSKLRMQParamsData"
            />
          </el-row>
        </el-main>
      </div>
    </hycom-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'


import HycomForm from '@/components/HycomForm/index.vue'

// 局部
import DynamicRangeParams from '../../3.1/3.1.1/components/DynamicRangeParams.vue'
import DynamicNumberParams from '../../3.1/3.1.1/components/DynamicNumberParams.vue'

import DynamicJskSelectParams from '../../3.1/3.1.1/components/DynamicJSKSelectParams.vue'
import DynamicYxhwgParams from '../../3.1/3.1.1/components/DynamicYXHWGParams.vue'
import DynamicYxjwgParams from '../../3.1/3.1.1/components/DynamicYXJWGParams.vue'

import DynamicJkmcRangeParams from '../../3.1/3.1.1/components/DynamicJKMCRangeParams.vue'
import DynamicCkmcRangeParams from '../../3.1/3.1.1/components/DynamicCKMCRangeParams.vue'

import DynamicJxbyxjsgNumberParams from '../../3.1/3.1.1/components/DynamicJXBYXJSGNumberParams.vue'
import DynamicYxbjxjsgNumberParams from '../../3.1/3.1.1/components/DynamicYXBJXJSGNumberParams.vue'
import DynamicHxgzmParams from '../../3.1/3.1.1/components/DynamicHXGZMParams.vue'
import DynamicJklwsSelectParams from '../../3.1/3.1.1/components/DynamicJKLWSSelectParams.vue'
import DynamicYxjkdParams from '../../3.1/3.1.1/components/DynamicYXJKDParams.vue'
import DynamicYxjsdParams from '../../3.1/3.1.1/components/DynamicYXJSDParams.vue'
import DynamicDmtkParams from '../../3.1/3.1.1/components/DynamicDMTKParams.vue'
import DynamicDmtsParams from '../../3.1/3.1.1/components/DynamicDMTSParams.vue'

import DynamicPbmParams from '../../3.1/3.1.1/components/DynamicPBMParams.vue'

import DynamicCsklrskNumberParams from '../../3.1/3.1.1/components/DynamicCSKLRSKNumberParams.vue'
import DynamicCsklrmqParams from '../../3.1/3.1.1/components/DynamicCSKLRMQParams.vue'

// 沿程
import DynamicJkdParams from '../../3.1/3.1.1/components/DynamicJKDParams.vue'
import DynamicJkjbdParams from '../../3.1/3.1.1/components/DynamicJKJBDParams.vue'
import DynamicCkjbdParams from '../../3.1/3.1.1/components/DynamicCKJBDParams.vue'
import DynamicDsdParams from '../../3.1/3.1.1/components/DynamicDSDParams.vue'

import { g, crossSectionShapeType, Table2DLerp, TABLE413_DATA, TABLE413_HORIZON, TABLE413_VERTICAL, TABLE414_DATA, TABLE414_HORIZON, TABLE414_VERTICAL, TABLE415_DATA, TABLE415_HORIZON, TABLE415_VERTICAL, TABLE416_DATA, TABLE416_HORIZON, TABLE416_VERTICAL } from '@/hycom_lib/common'

@Component({
  components: {
    HycomForm,
    DynamicRangeParams,
    DynamicJskSelectParams,
    DynamicNumberParams,
    DynamicYxhwgParams,
    DynamicYxjwgParams,
    DynamicJkmcRangeParams,
    DynamicCkmcRangeParams,
    DynamicJxbyxjsgNumberParams,
    DynamicYxbjxjsgNumberParams,
    DynamicHxgzmParams,
    DynamicJklwsSelectParams,
    DynamicYxjkdParams,
    DynamicYxjsdParams,
    DynamicDmtkParams,
    DynamicDmtsParams,
    DynamicPbmParams,
    DynamicCsklrskNumberParams,
    DynamicCsklrmqParams,
    DynamicJkdParams,
    DynamicJkjbdParams,
    DynamicCkjbdParams,
    DynamicDsdParams
  }
})
export default class Chapter4Section3121 extends Vue {
  public title = '3.3.1 有压短管流量系数计算';
  public explainText = '参数';

  public initData = {
    B: '8',
    a: '11',
    l_a: '20.35',
    '\\phi': 0.97,
    '\\varepsilon': 0.914,
    n_z: '0.014'
  };

    public data = {
      B: '',
      a: '',
      l_a: '',
      '\\phi': '',
      '\\varepsilon': '',
      n_z: ''
    };

  public formulas = {
    0: '\\mu :流量系数',
    1: '\\varepsilon :有压短管出口顶部无倾斜压板工作闸门垂直收缩系数',
    2: 'e :闸孔开启高度,m',
    3: 'B :水流收缩断面处的底宽,m',
    4: 'A_c :收缩断面面积,m^2',
    5: '\\zeta_i :自进口上游渐变流断面至有压短管出流后的收缩断面之间的任一局部能量损失系数',
    6: 'b_i :\\zeta_i相应的过水断面宽度,m',
    7: 'h_i :\\zeta_i相应的过水断面宽度,m',
    8: 'A_i :\\zeta_i相应的过水断面面积,m^2',
    9: 'l_a :有压短管长度',
    10: 'A_a :有压短管平均过水断面面积,m^2',
    11: 'R_a :有压短管平均过水断面相应的水力半径,m',
    12: 'C_a :有压短管平均过水断面相应的谢才系数',
    13: '\\phi :流速系数, 一般取 0.97'
  };

  public demoContent =
    '国内某水电站,水库校核水位1860.4m,正常蓄水位1856m,汛限水位1854m,中孔泄洪洞进水口为有压短管,长度20.35m,有压短管出口底板高程1804m,进口顶部高程1821.118m,检修门槽尺寸8m x 13.6m,工作闸门尺寸8m x 11m,垂直收缩系数ε=0.914,求校核洪水时中孔泄洪洞的泄量系数及泄量。';
  public demoResult = '估算流量系数0.886, 求得流量系数0.84';

  // 局部损失
  private paramJSKData = [];
  private paramJKLWSData =[];

  private paramJKMCData = [];
  private paramCKMCData =[];

  private paramJXBYXJSGData = [];
  private paramYXBJXJSGData = [];
  private paramHXGZMData = [];

  private paramYXHWGData = [];
  private paramYXJWGData = [];

  private paramCSKLRSKData=[];
  private paramCSKLRMQData=[];

  private paramYXJKDData = [];
  private paramYXJSDData=[];

  private paramDMTKData =[];
  private paramDMTSData =[];

  private paramPBMData=[];

  // 沿程损失
  private paramJSKDData =[];
  private paramJKJBDData =[];
  private paramCKJBDData =[];
  private paramDSDData =[];

  public beforeOnReset() {
    let jsk = this.$refs.jsk as any
    jsk.removeAllField()

    let jkmc = this.$refs.jkmc as any
    jkmc.removeAllField()

    let jxbyxjsg = this.$refs.jxbyxjsg as any
    jxbyxjsg.removeAllField()

    let yxhwg = this.$refs.yxhwg as any
    yxhwg.removeAllField()

    let yxbjxjsg = this.$refs.yxbjxjsg as any
    yxbjxjsg.removeAllField()

    let hxgzm = this.$refs.hxgzm as any
    hxgzm.removeAllField()

    let jklws = this.$refs.jklws as any
    jklws.removeAllField()

    let yxjkd = this.$refs.yxjkd as any
    yxjkd.removeAllField()

    let yxjsd = this.$refs.yxjsd as any
    yxjsd.removeAllField()

    let dmtk = this.$refs.dmtk as any
    dmtk.removeAllField()

    let dmts = this.$refs.dmts as any
    dmts.removeAllField()

    let yxjwg = this.$refs.yxjwg as any
    yxjwg.removeAllField()

    let ckmc = this.$refs.ckmc as any
    ckmc.removeAllField()

    let pbm = this.$refs.pbm as any
    pbm.removeAllField()

    let csklrsk = this.$refs.csklrsk as any
    csklrsk.removeAllField()

    let csklrmq = this.$refs.csklrmq as any
    csklrmq.removeAllField()
  }

  public beforeOnDemo() {
    this.beforeOnReset()

    let jsk = this.$refs.jsk as any
    jsk.addFieldWithData(0.1, 8, 17.118, 0, 1, crossSectionShapeType.RECTANGLE)
    jsk.onParamsDataChange()

    let jkmc = this.$refs.jkmc as any
    jkmc.addFieldWithData(0.1, 8, 13.6, 0, 1, crossSectionShapeType.RECTANGLE)
    jkmc.addFieldWithData(0.1, 8, 11, 0, 1, crossSectionShapeType.RECTANGLE)
    jkmc.onParamsDataChange()
  }

  // zeta: elem.value
  public beforeOnCalculate() {
    let Ai: number[] = []
    let Ri: number[] = []
    let Ci: number[] = []
    let Zetai: number[] = []
    let Ac = +this.data.B * +this.data.a * +this.data['\\varepsilon']

    let self = this

    // 1：进水口
    this.paramJSKData.forEach(function(elem:any) {
      let area = 0
      let perimeter = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B * elem.n
        perimeter = 2.0 * (elem.H + elem.B) * elem.n
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
        perimeter = Math.PI * elem.d
      }

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(elem.value)
    })

    // 2：进口拦污栅
    this.paramJKLWSData.forEach(function(elem:any) {
      let area = 0
      let perimeter = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B
        perimeter = 2.0 * (elem.H + elem.B)
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
        perimeter = Math.PI * elem.d
      }

      let zeta = elem.beta * Math.pow(elem.s / elem.b, 4 / 3) * Math.sin(elem.alpha / 180 * Math.PI)

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(zeta)
    })

    // 3：门槽
    this.paramJKMCData.forEach(function(elem:any) {
      let area = 0
      let perimeter = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B * elem.n
        perimeter = 2.0 * (elem.H + elem.B) * elem.n
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
        perimeter = Math.PI * elem.d
      }

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(elem.value)
    })

    // 4：矩形变圆形渐缩管
    this.paramJXBYXJSGData.forEach(function(elem:any) {
      let area = (elem.H * elem.B + Math.PI * elem.d * elem.d / 4) / 2
      let perimeter = (2 * (elem.H + elem.B) + Math.PI * elem.d) / 2

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(elem.value)
    })

    // 5 圆形渐扩段
    let tableLerp = new Table2DLerp()

    this.paramYXJKDData.forEach(function(elem:any) {
      let area = Math.PI * elem.d * elem.d / 4
      let perimeter = Math.PI * elem.d

      let k = tableLerp.arr(
        TABLE413_VERTICAL,
        TABLE413_HORIZON,
        TABLE413_DATA,
        0,
        elem.alpha
      )
      let zeta = k * Math.pow(elem.omega2 / elem.omega1 - 1, 2)

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(zeta)
    })

    // 6 圆形渐缩段
    this.paramYXJSDData.forEach(function(elem:any) {
      let area = Math.PI * elem.d * elem.d / 4
      let perimeter = Math.PI * elem.d

      let k1 = tableLerp.arr(
        TABLE414_VERTICAL,
        TABLE414_HORIZON,
        TABLE414_DATA,
        0,
        elem.alpha
      )

      let k2 = tableLerp.arr(
        TABLE415_VERTICAL,
        TABLE415_HORIZON,
        TABLE415_DATA,
        0,
        elem.omega2 / elem.omega1
      )

      let zeta = k1 * k2

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(zeta)
    })

    // 7 断面突扩
    this.paramDMTKData.forEach(function(elem:any) {
      let area = 0
      let perimeter = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B
        perimeter = 2.0 * (elem.H + elem.B)
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
        perimeter = Math.PI * elem.d
      }

      let zeta = Math.pow(1 - elem.omega1 / elem.omega2, 2)

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(zeta)
    })

    // 8 断面突缩
    this.paramDMTSData.forEach(function(elem:any) {
      let area = 0
      let perimeter = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B
        perimeter = 2.0 * (elem.H + elem.B)
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
        perimeter = Math.PI * elem.d
      }

      let zeta = 0.5 * (1 - elem.omega2 / elem.omega1)

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(zeta)
    })

    // 9：圆形缓弯管
    this.paramYXHWGData.forEach(function(elem:any) {
      let zeta = (0.131 + 0.1632 * Math.pow(elem.D / elem.R, 3.5)) * Math.sqrt(elem.Theta / 90)
      let area = Math.PI * elem.D * elem.D / 4
      let perimeter = Math.PI * elem.d

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(zeta)
    })

    // 10：圆形急弯管
    this.paramYXJWGData.forEach(function(elem:any) {
      let area = Math.PI * elem.D * elem.D / 4
      let perimeter = Math.PI * elem.d

      let sinVal = Math.sin(elem.Theta / 2 / 180 * Math.PI)
      let zeta = 0.946 * sinVal * sinVal + 2.05 * sinVal * sinVal * sinVal * sinVal

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(zeta)
    })

    // 11 ：圆形变矩形渐缩管
    this.paramYXBJXJSGData.forEach(function(elem:any) {
      let area = (elem.H * elem.B + Math.PI * elem.d * elem.d / 4) / 2
      let perimeter = (2 * (elem.H + elem.B) + Math.PI * elem.d) / 2

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(elem.value)
    })

    // 12：出口平板门槽
    this.paramCKMCData.forEach(function(elem:any) {
      let area = 0
      let perimeter = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B
        perimeter = 2.0 * (elem.H + elem.B)
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
        perimeter = Math.PI * elem.d
      }

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(elem.value)
    })

    //! TODO 13:弧形工作门 局开情况未完成

    // 14：平板门
    this.paramPBMData.forEach(function(elem:any) {
      let area = elem.H * elem.a
      let perimeter = 2 * (elem.H + elem.a)

      let zeta = tableLerp.arr(
        TABLE416_VERTICAL,
        TABLE416_HORIZON,
        TABLE416_DATA,
        0,
        elem.e / elem.a
      )

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(zeta)
    })

    // 15：出水口流入水库
    this.paramCSKLRSKData.forEach(function(elem:any) {
      let area = 0
      let perimeter = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B
        perimeter = 2.0 * (elem.H + elem.B)
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
        perimeter = Math.PI * elem.d
      }

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(elem.value)
    })

    // 16：出水口流入明渠
    this.paramCSKLRMQData.forEach(function(elem:any) {
      let area = 0
      let perimeter = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B
        perimeter = 2.0 * (elem.H + elem.B)
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
        perimeter = Math.PI * elem.d
      }

      let zeta = Math.pow(1 - elem.omega1 / elem.omega2, 2)

      let r = area / perimeter
      let c = Math.pow(r, 1 / 6) / +self.data.n_z
      Ai.push(area)
      Ri.push(r)
      Ci.push(c)
      Zetai.push(zeta)
    })

    // console.log(Ai)
    // console.log(Ri)
    // console.log(Ci)

    let localA = 0
    let Aa = 0
    let Ra = 0
    let Ca = 0

    for (let index = 0; index < Zetai.length; index++) {
      localA += Zetai[index] * (Ac / Ai[index]) * (Ac / Ai[index])
      Aa += Ai[index]
      Ra += Ri[index]
      Ca += Ci[index]
    }

    // console.log('局部', localA)

    Aa /= Zetai.length
    Ra /= Zetai.length
    Ca /= Zetai.length

    let regionA = 2.0 * g * +this.data.l_a * (Ac / Aa) * (Ac / Aa) / (Ca * Ca * Ra)
    // console.log('沿程', regionA)

    let mu = +this.data['\\varepsilon'] / Math.sqrt(1 + localA + regionA)
    let muP = +this.data['\\varepsilon'] * +this.data['\\phi']

    let outStr = '流量系数μ=' + mu.toFixed(4).toString() + '; 流量系数μ估=' + muP.toFixed(4).toString()

    let template = this.$refs.template as any
    template.form.result = outStr
  }

  // 局部损失
  public updateJSKParamsData(paramData) {
    this.paramJSKData = paramData
  }

  public updateJKLWSParamsData(paramData) {
    this.paramJKLWSData = paramData
  }

  public updateJKMCParamsData(paramData) {
    this.paramJKMCData = paramData
  }

  public updateJXBYXJSGParamsData(paramData) {
    this.paramJXBYXJSGData = paramData
  }

  public updateYXBJXJSGParamsData(paramData) {
    this.paramYXBJXJSGData = paramData
  }

  public updateHXGZMParamsData(paramData) {
    this.paramHXGZMData = paramData
  }

  public updateYXHWGParamsData(paramData) {
    this.paramYXHWGData = paramData
  }

  public updateYXJWGParamsData(paramData) {
    this.paramYXJWGData = paramData
  }

  public updateCSKLRSKParamsData(paramData) {
    this.paramCSKLRSKData = paramData
  }

  public updateCKMCParamsData(paramData) {
    this.paramCKMCData = paramData
  }

  public updateYXJKDParamsData(paramData) {
    this.paramYXJKDData = paramData
  }

  public updateYXJSDParamsData(paramData) {
    this.paramYXJSDData = paramData
  }

  public updateDMTSParamsData(paramData) {
    this.paramDMTSData = paramData
  }

  public updateDMTKParamsData(paramData) {
    this.paramDMTKData = paramData
  }

  public updatePBMParamsData(paramData) {
    this.paramPBMData = paramData
  }

  public updateCSKLRMQParamsData(paramData) {
    this.paramCSKLRMQData = paramData
  }

  // 沿程损失：进水口段
  public updateJKDParamsData(paramData) {
    this.paramJSKDData = paramData
  }

  public updateJKJBDParamsData(paramData) {
    this.paramJKJBDData = paramData
  }

  public updateCKJBDParamsData(paramData) {
    this.paramCKJBDData = paramData
  }

  public updateDSDParamsData(paramData) {
    this.paramDSDData = paramData
  }
}
</script>
