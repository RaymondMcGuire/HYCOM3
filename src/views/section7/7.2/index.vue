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
        <h3>4.2.1.2 计算沿程能量损失：</h3>
        <el-main>
          <el-row :gutter="20">
            <h4>进口段</h4>

            <dynamic-jkd-params
              ref="jkd"
              :explain-text="explainText"
              @updateParamsData="updateJKDParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>进口渐变段</h4>

            <dynamic-jkjbd-params
              ref="jkjbd"
              :explain-text="explainText"
              @updateParamsData="updateJKJBDParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>洞身段</h4>

            <dynamic-dsd-params
              ref="dsd"
              :explain-text="explainText"
              @updateParamsData="updateDSDParamsData"
            />
          </el-row>

          <el-row :gutter="20">
            <h4>出口渐变段</h4>

            <dynamic-ckjbd-params
              ref="ckjbd"
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
import DynamicRangeParams from '../../section3/3.1/3.1.1/components/DynamicRangeParams.vue'
import DynamicNumberParams from '../../section3/3.1/3.1.1/components/DynamicNumberParams.vue'

import DynamicJskSelectParams from '../../section3/3.1/3.1.1/components/DynamicJSKSelectParams.vue'
import DynamicYxhwgParams from '../../section3/3.1/3.1.1/components/DynamicYXHWGParams.vue'
import DynamicYxjwgParams from '../../section3/3.1/3.1.1/components/DynamicYXJWGParams.vue'

import DynamicJkmcRangeParams from '../../section3/3.1/3.1.1/components/DynamicJKMCRangeParams.vue'
import DynamicCkmcRangeParams from '../../section3/3.1/3.1.1/components/DynamicCKMCRangeParams.vue'

import DynamicJxbyxjsgNumberParams from '../../section3/3.1/3.1.1/components/DynamicJXBYXJSGNumberParams.vue'
import DynamicYxbjxjsgNumberParams from '../../section3/3.1/3.1.1/components/DynamicYXBJXJSGNumberParams.vue'
import DynamicHxgzmParams from '../../section3/3.1/3.1.1/components/DynamicHXGZMParams.vue'
import DynamicJklwsSelectParams from '../../section3/3.1/3.1.1/components/DynamicJKLWSSelectParams.vue'
import DynamicYxjkdParams from '../../section3/3.1/3.1.1/components/DynamicYXJKDParams.vue'
import DynamicYxjsdParams from '../../section3/3.1/3.1.1/components/DynamicYXJSDParams.vue'
import DynamicDmtkParams from '../../section3/3.1/3.1.1/components/DynamicDMTKParams.vue'
import DynamicDmtsParams from '../../section3/3.1/3.1.1/components/DynamicDMTSParams.vue'

import DynamicPbmParams from '../../section3/3.1/3.1.1/components/DynamicPBMParams.vue'

import DynamicCsklrskNumberParams from '../../section3/3.1/3.1.1/components/DynamicCSKLRSKNumberParams.vue'
import DynamicCsklrmqParams from '../../section3/3.1/3.1.1/components/DynamicCSKLRMQParams.vue'

// 沿程
import DynamicJkdParams from '../../section3/3.1/3.1.1/components/DynamicJKDParams.vue'
import DynamicJkjbdParams from '../../section3/3.1/3.1.1/components/DynamicJKJBDParams.vue'
import DynamicCkjbdParams from '../../section3/3.1/3.1.1/components/DynamicCKJBDParams.vue'
import DynamicDsdParams from '../../section3/3.1/3.1.1/components/DynamicDSDParams.vue'

import { crossSectionShapeType, Table2DLerp, TABLE413_DATA, TABLE413_HORIZON, TABLE413_VERTICAL, TABLE414_DATA, TABLE414_HORIZON, TABLE414_VERTICAL, TABLE415_DATA, TABLE415_HORIZON, TABLE415_VERTICAL, TABLE416_DATA, TABLE416_HORIZON, TABLE416_VERTICAL } from '@/hycom_lib/common'

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
export default class Chapter8Section24 extends Vue {
  public title = '7.2 水头损失计算';
  public explainText = '参数';

  public initData = {
    A_k: '54.4',
    n_z: '0.014'
  };

    public data = {
      A_k: '',
      n_z: ''

    };

  public formulas = {
    0: '\\mu :闸门全开流量系数',
    1: 'A_k :出口收缩断面面积,m^2',
    2: '\\zeta :自进口上游渐变流断面至有压管道出流后的收缩断面之间的某一局部能量损失系数',
    3: 'A_i :与\\zeta_i相应的过水断面面积',
    4: 'l_i :有压短管第i段长',
    5: '\\phi :流速系数,一般取0.97'
  };

  public demoContent =
    '国内某水电站泄洪排沙底孔为有压洞,校核水位1860.4m,进口分为两孔,底坎高程1795.0m,各设事故检修门孔口尺寸为2-4.8 x 8.0m,进口两侧均喇叭口,顶部为椭圆形曲线。检修闸门后设置2 根直径内径1.2m 钢管埋在混凝土中用来通气补气,通气管后设置2 根0.5m 钢管埋在混凝土中用来充水。进水口长度13.5m（中墩末端两孔合一）、渐变段长20 m（由矩形12.4 x 8m 渐变圆形Φ9m）、Φ9m 有压隧洞段331.2m ,底坡i=0.00453,在平面布置上需两个弯道,两个弯道半径均为R=50m,θ=22°,渐变段末距第一个弯道末34.2m,第一及第二个弯道末相距163.73m,第二个弯道末距出口渐变段开始133.27m 出口渐变段 22 m 由Φ 9m 的圆形有压隧洞渐变为 8 x 6.8m的矩形断面与工作闸室相连。工作闸门室位于隧洞出口 长 27 .20m底板高程 1793.5m ,底板厚度 3m ,内设弧型工作闸门一扇,闸门孔口尺寸为 8 x 6.8m 。求有压段流量系数。';
  public demoResult = '求得流量系数为0.77';

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

    let jkd = this.$refs.jkd as any
    jkd.removeAllField()

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
    dsd.addFieldWithData(331.2, 0, 0, 9.0, crossSectionShapeType.CIRCLE)
    dsd.onParamsDataChange()
  }

  public beforeOnCalculate() {
    let ak = +this.data.A_k

    let localEnergy = 0
    let regionEnergy = 0

    // 1：进水口
    this.paramJSKData.forEach(function(elem:any) {
      let area = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B * elem.n
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
      }

      let prop = ak / area
      localEnergy += prop * prop * elem.value
      // console.log("进水口",prop, elem.value)
    })

    // 2：进口拦污栅
    this.paramJKLWSData.forEach(function(elem:any) {
      let area = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
      }
      let prop = ak / area
      let zeta = elem.beta * Math.pow(elem.s / elem.b, 4 / 3) * Math.sin(elem.alpha / 180 * Math.PI)
      localEnergy += prop * prop * zeta
      // console.log(prop, zeta)
    })

    // 3：门槽
    this.paramJKMCData.forEach(function(elem:any) {
      let area = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B * elem.n
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
      }
      let prop = ak / area
      localEnergy += prop * prop * elem.value
      // console.log("门槽", prop, elem.value)
    })

    // 4：矩形变圆形渐缩管
    this.paramJXBYXJSGData.forEach(function(elem:any) {
      let area = (elem.H * elem.B + Math.PI * elem.d * elem.d / 4) / 2
      let prop = ak / area
      localEnergy += prop * prop * elem.value
    })

    // 5 圆形渐扩段
    let tableLerp = new Table2DLerp()

    this.paramYXJKDData.forEach(function(elem:any) {
      let area = Math.PI * elem.d * elem.d / 4
      let prop = ak / area
      let k = tableLerp.arr(
        TABLE413_VERTICAL,
        TABLE413_HORIZON,
        TABLE413_DATA,
        0,
        elem.alpha
      )
      let zeta = k * Math.pow(elem.omega2 / elem.omega1 - 1, 2)
      localEnergy += prop * prop * zeta
      // console.log(k)
    })

    // 6 圆形渐缩段
    this.paramYXJSDData.forEach(function(elem:any) {
      let area = Math.PI * elem.d * elem.d / 4
      let prop = ak / area
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
      localEnergy += prop * prop * zeta
      // console.log(k1, k2)
    })

    // 7 断面突扩
    this.paramDMTKData.forEach(function(elem:any) {
      let area = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
      }
      let prop = ak / area
      let zeta = Math.pow(1 - elem.omega1 / elem.omega2, 2)

      localEnergy += prop * prop * zeta
      // console.log(k1, k2)
    })

    // 8 断面突缩
    this.paramDMTSData.forEach(function(elem:any) {
      let area = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
      }
      let prop = ak / area
      let zeta = 0.5 * (1 - elem.omega2 / elem.omega1)

      localEnergy += prop * prop * zeta
      // console.log(k1, k2)
    })

    // 9：圆形缓弯管
    this.paramYXHWGData.forEach(function(elem:any) {
      let zeta = (0.131 + 0.1632 * Math.pow(elem.D / elem.R, 3.5)) * Math.sqrt(elem.Theta / 90)
      let area = Math.PI * elem.D * elem.D / 4
      let prop = ak / area
      localEnergy += prop * prop * zeta
    })

    // 10：圆形急弯管
    this.paramYXJWGData.forEach(function(elem:any) {
      let area = Math.PI * elem.D * elem.D / 4
      let prop = ak / area
      let sinVal = Math.sin(elem.Theta / 2 / 180 * Math.PI)
      let zeta = 0.946 * sinVal * sinVal + 2.05 * sinVal * sinVal * sinVal * sinVal
      localEnergy += prop * prop * zeta
    })

    // 11 ：圆形变矩形渐缩管
    this.paramYXBJXJSGData.forEach(function(elem:any) {
      let area = (elem.H * elem.B + Math.PI * elem.d * elem.d / 4) / 2
      let prop = ak / area
      localEnergy += prop * prop * elem.value
      // console.log(prop, elem.value)
    })

    // 12：出口平板门槽
    this.paramCKMCData.forEach(function(elem:any) {
      let area = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
      }
      let prop = ak / area
      localEnergy += prop * prop * elem.value
      // console.log(prop, elem.value)
    })

    //! TODO 13:弧形工作门 局开情况未完成

    // 14：平板门
    this.paramPBMData.forEach(function(elem:any) {
      let area = elem.H * elem.a
      let prop = ak / area
      let zeta = tableLerp.arr(
        TABLE416_VERTICAL,
        TABLE416_HORIZON,
        TABLE416_DATA,
        0,
        elem.e / elem.a
      )

      localEnergy += prop * prop * zeta
      // console.log(prop, elem.value)
    })

    // 15：出水口流入水库
    this.paramCSKLRSKData.forEach(function(elem:any) {
      let area = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
      }
      let prop = ak / area
      localEnergy += prop * prop * elem.value
    })

    // 16：出水口流入明渠
    this.paramCSKLRMQData.forEach(function(elem:any) {
      let area = 0
      if (elem.shape === 0) {
        area = elem.H * elem.B
      } else if (elem.shape === 1) {
        area = Math.PI * elem.d * elem.d / 4
      }
      let zeta = Math.pow(1 - elem.omega1 / elem.omega2, 2)
      let prop = ak / area
      localEnergy += prop * prop * zeta
    })

    console.log('局部', localEnergy)

    // 沿程能量损失
    // 1：进水口段
    this.paramJSKDData.forEach(function(elem:any) {
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
      let akDivAi = ak / area
      regionEnergy += elem.l * akDivAi * akDivAi / (Math.pow(r, 4 / 3))
      // console.log("进水口段",r, akDivAi)
    })

    // 2：进口渐变段
    this.paramJKJBDData.forEach(function(elem:any) {
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
      let akDivAi = 2 * ak / (area1 + area2)
      regionEnergy += elem.l * akDivAi * akDivAi / (Math.pow(r, 4 / 3))
      // console.log("进口渐变段",r, akDivAi)
    })

    // 3：出口渐变段
    this.paramCKJBDData.forEach(function(elem:any) {
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
      let akDivAi = 2 * ak / (area1 + area2)
      regionEnergy += elem.l * akDivAi * akDivAi / (Math.pow(r, 4 / 3))
      // console.log("出口渐变段",r, akDivAi)
    })

    // 4：洞身段
    this.paramDSDData.forEach(function(elem:any) {
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
      let akDivAi = ak / area
      regionEnergy += elem.l * akDivAi * akDivAi / (Math.pow(r, 4 / 3))
      // console.log("洞身段",r, akDivAi)
    })

    regionEnergy = regionEnergy * 2 * 9.8 * +this.data.n_z * +this.data.n_z
    console.log('沿程', regionEnergy)

    let mu = 1 / Math.sqrt(1 + regionEnergy + localEnergy)
    let outStr = '流量系数=' + mu.toFixed(2).toString()

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
