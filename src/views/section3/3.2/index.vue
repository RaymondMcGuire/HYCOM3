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
        <h3>计算局部能量损失：</h3>
        <el-main>
          <el-row :gutter="20">
            <h4>部位:进水口</h4>

            <dynamic-jsk-select-params
              ref="jsk"
              :dynamic-btn="false"
              :explain-text="explainText"
              @updateParamsData="updateJSKParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位:进口门槽</h4>
            <dynamic-jkmc-range-params
              ref="jkmc"
              :dynamic-btn="false"
              :explain-text="explainText"
              :min-value="0.05"
              :max-value="0.2"
              :step-value="0.01"
              @updateParamsData="updateJKMCParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位:矩形变圆形渐缩管</h4>
            <dynamic-jxbyxjsg-number-params
              ref="jxbyxjsg"
              :dynamic-btn="false"
              :explain-text="explainText"
              :default-value="0.05"
              :read-only="true"
              @updateParamsData="updateJXBYXJSGParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位:圆形缓弯管</h4>
            <dynamic-yxhwg-params
              ref="yxhwg"
              :dynamic-btn="false"
              :explain-text="explainText"
              @updateParamsData="updateYXHWGParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位:圆形变矩形渐缩管</h4>
            <dynamic-yxbjxjsg-number-params
              ref="yxbjxjsg"
              :dynamic-btn="false"
              :explain-text="explainText"
              :default-value="0.1"
              :read-only="true"
              @updateParamsData="updateYXBJXJSGParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>部位:弧形工作门</h4>
            <dynamic-hxgzm-params
              ref="hxgzm"
              :dynamic-btn="false"
              :explain-text="explainText"
              @updateParamsData="updateHXGZMParamsData"
            />
          </el-row>
        </el-main>
        <h3>4.2.1.2 计算沿程能量损失：</h3>
        <el-main>
          <el-row :gutter="20">
            <h4>进口段</h4>

            <dynamic-jkd-params
              ref="jkd"
              :dynamic-btn="false"
              :explain-text="explainText"
              @updateParamsData="updateJKDParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>进口渐变段</h4>

            <dynamic-jkjbd-params
              ref="jkjbd"
              :dynamic-btn="false"
              :explain-text="explainText"
              @updateParamsData="updateJKJBDParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>洞身段</h4>

            <dynamic-dsd-params
              ref="dsd"
              :dynamic-btn="false"
              :explain-text="explainText"
              @updateParamsData="updateDSDParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>出口渐变段</h4>

            <dynamic-ckjbd-params
              ref="ckjbd"
              :dynamic-btn="false"
              :explain-text="explainText"
              @updateParamsData="updateCKJBDParamsData"
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
import DynamicRangeParams from '../3.1/3.1.1/components/DynamicRangeParams.vue'
import DynamicNumberParams from '../3.1/3.1.1/components/DynamicNumberParams.vue'

import DynamicJskSelectParams from '../3.1/3.1.1/components/DynamicJSKSelectParams.vue'
import DynamicYxhwgParams from '../3.1/3.1.1/components/DynamicYXHWGParams.vue'
import DynamicYxjwgParams from '../3.1/3.1.1/components/DynamicYXJWGParams.vue'

import DynamicJkmcRangeParams from '../3.1/3.1.1/components/DynamicJKMCRangeParams.vue'
import DynamicCkmcRangeParams from '../3.1/3.1.1/components/DynamicCKMCRangeParams.vue'

import DynamicJxbyxjsgNumberParams from '../3.1/3.1.1/components/DynamicJXBYXJSGNumberParams.vue'
import DynamicYxbjxjsgNumberParams from '../3.1/3.1.1/components/DynamicYXBJXJSGNumberParams.vue'
import DynamicHxgzmParams from '../3.1/3.1.1/components/DynamicHXGZMParams.vue'
import DynamicJklwsSelectParams from '../3.1/3.1.1/components/DynamicJKLWSSelectParams.vue'
import DynamicYxjkdParams from '../3.1/3.1.1/components/DynamicYXJKDParams.vue'
import DynamicYxjsdParams from '../3.1/3.1.1/components/DynamicYXJSDParams.vue'
import DynamicDmtkParams from '../3.1/3.1.1/components/DynamicDMTKParams.vue'
import DynamicDmtsParams from '../3.1/3.1.1/components/DynamicDMTSParams.vue'

import DynamicPbmParams from '../3.1/3.1.1/components/DynamicPBMParams.vue'

import DynamicCsklrskNumberParams from '../3.1/3.1.1/components/DynamicCSKLRSKNumberParams.vue'
import DynamicCsklrmqParams from '../3.1/3.1.1/components/DynamicCSKLRMQParams.vue'

// 沿程
import DynamicJkdParams from '../3.1/3.1.1/components/DynamicJKDParams.vue'
import DynamicJkjbdParams from '../3.1/3.1.1/components/DynamicJKJBDParams.vue'
import DynamicCkjbdParams from '../3.1/3.1.1/components/DynamicCKJBDParams.vue'
import DynamicDsdParams from '../3.1/3.1.1/components/DynamicDSDParams.vue'

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
export default class Chapter4Section223 extends Vue {
  public title = '3.2 压坡线计算';
  public explainText = '参数';

  public initData = {
    T_0: '66.9',
    n_z: '0.014',
    Q: '1445'
  };

    public data = {
      T_0: '',
      n_z: '',
      Q: ''

    };

  public formulas = {
    0: 'Q :泄流流量m^3/s',
    1: 'T_0 :上游水面与隧洞出口底板高程差及上游行近流速水头之和,m',
    2: 'P_i :有压管道沿程i断面压强t/m^2或水柱高m',
    3: 'l_i :有压短管第i段长',
    4: '\\zeta_i :自进口上游渐变流断面至有压管道出流后的收缩断面之间某一局部能量损失系数',
    5: 'n_z: 糙率'
  };

  public demoContent =
    '国内某水电站泄洪排沙底孔为有压洞,校核水位1860.4m,进口分为两孔,底坎高程1795.0m,各设事故检修门孔口尺寸为2-4.8 x 8.0m,进口两侧均喇叭口,顶部为椭圆形曲线。检修闸门后设置2 根直径内径1.2m 钢管埋在混凝土中用来通气补气,通气管后设置2 根0.5m 钢管埋在混凝土中用来充水。进水口长度13.5m（中墩末端两孔合一）、渐变段长20 m（由矩形12.4 x 8m 渐变圆形Φ9m）、Φ9m 有压隧洞段331.2m ,底坡i=0.00453,在平面布置上需两个弯道,两个弯道半径均为R=50m,θ=22°,渐变段末距第一个弯道末34.2m,第一及第二个弯道末相距163.73m,第二个弯道末距出口渐变段开始133.27m 出口渐变段 22 m 由Φ 9m 的圆形有压隧洞渐变为 8 x 6.8m的矩形断面与工作闸室相连。工作闸门室位于隧洞出口 长 27 .20m底板高程 1793.5m ,底板厚度 3m ,内设弧型工作闸门一扇,闸门孔口尺寸为 8 x 6.8m 。计算泄洪排沙有压管道的沿程压坡线。';
  public demoResult = 'P1~P6均大于2m水头';

  // 局部损失
  private paramJSKData = [];
  private paramJKMCData = [];
  private paramJXBYXJSGData = [];
  private paramYXBJXJSGData = [];
  private paramYXHWGData = [];
  private paramHXGZMData = [];

  // 沿程损失
  private paramJSKDData =[];
  private paramJKJBDData =[];
  private paramCKJBDData =[];
  private paramDSDData =[];

  mounted() {
    this.beforeOnDemo()
  }

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

    let jkd = this.$refs.jkd as any
    jkd.removeAllField()

    let jkjbd = this.$refs.jkjbd as any
    jkjbd.removeAllField()

    let dsd = this.$refs.dsd as any
    dsd.removeAllField()

    let ckjbd = this.$refs.ckjbd as any
    ckjbd.removeAllField()
  }

  public beforeOnDemo() {
    this.beforeOnReset()

    let jsk = this.$refs.jsk as any
    jsk.addFieldWithData(0.1, 4.8, 8, 0, 2, crossSectionShapeType.RECTANGLE)
    jsk.onParamsDataChange()

    let jkmc = this.$refs.jkmc as any
    jkmc.addFieldWithData(0.15, 4.8, 8, 0, 2, crossSectionShapeType.RECTANGLE)
    jkmc.onParamsDataChange()

    let jxbyxjsg = this.$refs.jxbyxjsg as any
    jxbyxjsg.addFieldWithData(0.05, 12.4, 8, 9)
    jxbyxjsg.onParamsDataChange()

    let yxhwg = this.$refs.yxhwg as any
    yxhwg.addFieldWithData(9, 50, 22)
    yxhwg.addFieldWithData(9, 50, 22)
    yxhwg.onParamsDataChange()

    let yxbjxjsg = this.$refs.yxbjxjsg as any
    yxbjxjsg.addFieldWithData(0.1, 8, 6.8, 9)
    yxbjxjsg.onParamsDataChange()

    let hxgzm = this.$refs.hxgzm as any
    hxgzm.addFieldWithData('', '', '', '', 0)

    // 沿程损失
    let jkd = this.$refs.jkd as any
    jkd.addFieldWithData(13.5, 12.4, 8, 0, crossSectionShapeType.RECTANGLE)
    jkd.onParamsDataChange()

    let jkjbd = this.$refs.jkjbd as any
    jkjbd.addFieldWithData(20.0, 12.4, 8.0, 9.0)
    jkjbd.onParamsDataChange()

    let ckjbd = this.$refs.ckjbd as any
    ckjbd.addFieldWithData(22.0, 8.0, 6.8, 9.0)
    ckjbd.onParamsDataChange()

    let dsd = this.$refs.dsd as any
    dsd.addFieldWithData(34.2, 0, 0, 9.0, crossSectionShapeType.CIRCLE)
    dsd.addFieldWithData(163.73, 0, 0, 9.0, crossSectionShapeType.CIRCLE)
    dsd.addFieldWithData(133.27, 0, 0, 9.0, crossSectionShapeType.CIRCLE)
    dsd.onParamsDataChange()
  }

  // zeta: elem.value
  public beforeOnCalculate() {
    let localH: number[] = []
    let regionH: number[] = []
    let regionV: number[] = []

    // 1：进水口
    for (let i = 0; i < 1; i++) {
      let elem:any = this.paramJSKData[i]
      let area = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B * elem.n
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
      }

      let v = +this.data.Q / area
      let tmpH = elem.value * v / (2 * g)
      localH.push(tmpH)
    // console.log('进水口', tmpH, elem.value)
    }

    // 3：门槽
    for (let i = 0; i < 1; i++) {
      let elem:any = this.paramJKMCData[i]
      let area = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B * elem.n
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
      }

      let v = +this.data.Q / area
      let tmpH = elem.value * v / (2 * g)

      // console.log('门槽', tmpH, elem.value)
      localH.push(tmpH)
    }

    // 4：矩形变圆形渐缩管
    for (let i = 0; i < 1; i++) {
      let elem:any = this.paramJXBYXJSGData[i]
      let area = (elem.H * elem.B + Math.PI * elem.d * elem.d / 4) / 2
      let v = +this.data.Q / area
      let tmpH = elem.value * v / (2 * g)

      // console.log('4：矩形变圆形渐缩管', tmpH, elem.value)]
      localH.push(tmpH)
    }

    // 9：圆形缓弯管
    for (let i = 0; i < 2; i++) {
      let elem:any = this.paramYXHWGData[i]
      let zeta = (0.131 + 0.1632 * Math.pow(elem.D / elem.R, 3.5)) * Math.sqrt(elem.Theta / 90)
      let area = Math.PI * elem.D * elem.D / 4

      let v = +this.data.Q / area
      let tmpH = zeta * v / (2 * g)

      // console.log('9：圆形缓弯管', tmpH, zeta)
      localH.push(tmpH)
    }

    // 11 ：圆形变矩形渐缩管
    for (let i = 0; i < 1; i++) {
      let elem:any = this.paramYXBJXJSGData[i]
      let area = (elem.H * elem.B + Math.PI * elem.d * elem.d / 4) / 2
      let v = +this.data.Q / area
      let tmpH = elem.value * v / (2 * g)

      // console.log('：圆形变矩形渐缩管', tmpH, elem.value)
      localH.push(tmpH)
    }

    //! TODO 13:弧形工作门 局开情况未完成

    // 沿程能量损失
    // 1：进水口段
    for (let i = 0; i < 1; i++) {
      let elem:any = this.paramJSKDData[i]
      let area = 0
      let perimeter = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B
        perimeter = 2 * (elem.H + elem.B)
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
        perimeter = Math.PI * elem.d
      }

      let r = area / perimeter
      let v = +this.data.Q / area
      let c = Math.pow(r, 1 / 6) / +this.data.n_z
      let tmpH = elem.l * v * v / c / c / r
      regionH.push(tmpH)
      regionV.push(v)
      // console.log('进水口段', tmpH, elem.l)
    }

    // 2：进口渐变段
    for (let i = 0; i < 1; i++) {
      let elem:any = this.paramJKJBDData[i]
      let area1 = 0
      let perimeter1 = 0
      let area2 = 0
      let perimeter2 = 0

      area1 = elem.H * elem.B
      perimeter1 = 2 * (elem.H + elem.B)

      area2 = Math.PI * elem.d * elem.d / 4
      perimeter2 = Math.PI * elem.d

      let r1 = area1 / perimeter1
      let r2 = area2 / perimeter2
      let r = (r1 + r2) / 2

      let v = 2 * +this.data.Q / (area1 + area2)
      let c = Math.pow(r, 1 / 6) / +this.data.n_z
      let tmpH = elem.l * v * v / c / c / r
      regionH.push(tmpH)
      regionV.push(v)
      // console.log('进口渐变段', tmpH, elem.l, r1, r2)
    }

    // 4：洞身段
    for (let i = 0; i < 3; i++) {
      let elem:any = this.paramDSDData[i]
      let area = 0
      let perimeter = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B
        perimeter = 2 * (elem.H + elem.B)
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
        perimeter = Math.PI * elem.d
      }

      let r = area / perimeter
      let v = +this.data.Q / area
      let c = Math.pow(r, 1 / 6) / +this.data.n_z
      let tmpH = elem.l * v * v / c / c / r
      regionH.push(tmpH)
      regionV.push(v)
      // console.log('4：洞身段', tmpH, elem.l)
    }

    // 3：出口渐变段
    for (let i = 0; i < 1; i++) {
      let elem:any = this.paramCKJBDData[i]
      let area1 = 0
      let perimeter1 = 0
      let area2 = 0
      let perimeter2 = 0

      area1 = elem.H * elem.B
      perimeter1 = 2 * (elem.H + elem.B)

      area2 = Math.PI * elem.d * elem.d / 4
      perimeter2 = Math.PI * elem.d

      let r1 = area1 / perimeter1
      let r2 = area2 / perimeter2
      let r = (r1 + r2) / 2

      let v = 2 * +this.data.Q / (area1 + area2)
      let c = Math.pow(r, 1 / 6) / +this.data.n_z
      let tmpH = elem.l * v * v / c / c / r
      regionH.push(tmpH)
      regionV.push(v)
      // console.log('3：出口渐变段', tmpH, elem.l)
    }

    let regionT: number[] = []
    let regionP: number[] = []

    // 计算T
    regionT.push(+this.data.T_0 - (localH[0] + localH[1] + regionH[0]))
    regionT.push(regionT[0] - (localH[2] + regionH[1]))
    regionT.push(regionT[1] - (localH[3] + regionH[2]))
    regionT.push(regionT[2] - (localH[4] + regionH[3]))
    regionT.push(regionT[3] - (regionH[4]))
    regionT.push(regionT[4] - (localH[5] + regionH[5]))

    // console.log(regionT)

    regionP.push(regionT[0] - regionV[0] * regionV[0] / 2 / g)
    regionP.push(regionT[1] - regionV[1] * regionV[1] / 2 / g)
    regionP.push(regionT[2] - regionV[2] * regionV[2] / 2 / g)
    regionP.push(regionT[3] - regionV[3] * regionV[3] / 2 / g)
    regionP.push(regionT[4] - regionV[4] * regionV[4] / 2 / g)
    regionP.push(regionT[5] - regionV[5] * regionV[5] / 2 / g)

    // console.log(regionP)

    let outStr = ''

    for (let index = 0; index < regionP.length; index++) {
      const element = regionP[index]
      outStr += '断面压坡线P' + (index + 1).toString() + '=' + element.toFixed(2).toString() + ':'
      if (element > 2) { outStr += '>2m水头; ' } else { outStr += '<2m水头; ' }
    }

    let template = this.$refs.template as any
    template.form.result = outStr
  }

  // 局部损失
  public updateJSKParamsData(paramData) {
    this.paramJSKData = paramData
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

  public updateYXHWGParamsData(paramData) {
    this.paramYXHWGData = paramData
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

  public updateHXGZMParamsData(paramData) {
    this.paramHXGZMData = paramData
  }
}
</script>
