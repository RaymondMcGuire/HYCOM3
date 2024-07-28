<template>
  <div>
    <el-table
      :data="table221"
      border
      fit
      highlight-current-row
      style="width: 100%"
      align="center"
    >
      <el-table-column
        prop="type_name"
        label="水流边壁类型及其表面特征"
        min-width="300"
        align="left"
      />
      <el-table-column
        label="糙率n值"
        align="center"
      >
        <el-table-column
          prop="range"
          label="范围"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="average"
          label="均值"
          min-width="120"
          align="center"
        />
      </el-table-column>
    </el-table>

    <br>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'TablePane'
})
export default class extends Vue {
  @Prop({ default: 't1' }) private type!: string;

  data() {
    return {
      table221: [
        {
          type_name: '1.混凝土衬砌',
          range: '',
          average: ''
        },
        {
          type_name: '(1) 壁面顺直,有抹光的水泥浆面层或经磨光表面光滑者',
          range: '0.011~0.012',
          average: '0.0115'
        },
        {
          type_name: '(2) 壁面顺直,采用钢模且拼接良好者',
          range: '0.012~0.013',
          average: '0.0125'
        },
        {
          type_name: '(3) 壁面顺直,采用木摸拼接缝间凸凹度在3mm~5mm内者',
          range: '0.013~0.014',
          average: '0.0135'
        },
        {
          type_name: '(4) 壁面不够顺直,木摸拼接不良,缝间凸凹度在5mm~20mm者',
          range: '0.014~0.016',
          average: '0.015'
        },
        {
          type_name: '(5)粗糙的混凝土',
          range: '0.017',
          average: '0.017'
        },
        {
          type_name: '2.喷混凝土',
          range: '',
          average: ''
        },
        {
          type_name: '(1) 岩石表面平整  ',
          range: '0.020~0.025',
          average: '0.0225'
        },
        {
          type_name: '(2) 岩石表面高低不平',
          range: '0.030',
          average: '0.030'
        },
        {
          type_name: '3.喷浆护面',
          range: '0.016~0.025',
          average: '0.0205'
        },
        {
          type_name: '4.水泥浆砌块石护面',
          range: '',
          average: ''
        },
        {
          type_name:
            '(1)渠底、壁面较顺直,砌石面较平整,拼接良好,1m2内不平整度约为30mm~50mm者',
          range: '0.015~0.020',
          average: '0.0175'
        },
        {
          type_name: '(2)平整度较差',
          range: '0.020~0.030',
          average: '0.025'
        },
        {
          type_name: '5.干砌块石或乱石护坡',
          range: '',
          average: ''
        },
        {
          type_name: '(1)渠底、壁面欠顺直,干砌石拼接一般',
          range: '0.021~0.023',
          average: '0.022'
        },
        {
          type_name: '(2)干砌块石平整度较差或乱石护坡',
          range: '0.023~0.035',
          average: '0.029'
        },
        {
          type_name: '6.岩石',
          range: '',
          average: ''
        },
        {
          type_name: '(1)经过良好修整的',
          range: '0.025',
          average: '0.025'
        },
        {
          type_name: '(2)经过中等修整的',
          range: '0.030~0.033',
          average: '0.0315'
        },
        {
          type_name: '(3)未经修整,凸凹甚大者',
          range: '0.035~0.045',
          average: '0.04'
        }
      ]
    }
  }
}
</script>
