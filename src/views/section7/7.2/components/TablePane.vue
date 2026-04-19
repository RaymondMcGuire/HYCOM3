<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-06-05 01:12:47
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-06-05 01:27:33
 * @FilePath: \hycom_app\src\views\chapter1\2.5\components\TablePane.vue
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
-->
<template>
  <div>
    <el-table
      :data="table822"
      border
      fit
      highlight-current-row
      style="width: 100%"
      align="center"
      empty-text=" "
    >
      <el-table-column
        label="a"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="k"
          align="center"
        />
      </el-table-column>

      <el-table-column
        label="8"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="0.14"
          align="center"
        />
      </el-table-column>

      <el-table-column
        label="10"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="0.16"
          align="center"
        />
      </el-table-column>

      <el-table-column
        label="12"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="0.22"
          align="center"
        />
      </el-table-column>

      <el-table-column
        label="15"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="0.30"
          align="center"
        />
      </el-table-column>

      <el-table-column
        label="20"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="0.42"
          align="center"
        />
      </el-table-column>

      <el-table-column
        label="25"
        min-width="100"
        align="center"
      >
        <el-table-column
          label="0.62"
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
      table822: []
    }
  }
})
</script>
