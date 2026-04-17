<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-06-04 10:32:42
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-06-04 11:26:42
 * @FilePath: \hycom_app\src\views\chapter1\1.4\1.4.1\components\TablePane.vue
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
-->
<template>
  <div>
    <el-table
      :data="table621"
      border
      fit
      highlight-current-row
      style="width: 100%"
      align="center"
    >
      <el-table-column
        prop="a"
        label="可冲"
        min-width="120"
        align="center"
      />

      <el-table-column
        prop="b"
        label="类别"
        min-width="120"
        align="center"
      />

      <el-table-column
        prop="c"
        label="难冲"
        min-width="120"
        align="center"
      />

      <el-table-column
        prop="d"
        label="可冲"
        min-width="120"
        align="center"
      />

      <el-table-column
        prop="e"
        label="较易冲"
        min-width="120"
        align="center"
      />

      <el-table-column
        prop="f"
        label="易冲"
        min-width="120"
        align="center"
      />
    </el-table>

    <br>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'TablePane'
})
export default class TablePane extends Vue {
  @Prop({ default: 't1' }) private type!: string;

  data() {
    return {
      table621: [
        {
          a: '节理裂隙',
          b: '间距(cm)',
          c: '>150',
          d: '50～150',
          e: '20～50',
          f: '<20'
        },
        {
          a: '',
          b: '发育程度',
          c: '不发育,节理(裂隙)1～2组,规则',
          d: '较发育,节理(裂隙)2～3组,x 形,较规则',
          e: '发育,节理(裂隙)3 组以上,不规则,呈x 形或米字形,不规则',
          f: '很发育,节理(裂隙)3 组以上,杂乱,岩体被切割成碎石状'
        },
        {
          a: '',
          b: '完整程度',
          c: '巨块状',
          d: '大块状',
          e: '块石、碎石状',
          f: '碎石状'
        },
        {
          a: '岩基构造特征',
          b: '结构类别',
          c: '整体结构',
          d: '砌体结构',
          e: '镶嵌结构',
          f: '碎裂结构'
        },
        {
          a: '',
          b: '裂隙性质',
          c: '多为原生型或构造型,多密闭,延展不长',
          d: '以构造型为主,多密闭,部分微张,少有充填,胶结好',
          e: '以构造或风化型为主,大部分微张,部分张开,部分为黏土充填,胶结较差',
          f: '以风化或构造型为主,裂隙微张或张开,部分为黏土充填,胶结很差'
        },
        {
          a: 'k',
          b: '范围',
          c: '0.6～0.9',
          d: '0.9～1.2',
          e: '1.2～1.6',
          f: '1.6～2.0'
        },
        {
          a: '',
          b: '平均',
          c: '0.8',
          d: '1.1',
          e: '1.4',
          f: '1.8'
        }
      ]
    }
  }
}
</script>
