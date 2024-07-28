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
export default class Chapter6Section32 extends Vue {
  private title = '5.3.2 拱坝水流向心集中影响挑流冲刷坑深度';
  private initData = {
    可冲类别: 1.4,
    R: 214.1,
    L: 80.76,
    'H_{\\text{上}}': 2457,
    'H_{\\text{下}}': 2272.42,
    Q: 1320,
    b: 13,
    't^{\\prime}': 57.92

  };
  private data = {
    可冲类别: '',
    R: '',
    L: '',
    'H_{\\text{上}}': '',
    'H_{\\text{下}}': '',
    K: '',
    Q: '',
    b: '',
    't^{\\prime}': ''

  };

  private formulas = {
    0: 'Q :流量，m^3/s',
    1: 'b :鼻坎宽度，m',
    2: 't :自下游水面至坑底最大水垫深度，m',
    3: 'H_{\\text{上}} :上游水面高程，m',
    4: 'H_{\\text{下}} :下游水面高程，m',
    5: 't^{\\prime} :下游水深，m',
    6: 'T :冲坑深度，由河床底面至坑低，m',
    7: 'R :鼻坎末端算起拱坝半径，m',
    8: 'L :鼻坎末端算起挑距，m',
    9: 'C_q :考虑水流向心集中影响的拱坝流量向心集中系数'
  };

  private demoContent =
  '黄河某水电站混凝土拱坝，中孔鼻坎为挑流，中表孔鼻坎高程2434.62m，河床高程2214.5m，鼻坎末端算起拱坝半径214.1m，校核情况下单孔泄量均为1320m3/s，中孔过流宽度均为13m，计算中孔挑流冲坑深度。'
  private demoResult = '冲坑深度为25.57';

  public activeTableName = 't1';
  public tableOptions = [
    { label: '表:基岩冲刷系数', key: 't1' }
  ];

  @Watch('data.可冲类别')
  public onVarKCLBValuesChange() {
    if (this.data['可冲类别'] !== '') { this.data['K'] = this.data['可冲类别'] }
  }

  public beforeOnCalculate() {
    let value = Chapter6.gbslxxjzyx_tlcsksd(
      +this.data.R,
      +this.data.L,
      +this.data['H_{\\text{上}}'],
      +this.data['H_{\\text{下}}'],
      +this.data.K,
      +this.data.Q,
      +this.data.b,
      +this.data['t^{\\prime}']
    )

    let outStr = '冲坑深度:' +
       value.toFixed(2).toString()
    let template = this.$refs.template as any
    template.form.result = outStr
  }
}
</script>
