<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-06-05 01:12:47
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-07-16 22:28:22
 * @FilePath: \hycom_app\src\views\chapter2\4.3\4.3.2.1\components\TablePane.vue
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
-->
<template>
  <div>
    <el-table
      :data="table433"
      border
      fit
      highlight-current-row
      style="width: 100%"
      align="center"
      empty-text=" "
    >
      <el-table-column
        prop="name"
        label="名称"
        min-width="80"
        align="center"
      />
      <el-table-column
        label="3<H/h1<12,H上游水深,h1弧门全开时孔口高度"
        align="center"
        min-width="100"
      >
        <el-table-column
          prop="a"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="b"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="c"
          min-width="120"
          align="center"
        />
      </el-table-column>
    </el-table>

    <br>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TablePane',
  props: {
    type: {
      type: String,
      default: 't1'
    }
  },
  data() {
    return {
      table433: [
        {
          name: '检修门前顶部压板斜率S1',
          a: '1:4.5',
          b: '1:5.5',
          c: '1:6.5'
        },
        {
          name: '检修门前顶部压板斜率S2',
          a: '1:4',
          b: '1:5',
          c: '1:6'
        },
        {
          name: '垂直收缩系数ε',
          a: 0.895,
          b: 0.914,
          c: 0.918
        },
        {
          name: '流速系数φ',
          a: 0.963,
          b: 0.963,
          c: 0.963
        },
        {
          name: '流量系数μ',
          a: 0.862,
          b: 0.880,
          c: 0.884
        }
      ]
    }
  }
})
</script>
