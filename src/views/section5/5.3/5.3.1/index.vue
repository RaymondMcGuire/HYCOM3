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
    >
      <div slot="table_fir_anchor">
        <el-row :gutter="20">
          <el-tabs
            v-model="activeTableName"
            style="margin-top: 15px"
            type="border-card"
          >
            <el-tab-pane
              v-for="item in tableOptions"
              :key="item.key"
              :label="item.label"
              :name="item.key"
            >
              <keep-alive>
                <table-pane
                  v-if="activeTableName === item.key"
                  :type="item.key"
                />
              </keep-alive>
            </el-tab-pane>
          </el-tabs>
          <br>
        </el-row>
      </div>
    </hycom-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Chapter6 } from '@/hycom_lib/chapter6'
import HycomForm from '@/components/HycomForm/index.vue'
import TablePane from './components/TablePane.vue'

@Component({
  components: {
    HycomForm,
    TablePane
  }
})
export default class Chapter6Section31 extends Vue {
  private title = '5.3.1 挑流水舌外缘挑距及冲坑深度';
  private initData = {
    h: 7.781,
    '\\theta': 15,
    H_0: 134.879,
    h_2: 42.466,
    q: 14600 / 50,
    H: 177,
    't^{\\prime}': 19,
    可冲类别: 1.4
  };
  private data = {
    可冲类别: '',
    h: '',
    '\\theta': '',
    H_0: '',
    h_2: '',
    K: '',
    q: '',
    H: '',
    't^{\\prime}': ''
  };

  private formulas = {
    0: 'L :自挑流鼻坎坎顶算起的挑流水舌外缘与下游水面后与河床面交点的水平距离,m',
    1: '\\theta :挑流鼻坎挑角',
    2: 'h :坎顶法向的平均水深,m',
    3: 'h_1 :挑流鼻坎坎顶铅直方向水深,m',
    4: 'h_2 :鼻坎坎顶至下游水面高差,m,如计算冲刷坑最深点距鼻坎的距离,该值可采用坎顶距冲坑最深点高程差',
    5: 'v_1 :鼻坎坎顶水面流速,m/s',
    6: '\\phi :流速系数,可取0.95',
    7: 'H_0 :鼻坎顶水头,m,鼻坎末端的水深可近似利用泄槽末端断面水深,按推算泄槽段水面线方法求出,单宽流量除以该水深,可得鼻坎断面平均流速',
    8: 'H :上、下游水面差,m',
    9: '\\beta :水舌外缘与下游水面夹角,挑射水流挑射角可近似用鼻坎挑角代替',
    10: 'L_c :水面以下水舌长度的水平投影计算',
    11: 't^{\\prime} :下游水深,m',
    12: 't :下游水面至坑底的最大水垫深度,m',
    13: 'T :冲坑深度,由河床底面至坑低,m',
    14: 'K :基岩冲刷系数'
  };

  private demoContent =
    '某水电站工程,溢流堰为实用堰,弧形闸门控制,堰前行近流速为2.6m,PMF 洪水下,水库水位233m,下泄流量14600m3/s,鼻坎宽50m,鼻坎坎顶高程98.466m,下游水位56m,下游河床高程37m,鼻坎挑角15º.下游河床为砂岩和砂岩页岩互层,砂岩块度0.3 x 0.5 x 0.8m3,砂岩页岩互层块度0.1 x 0.3 x 0.4m3,抗冲流速4m/s 左右.计算PMF洪水下挑距和冲坑深度.';
  private demoResult = '求得PMF洪水下挑距为333.65,冲坑深度为68.26';

  public activeTableName = 't1';
  public tableOptions = [
    { label: '表:基岩冲刷系数', key: 't1' }
  ];

  @Watch('data.可冲类别')
  public onVarKCLBValuesChange() {
    if (this.data['可冲类别'] !== '') { this.data['K'] = this.data['可冲类别'] }
  }

  public beforeOnCalculate() {
    let value = Chapter6.tljs(
      +this.data.h,
      (+this.data['\\theta'] * Math.PI) / 180,
      +this.data.H_0,
      +this.data.h_2,
      +this.data.K,
      +this.data.q,
      +this.data.H,
      +this.data['t^{\\prime}']
    )

    let outStr = '挑距:' +
      value[0].toFixed(2).toString() +
      '|冲坑深度:' +
      value[1].toFixed(2).toString()
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
