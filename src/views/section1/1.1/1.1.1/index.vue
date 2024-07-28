<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-05-21 12:37:10
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-06-04 11:57:45
 * @FilePath: \hycom_app\src\views\chapter1\2.1\2.1.1\index.vue
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
-->
<template>
  <div>
    <div class="app-container">
      <el-container>
        <el-header>
          <h2>{{ title }}</h2>
        </el-header>
        <el-main>
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
          >
            <param-explain :formulas="formulas" />
            <br>

            <h3>请输入参数:</h3>
            <br>

            <el-row :gutter="20">
              <div
                v-for="(item, index) in data"
                :key="index"
              >
                <el-col :span="2">
                  <math-jax :latex="'' + index + ''" />
                </el-col>
                <el-col :span="10">
                  <el-form-item>
                    <div v-if="index === '实用堰类型'">
                      <el-select
                        v-model="data[index]"
                        placeholder="请选择类型"
                      >
                        <el-option
                          v-for="syy in syyOptions"
                          :key="syy.value"
                          :label="syy.label"
                          :value="syy.value"
                        />
                      </el-select>
                    </div>
                    <div v-else-if="index === '断面形状'">
                      <el-select
                        v-model="data[index]"
                        placeholder="请选择形状"
                      >
                        <el-option
                          v-for="sp in shapeOptions"
                          :key="sp.value"
                          :label="sp.label"
                          :value="sp.value"
                        />
                      </el-select>
                    </div>
                    <div v-else-if="typeof data[index] === 'number'">
                      <el-input v-model="data[index]" />
                    </div>
                    <div v-else-if="typeof data[index] === 'boolean'">
                      <el-switch v-model="data[index]" />
                    </div>
                    <div v-else-if="typeof data[index] === 'string'">
                      <el-input v-model="data[index]" />
                    </div>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>

            <h3>表格计算:</h3>
            <br>
            <el-row :gutter="15">
              <el-col :span="5">
                <math-jax
                  :latex="'上游坝面坡度比 \\Delta y / \\Delta x'"
                />
              </el-col>
              <el-col :span="10">
                <el-select
                  v-model="slopeVal"
                  placeholder="请选择上游坝面坡度比"
                >
                  <el-option
                    v-for="spo in slopePropOptions"
                    :key="spo.value"
                    :label="spo.label"
                    :value="spo.value"
                  />
                </el-select>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <div id="data-table">
                <el-tabs
                  v-model="activeTableName"
                  style="margin-top: 15px"
                  type="border-card"
                >
                  <el-tab-pane
                    v-for="item in tabOptions"
                    :key="item.key"
                    :label="item.label"
                    :name="item.key"
                  >
                    <keep-alive>
                      <tab-pane
                        v-if="activeTableName === item.key"
                        :type="item.key"
                      />
                    </keep-alive>
                  </el-tab-pane>
                </el-tabs>

                <br>
                <el-row :gutter="20">
                  <el-col :span="2">
                    <math-jax :latex="'C'" />
                  </el-col>
                  <el-col :span="10">
                    <el-input v-model="C" />
                  </el-col>

                  <el-col :span="2">
                    <math-jax :latex="'m'" />
                  </el-col>
                  <el-col :span="10">
                    <el-input v-model="m" />
                  </el-col>
                </el-row>
              </div>
            </el-row>
            <br>
            <el-row :gutter="20">
              <el-col
                :span="8"
                style="text-align: center"
              >
                <el-button
                  type="primary"
                  @click="onCalculate"
                >
                  计算
                </el-button>
              </el-col>

              <el-col
                :span="8"
                style="text-align: center"
              >
                <el-button
                  type="primary"
                  @click="onDemo"
                >
                  算例
                </el-button>
              </el-col>
              <el-col
                :span="8"
                style="text-align: center"
              >
                <el-button
                  type="primary"
                  @click="onReset"
                >
                  清空
                </el-button>
              </el-col>
            </el-row>
            <br>

            <h3>结果:</h3>
            <br>

            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item>
                  <el-input
                    v-model="form.Q"
                    readonly=""
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <div>
              <h3>算例:</h3>
              <br>
              <p>
                {{ demoContent }}
              </p>
              <br>
              <b> {{ demoResult }}</b>
            </div>
            <br>
          </el-form>
        </el-main>
      </el-container>
      <br>
      <h3>计算书:</h3>
      <br>

      <mav-editor :config="mavEditorConfig" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Chapter1 } from '@/hycom_lib/chapter1'

import VueParamaters from '@/components/VueParamaters/index.vue'
import { syyType, shapeType, Table2DLerp } from '@/hycom_lib/common'

import ParamExplain from '@/components/HycomForm/components/ParamExplain.vue'
import TabPane from './components/TabPane.vue'

import MavEditor from '@/components/MavEditor/MavEditor.vue'

@Component({
  components: {
    ParamExplain,
    TabPane,
    VueParamaters,
    MavEditor
  }
})
export default class Chapter1Section1Sub1 extends Vue {
  public C: number = 0;
  public m: number = 0;
  public H0: number = 0;

  public firstPartsStr =
    '<center><font face=黑体 size=5">某国外水电站工程岸边开敞式溢洪道泄流能力计算</font ></center> ' +
    '<br /> <br /> ' +
    '<font face=黑体 size=4>1 计算说明</font >  <br /><br />' +
    '<font face=宋体 size=3> 采用水力学计算程序HYCOM</font> <br /> <br />' +
    '<font face=黑体 size=4>2 计算依据</font > <br /> <br />' +
    '<font face=宋体 size=3> 依据《溢洪道设计规范》 DL-T5166-2002.</font><br /> <br /> ' +
    '<font face=黑体 size=4>3 计算过程</font > <br /><br /> ' +
    '<font face=宋体 size=3> 某国外水电站工程,岸边式溢洪道,引渠底板高程为190m,堰顶高程为209m,PMF库水位233m,引渠流速3m/s,4孔,单孔宽度15m,上游坡度3:2,求PMF下泄量. <br /><br /> ' +
    '已知参数为:</font> <br /> \n \n';

  public SecPartsStr =
    ' <font face=黑体 size=4>4 计算结果与分析</font > <br />\n ';
  public ThirdPartsStr = '<font face=黑体 size=4>5 计算附表及附图</font >';

  public mavEditorConfig = {
    subfield: false,
    defaultOpen: 'preview',
    editable: false,
    toolbarsFlag: false,
    scrollStyle: true,
    html: true,
    value: '',
    filename: '计算书',
    download: true,
    preview: true
  };

  mounted() {
    this.mavEditorConfig.value =
      this.firstPartsStr + this.SecPartsStr + this.ThirdPartsStr
    this.mavEditorConfig.filename = this.title + '_' + '计算书'
  }

  public title = '1.1.1 开敞式幂曲线实用堰泄流能力';
  public initData = {
    n: 4,
    b: 15,
    P_1: 19,
    H_d: 20,
    H: 24,
    v_0: 3,
    '\\varepsilon': 0.88,
    '\\sigma_m': 1.0
  };

  public tableA = [
    [0.425, 0.43, 0.431, 0.433, 0.436],
    [0.438, 0.442, 0.445, 0.448, 0.451],
    [0.45, 0.455, 0.458, 0.46, 0.464],
    [0.458, 0.463, 0.468, 0.472, 0.476],
    [0.467, 0.474, 0.477, 0.482, 0.486],
    [0.473, 0.48, 0.485, 0.491, 0.494],
    [0.479, 0.486, 0.491, 0.496, 0.501],
    [0.482, 0.491, 0.496, 0.502, 0.507],
    [0.485, 0.495, 0.499, 0.506, 0.51],
    [0.496, 0.5, 0.5, 0.508, 0.513]
  ];

  public tableAVertical = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3];
  public tableAHorizon = [0.2, 0.4, 0.6, 1.0, 1.33];

  public tableB = [
    [1.009, 1.007, 1.004, 1.002, 1.0, 0.998, 0.997],
    [1.015, 1.011, 1.006, 1.002, 0.999, 0.996, 0.993],
    [1.021, 1.015, 1.007, 1.002, 0.998, 0.993, 0.988]
  ];

  public tableBVertical = [0, 1, 2];
  public tableBHorizon = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.3];

  @Watch('slopeVal')
  @Watch('data.P_1')
  @Watch('data.H_d')
  @Watch('data.H')
  @Watch('data.v_0')
  public onCRelatedValuesChange() {
    if (this.data.H_d === '') {
      return
    }

    this.H0 = +this.data.H
    if (+this.data.P_1 < 1.33 * +this.data.H_d) {
      this.H0 = +this.data.H + (+this.data.v_0 * +this.data.v_0) / (2 * 9.8)
    }

    let p1DivHd = +this.data.P_1 / +this.data.H_d
    let h0DivHd = +this.H0 / +this.data.H_d

    // console.log(H0,p1DivHd,h0DivHd)

    let lerp = new Table2DLerp()
    let m = lerp.arr(
      this.tableAVertical,
      this.tableAHorizon,
      this.tableA,
      h0DivHd,
      p1DivHd
    )

    let C = 1
    if (this.slopeVal !== '-1') {
      C = lerp.arr(
        this.tableBVertical,
        this.tableBHorizon,
        this.tableB,
        +this.slopeVal,
        p1DivHd
      )
    }

    this.C = C
    this.m = +m
  }

  public data = {
    n: '',
    b: '',
    P_1: '',
    H_d: '',
    H: '',
    v_0: '',
    '\\varepsilon': '',
    '\\sigma_m': ''
  };

  public formulas = {
    11: 'Q :流量,m^3/s',
    0: '\\sigma_m :淹没系数',
    1: 'C :上游坡角修正系数',
    2: 'm :流量系数',
    3: '\\varepsilon :收缩系数,设计时对高堰可取\\varepsilon=0.90\\sim 0.97,均值0.935,对低堰可取\\varepsilon=0.80\\sim 0.90,均值0.85',
    4: 'b :单孔宽度,m',
    5: 'n :闸孔数目',
    6: 'H :堰上水头,m,取堰前3H_{0}\\sim 6H_{0}处',
    7: 'v_0 :引渠的行进流速,m/s',
    8: 'g :重力加速度,m/s^2,取9.8',
    9: 'P_1 :上游堰高,m',
    10: 'H_d :定型设计水头,m,对于高堰,H_d=75\\%\\sim 95\\%  H_{max},H_{max}为校核流量对应的水头'
  };

  public demoContent =
    '某国外水电站工程,岸边式溢洪道,引渠底板高程为190m,堰顶高程为209m,PMF 库水位233m,引渠流速3m/s,4 孔,单孔宽度15m,上游坡度3:2,求PMF下泄量.';
  public demoResult = '求得PMF下泄量为14291.74';

  public tabOptions = [
    { label: '表:流量系数m值', key: 't1' },
    { label: '表:上游面坡度影响修正系数C值', key: 't2' }
  ];

  public activeTableName = 't1';

  public form = { Q: '' };
  public syyOptions = [
    {
      label: '实用堰',
      value: syyType.syy
    },
    {
      label: '宽顶堰',
      value: syyType.kdy
    }
  ];

  public shapeOptions = [
    {
      label: '矩形断面',
      value: shapeType.RECTANGLE
    },
    {
      label: '梯形断面',
      value: shapeType.LADDER
    }
  ];
  public slopeVal = '';
  public slopePropOptions = [
    {
      label: '3:1',
      value: '0'
    },
    {
      label: '3:2',
      value: '1'
    },
    {
      label: '3:3',
      value: '2'
    },
    {
      label: '垂直',
      value: '-1'
    }
  ];

  public onDemo() {
    for (let key in this.data) {
      (this.data as any)[key] = (this.initData as any)[key]
    }

    this.slopeVal = '1'
  }

  public onReset() {
    for (let key in this.data) {
      if (typeof (this.data as any)[key] === 'boolean') {
        (this.data as any)[key] = false
      } else {
        (this.data as any)[key] = ''
      }
    }

    this.C = 0
    this.m = 0
    this.H0 = 0
    this.slopeVal = ''
    this.form.Q = ''
  }

  public toFixed(number, decimals) {
    var x = Math.pow(10, Number(decimals) + 1)
    return (Number(number) + 1 / x).toFixed(decimals)
  }

  public onCalculate() {
    this.form.Q = 'PMF下泄量Q=' + +this.result

    let knownParams =
      '$C= ' +
      +this.C +
      ', m= ' +
      +this.m.toFixed(3) +
      ', \\varepsilon= ' +
      +Number.parseFloat(this.data['\\varepsilon']).toFixed(3) +
      ', \\sigma_m= ' +
      +Number.parseFloat(this.data['\\sigma_m']).toFixed(3) +
      ', H_0= ' +
      +this.H0.toFixed(3) +
      '$ \n'

    let equation =
      '$Q=c m \\varepsilon \\sigma_m B \\sqrt{2g} H_0^{\\frac{3}{2}}$ \n' +
      '$\\quad=' +
      +this.C +
      ' \\times ' +
      +this.m.toFixed(3) +
      ' \\times ' +
      +this.data['\\varepsilon'] +
      ' \\times ' +
      +this.data['\\sigma_m'] +
      ' \\times ' +
      +this.data.b +
      ' \\times \\sqrt{2 \\times 9.8}' +
      ' \\times ' +
      this.H0.toFixed(3) +
      '^{\\frac{3}{2}}$ \n' +
      '$\\quad=' +
      +Number.parseFloat(this.result).toFixed(3) +
      ' m^3/s$ \n \n'

    this.mavEditorConfig.value =
      this.firstPartsStr +
      knownParams +
      equation +
      this.SecPartsStr +
      '<font face=宋体 size=3> PMF工况下泄量 $Q=' +
      +this.result +
      ' m^3/s$,满足要求 </font> <br /> \n' +
      this.ThirdPartsStr
  }

  get result() {
    return Chapter1.kcsmqxsyy(
      +this.data.n,
      +this.data.b,
      +this.H0,
      +this.C,
      +this.m,
      +this.data['\\varepsilon'],
      +this.data['\\sigma_m']
    ).toFixed(2)
  }
}
</script>

<style lang="scss">
.line {
  text-align: center;
}

.el-form-item__content {
  margin-left: 0px !important;
}
</style>
